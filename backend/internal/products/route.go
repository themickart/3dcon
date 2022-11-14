package products

import (
	"api/internal/auth"
	"github.com/gin-gonic/gin"
)

func Route(h *Handler, r *gin.Engine) {
	products := r.Group("products")
	products.POST("/upload", auth.Middleware(), h.Upload)
	products.GET("/my", auth.Middleware(), h.GetMyProducts)
	products.GET("/:id", h.GetProductsById)
	products.GET("/", h.GetProducts)
}
