package interactions

import (
	"api/internal/auth"
	"github.com/gin-gonic/gin"
)

func Route(h *Handler, r *gin.Engine) {
	products := r.Group("products")
	products.PATCH("/like/:id", auth.Middleware(), h.Like)
	products.PATCH("/remove_like/:id", auth.Middleware(), h.RemoveLike)
}
