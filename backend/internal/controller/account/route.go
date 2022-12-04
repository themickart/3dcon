package account

import (
	"api/internal/controller/auth"
	"api/internal/domain/appHandler"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Route(db *gorm.DB, r *gin.Engine) {
	h := NewHandler(db)
	account := r.Group("account")
	account.Use(auth.Required())
	account.GET("/me", appHandler.New(h.Me).HTTP)
	account.DELETE("/delete", appHandler.New(h.Delete).HTTP)
}
