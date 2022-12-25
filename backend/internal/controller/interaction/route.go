package interaction

import (
	"api/internal/controller/interaction/product"
	"api/internal/controller/interaction/user"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Route(db *gorm.DB, r *gin.Engine) {
	product.Route(db, r)
	user.Route(db, r)
}
