package interactions

import (
	"api/internal/controller/appHandler"
	"api/internal/controller/auth"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Route(db *gorm.DB, r *gin.Engine) {
	h := NewHandler(db)
	products := r.Group("products")
	products.PATCH("/like/:id", auth.Required(), appHandler.New(h.Like).ServeHTTP)
	products.PATCH("/remove_like/:id", auth.Required(), appHandler.New(h.RemoveLike).ServeHTTP)
	products.PATCH("/view/:id", auth.Required(), appHandler.New(h.View).ServeHTTP)
}
