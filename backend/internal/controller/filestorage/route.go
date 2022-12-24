package filestorage

import (
	"api/internal/controller"
	"github.com/gin-gonic/gin"
)

func Route(r *gin.Engine) {
	h := newHandler()
	r.GET("filestorage/:bucket/:filename", controller.NewHandler(h.get).HTTP)
}
