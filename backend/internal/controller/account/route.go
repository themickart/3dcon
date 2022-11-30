package account

import (
	"api/internal/controller"
	"api/internal/controller/auth"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Route(db *gorm.DB, r *gin.Engine) {
	h := NewHandler(db)
	account := r.Group("account")
	account.GET("/me", auth.Required(), controller.AppHandler(h.Me).ServeHTTP)
}
