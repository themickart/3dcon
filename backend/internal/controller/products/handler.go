package products

import (
	"api/internal/domain/appError"
	"api/internal/domain/product"
	"api/internal/domain/user"
	"api/internal/mappers"
	"api/internal/services"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"net/http"
	"strconv"
)

type Handler struct {
	userManager    *services.UserManager
	productManager *services.ProductManager
	fileStorage    *services.FileStorage
	jwtUtils       *services.JwtUtils
	productMapper  *mappers.Product
}

func NewHandler(db *gorm.DB) *Handler {
	return &Handler{
		fileStorage:    services.NewFileStorage(),
		userManager:    services.NewUserManger(db),
		productManager: services.NewProductManager(db),
		productMapper:  mappers.NewProductMapper(db),
		jwtUtils:       services.NewJwtUtils(),
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
// @Success 200 {object} product.Dto[]
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
	name := c.Request.FormValue("name")
	description := c.Request.FormValue("description") //TODO
	licence := c.Request.FormValue("licence")
	price, err := strconv.ParseFloat(c.Request.FormValue("price"), 32)
	category := c.Request.FormValue("category")
	url, _, err := h.uploadFile(c, "cover")
	if err != nil {
		return appError.New(err, err.Error(), http.StatusBadRequest)
	}
	userModel, err := h.userManager.Extract(c)
	if err != nil {
		return appError.New(err, err.Error(), http.StatusBadRequest)
	}
	productModel := product.New(name, url, description, licence, category, userModel.ID, price)
	err = h.productManager.Create(productModel)
	if err != nil {
		return appError.New(err, err.Error(), http.StatusInternalServerError)
	}
	c.JSON(http.StatusOK, url)
	return nil
}

func (h *Handler) uploadFile(c *gin.Context, key string) (url string, name string, err error) {
	file, fileHeader, err := c.Request.FormFile(key)
	if err != nil {
		return "", "", err
	}
	defer file.Close()
	data := make([]byte, fileHeader.Size)
	_, _ = file.Read(data)
	url, name, err = h.fileStorage.Create(data, fileHeader.Size, fileHeader.Filename)
	if err != nil {
		return "", "", err
	}
	return
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
// @Success 200 {object} product.Dto[]
// @Failure 400 {string} error
// @Router /products [get]
func (h *Handler) Get(c *gin.Context) *appError.AppError {
	offset, err := strconv.ParseUint(c.Query("offset"), 9, 10)
	if err != nil {
		return appError.New(err, err.Error(), http.StatusBadRequest)
	}
	limit, err := strconv.ParseUint(c.Query("limit"), 9, 10)
	if err != nil {
		return appError.New(err, err.Error(), http.StatusBadRequest)
	}
	orderBy := c.Query("orderBy")
	filterBy := c.Query("filterBy")
	isDesc, _ := strconv.ParseBool(c.Query("isDesc"))
	products, err := h.productManager.Get(int(limit), int(offset), orderBy, filterBy, isDesc)
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
	if err = h.productManager.Update(userModel.ID, &updateIndo); err != nil {
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
		return appError.New(err, "можно удалять только свои продукты", http.StatusForbidden)
	}
	if err = h.productManager.Delete(productModel); err != nil {
		return appError.New(err, err.Error(), http.StatusBadRequest)
	}
	c.Status(http.StatusOK)
	return nil
}
