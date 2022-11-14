package products

import (
	"api/internal/domain/product"
	"api/internal/domain/user"
	"api/internal/services"
	"github.com/gin-gonic/gin"
	"io"
	"net/http"
	"strconv"
)

type Handler struct {
	userManager    *services.UserManager
	jwtUtils       *services.JwtUtils
	productManager *services.ProductManager
	fileStorage    *services.FileStorage
}

func NewHandler(userManager *services.UserManager, jwtUtils *services.JwtUtils,
	productManager *services.ProductManager, fileStorage *services.FileStorage) *Handler {
	return &Handler{
		fileStorage:    fileStorage,
		userManager:    userManager,
		jwtUtils:       jwtUtils,
		productManager: productManager,
	}
}

// Get
// @Tags product
// @Accept json
// @Produce json
// @Param id path int true "id"
// @Success 200 {object} product.ModelDto
// @Failure 400 {string} error
// @Router /products/{id} [get]
func (h *Handler) Get(c *gin.Context) {
	id := c.Param("id")
	productModel, err := h.productManager.GetProductById(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, productModel)
	}
	userModel, _ := h.userManager.GetUserById(productModel.OwnerId)
	productDto := product.NewDto(productModel, user.NewDto(userModel))
	c.JSON(http.StatusOK, productDto)
}

// GetFile
// @Tags filestorage
// @Accept json
// @Produce json
// @Param id path string true "id"
// @Success 200 {string} string
// @Failure 400 {string} error
// @Router /filestorage/{id} [get]
func (h *Handler) GetFile(c *gin.Context) {
	id := c.Param("id")
	file, err := h.fileStorage.Get(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
	}
	data := make([]byte, 1024)
	for {
		n, err := file.Read(data)
		if err == io.EOF {
			break
		}
		_, _ = c.Writer.Write(data[:n])
	}
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}
	c.Status(http.StatusOK)
}

// GetMyProducts
// @Tags product
// @Security ApiKeyAuth
// @Accept json
// @Produce json
// @Success 200 {object} product.ModelDto
// @Failure 400 {string} error
// @Router /products/my [get]
func (h *Handler) GetMyProducts(c *gin.Context) {
	claims, _ := h.jwtUtils.ExtractClaims(c)
	userModel, err := h.userManager.GetUserByUsername(claims[user.Username].(string))
	products, err := h.productManager.GetAllProductsByOwnerId(userModel.ID)
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}
	productsDto := make([]*product.ModelDto, len(products))
	for i := range products {
		productsDto[i] = product.NewDto(products[i], user.NewDto(userModel))
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
	claims, err := h.jwtUtils.ExtractClaims(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}
	userModel, err := h.userManager.GetUserByUsername(claims[user.Username].(string))
	productModel := product.New(name, url, description, licence, userModel.ID, price)
	_ = h.productManager.AddProduct(productModel)
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
