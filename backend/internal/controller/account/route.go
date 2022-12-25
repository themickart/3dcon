package account

import (
	"api/internal/controller"
	"api/internal/controller/auth"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Route(db *gorm.DB, r *gin.Engine) {
	h := newHandler(db)
	account := r.Group("account")
	account.Use(auth.Required())
	account.GET("/me", controller.NewHandler(h.me).HTTP)
	account.DELETE("", controller.NewHandler(h.delete).HTTP)
	account.PATCH("avatar", controller.NewHandler(h.updateAvatar).HTTP)
}
