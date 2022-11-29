package filestorage

import (
	"api/internal/controller"
	"github.com/gin-gonic/gin"
)

func Route(r *gin.Engine) {
	h := NewHandler()
	r.GET("filestorage/:bucket/:filename", controller.AppHandler(h.GetFile).ServeHTTP)
}
