package product

import (
	"api/internal/controller"
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

type handler struct {
	userManager    *repo.UserManager
	productManager *repo.ProductManager
	uploader       *util.Uploader
	jwtUtils       *util.JwtUtils
	productMapper  *mapper.Product
}

func newHandler(db *gorm.DB) *handler {
	return &handler{
		uploader:       util.NewUploader(),
		userManager:    repo.NewUserManger(db),
		productManager: repo.NewProductManager(db),
		productMapper:  mapper.NewProductMapper(db),
		jwtUtils:       util.NewJwt(),
	}
}

// getById
// @Tags product
// @Security ApiKeyAuth
// @Accept json
// @Produce json
// @Param id path int true "id"
// @Success 200 {object} product.Dto
// @Failure 400 {string} error
// @Router /products/{id} [get]
func (h *handler) getById(c *gin.Context) *controller.Error {
	productId, err := strconv.ParseUint(c.Param("id"), 10, 8)
	if err != nil {
		return controller.NewError(err, err.Error(), http.StatusBadRequest)
	}
	productModel, err := h.productManager.GetById(productId)
	if err != nil {
		return controller.NewError(err, err.Error(), http.StatusBadRequest)
	}
	userModel, _ := h.userManager.Extract(c)
	productDto := h.productMapper.ModelToDto(userModel, productModel)
	c.JSON(http.StatusOK, productDto)
	return nil
}

// getMy
// @Tags product
// @Security ApiKeyAuth
// @Accept json
// @Produce json
// @Success 200 {object} product.Dto
// @Failure 400 {string} error
// @Router /products/my [get]
func (h *handler) getMy(c *gin.Context) *controller.Error {
	userModel, _ := h.userManager.Extract(c)
	products, err := h.productManager.GetAllByUserId(userModel.ID)
	if err != nil {
		return controller.NewError(err, err.Error(), http.StatusBadRequest)
	}
	productsDto := h.productMapper.ModelsToDto(products, userModel)
	c.JSON(http.StatusOK, productsDto)
	return nil
}

// upload
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
func (h *handler) upload(c *gin.Context) *controller.Error {
	r, err := newToUpload(c)
	url, _, err := h.uploader.UploadFile(r.File, r.FileHeader)
	if err != nil {
		return controller.NewError(err, err.Error(), http.StatusBadRequest)
	}
	userModel, err := h.userManager.Extract(c)
	if err != nil {
		return controller.NewError(err, err.Error(), http.StatusBadRequest)
	}
	productModel := product.New(r.Name, url, r.Description, r.Licence, r.Category, userModel.ID, r.Price)
	err = h.productManager.Create(productModel)
	if err != nil {
		return controller.NewError(err, err.Error(), http.StatusInternalServerError)
	}
	c.JSON(http.StatusOK, url)
	return nil
}

// get
// @Tags product
// @Security ApiKeyAuth
// @Accept json
// @Produce json
// @Param offset query int true "offset"
// @Param limit query int true "limit"
// @Param orderBy query string false "price, likes_count, views_count"
// @Param isDesc query boolean false "isDesc"
// @Param category query string false "category"
// @Param author query string false "author"
// @Success 200 {object} product.Dto
// @Failure 400 {string} error
// @Router /products [get]
func (h *handler) get(c *gin.Context) *controller.Error {
	r, err := newToGet(c)
	if err != nil {
		return controller.NewError(err, err.Error(), http.StatusBadRequest)
	}
	products, err := h.productManager.Get(r.Limit, r.Offset, r.OrderBy, r.Category, r.Author, r.IsDest)
	if err != nil {
		return controller.NewError(err, err.Error(), http.StatusBadRequest)
	}
	userModel, _ := h.userManager.Extract(c)
	productsDto := h.productMapper.ModelsToDto(products, userModel)
	c.JSON(http.StatusOK, productsDto)
	return nil
}

// update
// @Tags product
// @Security ApiKeyAuth
// @Accept json
// @Produce json
// @Param update body product.UpdateInfo true "update"
// @Success 200 {string} ok
// @Failure 400 {string} error
// @Router /products/update [patch]
func (h *handler) update(c *gin.Context) *controller.Error {
	var updateIndo product.UpdateInfo
	if err := c.BindJSON(&updateIndo); err != nil {
		return controller.NewError(err, err.Error(), http.StatusBadRequest)
	}
	userModel, err := h.userManager.Extract(c)
	if err != nil {
		return controller.NewError(err, err.Error(), http.StatusBadRequest)
	}
	if err = h.productManager.Update(userModel.ID, &updateIndo); err != nil { //TODO
		return controller.NewError(err, err.Error(), http.StatusForbidden)
	}
	c.Status(http.StatusOK)
	return nil
}

// delete
// @Tags product
// @Security ApiKeyAuth
// @Accept json
// @Produce json
// @Param id path int true "id"
// @Success 200 {string} ok
// @Failure 400 {string} error
// @Router /products/{id} [delete]
func (h *handler) delete(c *gin.Context) *controller.Error {
	id, err := strconv.ParseUint(c.Param("id"), 10, 8)
	if err != nil {
		return controller.NewError(err, err.Error(), http.StatusBadRequest)
	}
	claims, err := h.jwtUtils.ExtractClaims(c)
	if err != nil {
		return controller.NewError(err, err.Error(), http.StatusBadRequest)
	}
	productModel, err := h.productManager.GetById(id)
	if err != nil {
		return controller.NewError(err, err.Error(), http.StatusBadRequest)
	}
	if productModel.Author.Username != claims[user.Username].(string) {
		return controller.NewError(err, "можно удалять только своё", http.StatusForbidden)
	}
	if err = h.productManager.Delete(productModel); err != nil {
		return controller.NewError(err, err.Error(), http.StatusBadRequest)
	}
	c.Status(http.StatusOK)
	return nil
}
