package auth

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Route(db *gorm.DB, r *gin.Engine) {
	h := NewHandler(db)
	authorization := r.Group("auth")
	{
		authorization.POST("/join", h.HandleJoin)
		authorization.POST("/login", h.HandleLogin)
	}
}
