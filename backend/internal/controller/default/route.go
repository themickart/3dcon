package _default

import (
	"api/internal/controller/appHandler"
	"github.com/gin-gonic/gin"
)

func Route(r *gin.Engine) {
	h := NewHandler()
	account := r.Group("default")
	account.GET("/avatar.svg", appHandler.New(h.Avatar).ServeHTTP)
}
