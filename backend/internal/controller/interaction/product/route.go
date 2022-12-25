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

	products.Use(auth.Required())
	products.PATCH("/like/:id", controller.NewHandler(h.like).HTTP)
	products.DELETE("/like/:id", controller.NewHandler(h.deleteLike).HTTP)
	products.PATCH("/view/:id", controller.NewHandler(h.view).HTTP)
}
