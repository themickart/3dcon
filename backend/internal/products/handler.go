package products

import (
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
	jwtUtils       *services.JwtUtils
	productManager *services.ProductManager
	fileStorage    *services.FileStorage
	likeManager    *services.LikeManager
	viewManager    *services.ViewManager
}

func NewHandler(db *gorm.DB) *Handler {
	return &Handler{
		fileStorage:    services.NewFileStorage(),
		userManager:    services.NewUserManger(db),
		jwtUtils:       services.NewJwtUtils(),
		productManager: services.NewProductManager(db),
		likeManager:    services.NewLikeManager(db),
		viewManager:    services.NewViewManager(db),
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
func (h *Handler) GetProductsById(c *gin.Context) {
	id := c.Param("id")
	productId, err := strconv.ParseUint(id, 10, 8)
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}
	productModel, err := h.productManager.GetProductById(uint(productId))
	if err != nil {
		c.JSON(http.StatusBadRequest, productModel)
	}
	currentUserModel, _ := h.userManager.ExtractUser(c)
	productDto := product.NewDto(productModel)
	newProductDto, err := h.addViewedAndLiked(currentUserModel.ID, productModel.ID, productDto)
	if err != nil {
		c.JSON(http.StatusOK, newProductDto)
	}
	c.JSON(http.StatusOK, productDto)
}

// GetMyProducts
// @Tags product
// @Security ApiKeyAuth
// @Accept json
// @Produce json
// @Success 200 {object} product.ModelDto[]
// @Failure 400 {string} error
// @Router /products/my [get]
func (h *Handler) GetMyProducts(c *gin.Context) {
	claims, _ := h.jwtUtils.ExtractClaims(c)
	userModel, err := h.userManager.GetUserByUsername(claims[user.Username].(string))
	products, err := h.productManager.GetAllProductsByUserId(userModel.ID)
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
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
func (h *Handler) Upload(c *gin.Context) {
	name := c.Request.FormValue("name")
	description := c.Request.FormValue("description") //TODO
	licence := c.Request.FormValue("licence")
	price, err := strconv.ParseFloat(c.Request.FormValue("price"), 32)
	url, _, err := h.uploadFile(c, "cover")
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}
	userModel, err := h.userManager.ExtractUser(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}
	productModel := product.New(name, url, description, licence, userModel.ID, price)
	err = h.productManager.CreateProduct(productModel)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}
	c.JSON(http.StatusOK, url)
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
// @Router /products/ [get]
func (h *Handler) GetProducts(c *gin.Context) {
	offset := 0
	count := 20
	products, err := h.productManager.GetProducts(count, offset)
	currentUserModel, _ := h.userManager.ExtractUser(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
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
