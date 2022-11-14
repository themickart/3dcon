package account

import (
	"api/internal/auth"
	"github.com/gin-gonic/gin"
)

func Route(h *Handler, r *gin.Engine) {
	account := r.Group("account")
	account.GET("/me", auth.Middleware(), h.Me)
}
