package user

import (
	"api/internal/domain/appHandler"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Route(db *gorm.DB, r *gin.Engine) {
	h := newHandler(db)
	user := r.Group("user")
	user.GET(":username", appHandler.New(h.get).HTTP)
}
