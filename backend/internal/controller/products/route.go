package products

import (
	"api/internal/controller/appHandler"
	"api/internal/controller/auth"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Route(db *gorm.DB, r *gin.Engine) {
	h := NewHandler(db)
	products := r.Group("products")
	products.POST("/upload", auth.Required(), appHandler.New(h.Upload).ServeHTTP)
	products.GET("/my", auth.Required(), appHandler.New(h.GetMy).ServeHTTP)
	products.GET("/:id", appHandler.New(h.GetById).ServeHTTP)
	products.GET("", appHandler.New(h.Get).ServeHTTP)
	products.PATCH("/update", auth.Required(), appHandler.New(h.Update).ServeHTTP)
	products.DELETE("/delete/:id", auth.Required(), appHandler.New(h.Delete).ServeHTTP)
}
