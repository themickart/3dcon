package products

import (
	"api/internal/auth"
	"api/internal/services"
	"github.com/gin-gonic/gin"
)

func Route(h *Handler, jwtUtils *services.JwtUtils, r *gin.Engine) {
	r.GET("filestorage/:id", h.GetFile)
	products := r.Group("products")
	products.POST("/upload", auth.Middleware(jwtUtils), h.Upload)
	products.GET("/my", auth.Middleware(jwtUtils), h.GetMyProducts)
	products.GET("/:id", h.Get)
}
