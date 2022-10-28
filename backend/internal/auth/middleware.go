package auth

import (
	"api/internal/services"
	"github.com/gin-gonic/gin"
	"net/http"
)

func Middleware(jwtUtil *services.JwtUtils) gin.HandlerFunc {
	return func(c *gin.Context) {
		if c.GetHeader("Authorization") == "" {
			c.AbortWithStatus(http.StatusUnauthorized)
			return
		}

		if _, err := jwtUtil.ExtractToken(c); err != nil {
			panic(err)
		}
		c.Next()
	}
}
