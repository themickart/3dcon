package defaultAssets

import (
	"github.com/gin-gonic/gin"
)

func Route(r *gin.Engine) {
	h := NewHandler()
	account := r.Group("default")
	account.GET("/avatar.svg", h.Avatar)
}
