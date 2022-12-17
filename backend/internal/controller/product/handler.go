package product

import (
	"api/internal/controller/product/request"
	"api/internal/domain/appError"
	"api/internal/domain/product"
	"api/internal/domain/user"
	"api/internal/mapper"
	"api/internal/repo"
	"api/internal/util"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"net/http"
	"strconv"
)

type Handler struct {
	userManager    *repo.UserManager
	productManager *repo.ProductManager
	uploader       *util.Uploader
	jwtUtils       *util.JwtUtils
	productMapper  *mapper.Product
}

func NewHandler(db *gorm.DB) *Handler {
	return &Handler{
		uploader:       util.NewUploader(),
		userManager:    repo.NewUserManger(db),
		productManager: repo.NewProductManager(db),
		productMapper:  mapper.NewProductMapper(db),
		jwtUtils:       util.NewJwt(),
	}
}

// GetById
// @Tags product
// @Security ApiKeyAuth
// @Accept json
// @Produce json
// @Param id path int true "id"
// @Success 200 {object} product.Dto
// @Failure 400 {string} error
// @Router /products/{id} [get]
func (h *Handler) GetById(c *gin.Context) *appError.AppError {
	productId, err := strconv.ParseUint(c.Param("id"), 10, 8)
	if err != nil {
		return appError.New(err, err.Error(), http.StatusBadRequest)
	}
	productModel, err := h.productManager.GetById(productId)
	if err != nil {
		return appError.New(err, err.Error(), http.StatusBadRequest)
	}
	userModel, _ := h.userManager.Extract(c)
	productDto := h.productMapper.ModelToDto(userModel, productModel)
	c.JSON(http.StatusOK, productDto)
	return nil
}

// GetMy
// @Tags product
// @Security ApiKeyAuth
// @Accept json
// @Produce json
// @Success 200 {object} product.Dto
// @Failure 400 {string} error
// @Router /products/my [get]
func (h *Handler) GetMy(c *gin.Context) *appError.AppError {
	userModel, _ := h.userManager.Extract(c)
	products, err := h.productManager.GetAllByUserId(userModel.ID)
	if err != nil {
		return appError.New(err, err.Error(), http.StatusBadRequest)
	}
	productsDto := h.productMapper.ModelsToDto(products, userModel)
	c.JSON(http.StatusOK, productsDto)
	return nil
}

// Upload
// @Tags product
// @Security ApiKeyAuth
// @ID           product.upload
// @Accept       multipart/form-data
// @Produce      json
// @Param        cover formData  file          true  "cover"
// @Param        category formData  string         true  "category"
// @Param        name formData  string          true  "name"
// @Param        licence formData  string          true  "licence"
// @Param        description formData  string          true  "description"
// @Param        price formData  number          true  "price"
// @Success      200   {string}  string        "ok"
// @Router       /products/upload [post]
func (h *Handler) Upload(c *gin.Context) *appError.AppError {
	r, err := request.NewToUpload(c)
	url, _, err := h.uploader.UploadFile(r.File, r.FileHeader)
	if err != nil {
		return appError.New(err, err.Error(), http.StatusBadRequest)
	}
	userModel, err := h.userManager.Extract(c)
	if err != nil {
		return appError.New(err, err.Error(), http.StatusBadRequest)
	}
	productModel := product.New(r.Name, url, r.Description, r.Licence, r.Category, userModel.ID, r.Price)
	err = h.productManager.Create(productModel)
	if err != nil {
		return appError.New(err, err.Error(), http.StatusInternalServerError)
	}
	c.JSON(http.StatusOK, url)
	return nil
}

// Get
// @Tags product
// @Security ApiKeyAuth
// @Accept json
// @Produce json
// @Param offset query int true "offset"
// @Param limit query int true "limit"
// @Param orderBy query string false "orderBy"
// @Param isDesc query boolean false "isDesc"
// @Param filterBy query string false "filter"
// @Success 200 {object} product.Dto
// @Failure 400 {string} error
// @Router /products [get]
func (h *Handler) Get(c *gin.Context) *appError.AppError {
	r, err := request.NewToGet(c)
	if err != nil {
		return appError.New(err, err.Error(), http.StatusBadRequest)
	}
	products, err := h.productManager.Get(r.Limit, r.Offset, r.OrderBy, r.FilterBy, r.IsDest)
	if err != nil {
		return appError.New(err, err.Error(), http.StatusBadRequest)
	}
	userModel, _ := h.userManager.Extract(c)
	productsDto := h.productMapper.ModelsToDto(products, userModel)
	c.JSON(http.StatusOK, productsDto)
	return nil
}

// Update
// @Tags product
// @Security ApiKeyAuth
// @Accept json
// @Produce json
// @Param Update body product.UpdateInfo true "Update"
// @Success 200 {string} ok
// @Failure 400 {string} error
// @Router /products/update [patch]
func (h *Handler) Update(c *gin.Context) *appError.AppError {
	var updateIndo product.UpdateInfo
	if err := c.BindJSON(&updateIndo); err != nil {
		return appError.New(err, err.Error(), http.StatusBadRequest)
	}
	userModel, err := h.userManager.Extract(c)
	if err != nil {
		return appError.New(err, err.Error(), http.StatusBadRequest)
	}
	if err = h.productManager.Update(userModel.ID, &updateIndo); err != nil { //TODO
		return appError.New(err, err.Error(), http.StatusForbidden)
	}
	c.Status(http.StatusOK)
	return nil
}

// Delete
// @Tags product
// @Security ApiKeyAuth
// @Accept json
// @Produce json
// @Param id path int true "id"
// @Success 200 {string} ok
// @Failure 400 {string} error
// @Router /products/delete/{id} [delete]
func (h *Handler) Delete(c *gin.Context) *appError.AppError {
	id, err := strconv.ParseUint(c.Param("id"), 10, 8)
	if err != nil {
		return appError.New(err, err.Error(), http.StatusBadRequest)
	}
	claims, err := h.jwtUtils.ExtractClaims(c)
	if err != nil {
		return appError.New(err, err.Error(), http.StatusBadRequest)
	}
	productModel, err := h.productManager.GetById(id)
	if err != nil {
		return appError.New(err, err.Error(), http.StatusBadRequest)
	}
	if productModel.Author.Username != claims[user.Username].(string) {
		return appError.New(err, "можно удалять только своё", http.StatusForbidden)
	}
	if err = h.productManager.Delete(productModel); err != nil {
		return appError.New(err, err.Error(), http.StatusBadRequest)
	}
	c.Status(http.StatusOK)
	return nil
}
