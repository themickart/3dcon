package user

import (
	"api/internal/controller"
	"api/internal/controller/auth"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Route(db *gorm.DB, r *gin.Engine) {
	h := newHandler(db)
	userAuth := r.Group("user")

	userAuth.Use(auth.Required())
	userAuth.POST("review/:ratedId", controller.NewHandler(h.review).HTTP)

	user := r.Group("user")
	user.GET("review", controller.NewHandler(h.get).HTTP)
}
