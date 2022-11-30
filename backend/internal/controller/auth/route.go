package auth

import (
	"api/internal/controller"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Route(db *gorm.DB, r *gin.Engine) {
	h := NewHandler(db)
	authorization := r.Group("auth")
	{
		authorization.POST("/join", controller.AppHandler(h.HandleJoin).ServeHTTP)
		authorization.POST("/login", controller.AppHandler(h.HandleLogin).ServeHTTP)
	}
}
