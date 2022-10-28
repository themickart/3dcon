package auth

import (
	"github.com/gin-gonic/gin"
)

func Route(h *Handler, r *gin.Engine) {
	authorization := r.Group("auth")
	{
		authorization.POST("/join", h.HandleJoin)
		authorization.POST("/login", h.HandleLogin)
	}
}
