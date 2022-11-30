package products

import (
	"api/internal/controller"
	"api/internal/controller/auth"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Route(db *gorm.DB, r *gin.Engine) {
	h := NewHandler(db)
	products := r.Group("products")
	products.POST("/upload", auth.Required(), controller.AppHandler(h.Upload).ServeHTTP)
	products.GET("/my", auth.Required(), controller.AppHandler(h.GetMyProducts).ServeHTTP)
	products.GET("/:id", controller.AppHandler(h.GetProductsById).ServeHTTP)
	products.GET("", controller.AppHandler(h.GetProducts).ServeHTTP)
	products.PATCH("/update", auth.Required(), controller.AppHandler(h.Update).ServeHTTP)
}
