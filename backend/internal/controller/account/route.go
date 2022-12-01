package account

import (
	"api/internal/controller/appHandler"
	"api/internal/controller/auth"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Route(db *gorm.DB, r *gin.Engine) {
	h := NewHandler(db)
	account := r.Group("account")
	account.GET("/me", auth.Required(), appHandler.New(h.Me).ServeHTTP)
	account.DELETE("/delete", auth.Required(), appHandler.New(h.Delete).ServeHTTP)
}
