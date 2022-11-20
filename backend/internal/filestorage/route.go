package filestorage

import (
	"github.com/gin-gonic/gin"
)

func Route(r *gin.Engine) {
	h := NewHandler()
	r.GET("filestorage/:bucket/:filename", h.GetFile)
}
