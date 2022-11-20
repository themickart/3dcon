package products

import (
	"api/internal/auth"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Route(db *gorm.DB, r *gin.Engine) {
	h := NewHandler(db)
	products := r.Group("products")
	products.POST("/upload", auth.Middleware(), h.Upload)
	products.GET("/my", auth.Middleware(), h.GetMyProducts)
	products.GET("/:id", h.GetProductsById)
	products.GET("/", h.GetProducts)
}
