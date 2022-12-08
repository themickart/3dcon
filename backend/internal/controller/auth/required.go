package auth

import (
	"api/internal/utils"
	"github.com/gin-gonic/gin"
	"net/http"
)

func Required() gin.HandlerFunc {
	jwtUtils := utils.NewJwt()
	return func(c *gin.Context) {
		if c.GetHeader("Authorization") == "" {
			c.AbortWithStatus(http.StatusUnauthorized)
			return
		}
		if _, err := jwtUtils.ExtractToken(c); err != nil {
			c.AbortWithStatusJSON(http.StatusBadRequest, err.Error())
			return
		}
		c.Next()
	}
}
