package interactions

import (
	"api/internal/auth"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Route(db *gorm.DB, r *gin.Engine) {
	h := NewHandler(db)
	products := r.Group("products")
	products.PATCH("/like/:id", auth.Middleware(), h.Like)
	products.PATCH("/remove_like/:id", auth.Middleware(), h.RemoveLike)
	products.PATCH("/view/:id", auth.Middleware(), h.View)
}
