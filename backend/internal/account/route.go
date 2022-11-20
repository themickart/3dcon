package account

import (
	"api/internal/auth"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Route(db *gorm.DB, r *gin.Engine) {
	h := NewHandler(db)
	account := r.Group("account")
	account.GET("/me", auth.Middleware(), h.Me)
}
