package filestorage

import (
	"api/internal/controller/appHandler"
	"github.com/gin-gonic/gin"
)

func Route(r *gin.Engine) {
	h := NewHandler()
	r.GET("filestorage/:bucket/:filename", appHandler.New(h.Get).ServeHTTP)
}
