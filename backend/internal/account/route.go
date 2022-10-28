package account

import (
	"api/internal/auth"
	"api/internal/services"
	"github.com/gin-gonic/gin"
)

func Route(h *Handler, jwtUtils *services.JwtUtils, r *gin.Engine) {
	account := r.Group("account")
	account.GET("/me", auth.Middleware(jwtUtils), h.Me)
}
