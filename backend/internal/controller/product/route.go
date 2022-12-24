package product

import (
	"api/internal/controller"
	"api/internal/controller/auth"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Route(db *gorm.DB, r *gin.Engine) {
	h := newHandler(db)

	products := r.Group("products")
	products.GET("/:id", controller.NewHandler(h.getById).HTTP)
	products.GET("", controller.NewHandler(h.get).HTTP)

	productsAuth := r.Group("products")
	productsAuth.Use(auth.Required())
	productsAuth.POST("/upload", controller.NewHandler(h.upload).HTTP)
	productsAuth.GET("/my", controller.NewHandler(h.getMy).HTTP)
	productsAuth.PATCH("/update", controller.NewHandler(h.update).HTTP)
	productsAuth.DELETE("/:id", controller.NewHandler(h.delete).HTTP)
}
