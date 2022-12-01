package products

import (
	"api/internal/controller/appError"
	"api/internal/domain/product"
	"api/internal/domain/user"
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
	likeManager    *services.LikeManager
	viewManager    *services.ViewManager
	jwtUtils       *services.JwtUtils
}

func NewHandler(db *gorm.DB) *Handler {
	return &Handler{
		fileStorage:    services.NewFileStorage(),
		userManager:    services.NewUserManger(db),
		productManager: services.NewProductManager(db),
		likeManager:    services.NewLikeManager(db),
		viewManager:    services.NewViewManager(db),
		jwtUtils:       services.NewJwtUtils(),
	}
}

// GetProductsById
// @Tags product
// @Accept json
// @Produce json
// @Param id path int true "id"
// @Success 200 {object} product.ModelDto
// @Failure 400 {string} error
// @Router /products/{id} [get]
func (h *Handler) GetProductsById(c *gin.Context) *appError.AppError {
	productId, err := strconv.ParseUint(c.Param("id"), 10, 8)
	if err != nil {
		return appError.New(err, err.Error(), http.StatusBadRequest)
	}
	productModel, err := h.productManager.GetById(productId)
	if err != nil {
		return appError.New(err, err.Error(), http.StatusBadRequest)
	}
	currentUserModel, err := h.userManager.Extract(c)
	productDto := product.NewDto(productModel)
	if err == nil {
		newProductDto, err := h.addViewedAndLiked(currentUserModel.ID, productModel.ID, productDto)
		if err == nil {
			productDto = newProductDto
		}
	}
	c.JSON(http.StatusOK, productDto)
	return nil
}

// GetMyProducts
// @Tags product
// @Security ApiKeyAuth
// @Accept json
// @Produce json
// @Success 200 {object} product.ModelDto[]
// @Failure 400 {string} error
// @Router /products/my [get]
func (h *Handler) GetMyProducts(c *gin.Context) *appError.AppError {
	userModel, err := h.userManager.Extract(c)
	products, err := h.productManager.GetAllByUserId(userModel.ID)
	if err != nil {
		return appError.New(err, err.Error(), http.StatusBadRequest)
	}
	productsDto := make([]*product.ModelDto, len(products))
	for i, productModel := range products {
		productModelDto := product.NewDto(productModel)
		productModelDto, err = h.addViewedAndLiked(userModel.ID, productModel.ID, productModelDto)
		if err != nil {
			continue
		}
		productsDto[i] = productModelDto
	}
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
	url, _, err := h.uploadFile(c, "cover")
	if err != nil {
		return appError.New(err, err.Error(), http.StatusBadRequest)
	}
	userModel, err := h.userManager.Extract(c)
	if err != nil {
		return appError.New(err, err.Error(), http.StatusBadRequest)
	}
	productModel := product.New(name, url, description, licence, "не реализовано", userModel.ID, price)
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

// GetProducts
// @Tags product
// @Accept json
// @Produce json
// @Success 200 {object} product.ModelDto[]
// @Failure 400 {string} error
// @Router /products [get]
func (h *Handler) GetProducts(c *gin.Context) *appError.AppError {
	offset := 0
	count := 20
	products, err := h.productManager.GetCount(count, offset)
	currentUserModel, _ := h.userManager.Extract(c)
	if err != nil {
		return appError.New(err, err.Error(), http.StatusBadRequest)
	}
	productsDto := make([]*product.ModelDto, len(products))
	for i, productModel := range products {
		if err != nil {
			continue
		}
		productDto := product.NewDto(productModel)
		if currentUserModel == nil {
			productsDto[i] = productDto
			continue
		}
		productDto, err = h.addViewedAndLiked(currentUserModel.ID, productModel.ID, productDto)
		if err != nil {
			continue
		}
		productsDto[i] = productDto
	}
	c.JSON(http.StatusOK, productsDto)
	return nil
}

func (h *Handler) addViewedAndLiked(userId, productId uint, productDto *product.ModelDto) (*product.ModelDto, error) {
	isLiked, err := h.likeManager.LikedByIds(userId, productId)
	if err != nil {
		return nil, err
	}
	isViewed, err := h.viewManager.ViewedByIds(userId, productId)
	if err != nil {
		return nil, err
	}
	return product.NewViewedAndLikedDtoFromDto(*productDto, isViewed, isLiked), nil
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
