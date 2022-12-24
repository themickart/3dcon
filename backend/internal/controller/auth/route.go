package auth

import (
	"api/internal/controller"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Route(db *gorm.DB, r *gin.Engine) {
	h := newHandler(db)
	authorization := r.Group("auth")
	authorization.POST("/join", controller.NewHandler(h.join).HTTP)
	authorization.POST("/login", controller.NewHandler(h.login).HTTP)
}
