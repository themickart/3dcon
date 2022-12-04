package filestorage

import (
	"api/internal/domain/appHandler"
	"github.com/gin-gonic/gin"
)

func Route(r *gin.Engine) {
	h := NewHandler()
	r.GET("filestorage/:bucket/:filename", appHandler.New(h.Get).HTTP)
}
