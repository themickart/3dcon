package products

import (
	"api/internal/controller/auth"
	"api/internal/domain/appHandler"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Route(db *gorm.DB, r *gin.Engine) {
	h := NewHandler(db)

	products := r.Group("products")
	products.GET("/:id", appHandler.New(h.GetById).HTTP)
	products.GET("", appHandler.New(h.Get).HTTP)

	productsAuth := r.Group("products")
	productsAuth.Use(auth.Required())
	productsAuth.POST("/upload", appHandler.New(h.Upload).HTTP)
	productsAuth.GET("/my", appHandler.New(h.GetMy).HTTP)
	productsAuth.PATCH("/update", appHandler.New(h.Update).HTTP)
	productsAuth.DELETE("/delete/:id", appHandler.New(h.Delete).HTTP)
}
