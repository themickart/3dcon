package auth

import (
	"api/internal/domain/appHandler"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Route(db *gorm.DB, r *gin.Engine) {
	h := NewHandler(db)
	authorization := r.Group("auth")
	authorization.POST("/join", appHandler.New(h.Join).HTTP)
	authorization.POST("/login", appHandler.New(h.Login).HTTP)
}
