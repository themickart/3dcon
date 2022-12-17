package interaction

import (
	"api/internal/controller/auth"
	"api/internal/domain/appHandler"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Route(db *gorm.DB, r *gin.Engine) {
	h := NewHandler(db)
	products := r.Group("products")

	products.Use(auth.Required())
	products.PATCH("/like/:id", appHandler.New(h.Like).HTTP)
	products.PATCH("/remove_like/:id", appHandler.New(h.RemoveLike).HTTP)
	products.PATCH("/view/:id", appHandler.New(h.View).HTTP)
}
