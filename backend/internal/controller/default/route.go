package _default

import (
	"api/internal/domain/appHandler"
	"github.com/gin-gonic/gin"
)

func Route(r *gin.Engine) {
	h := NewHandler()
	account := r.Group("default")
	account.GET("/avatar.svg", appHandler.New(h.Avatar).HTTP)
}
