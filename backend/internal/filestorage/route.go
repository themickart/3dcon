package filestorage

import (
	"github.com/gin-gonic/gin"
)

func Route(h *Handler, r *gin.Engine) {
	r.GET("filestorage/:bucket/:filename", h.GetFile)
}
