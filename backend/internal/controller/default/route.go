package _default

import (
	"api/internal/controller"
	"github.com/gin-gonic/gin"
)

func Route(r *gin.Engine) {
	h := NewHandler()
	account := r.Group("default")
	account.GET("/avatar.svg", controller.AppHandler(h.Avatar).ServeHTTP)
}
