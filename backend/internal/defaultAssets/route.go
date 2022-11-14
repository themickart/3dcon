package defaultAssets

import (
	"github.com/gin-gonic/gin"
)

func Route(h *Handler, r *gin.Engine) {
	account := r.Group("default")
	account.GET("/avatar.svg", h.Avatar)
}
