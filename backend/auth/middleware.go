package auth

import (
	"backend/context"
	"errors"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"net/http"
	"strings"
)

func Middleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		if c.GetHeader("Authorization") == "" {
			c.AbortWithStatus(http.StatusUnauthorized)
			return
		}
		fmt.Println(c.GetHeader("Authorization"))
		tokenString := strings.Split(c.GetHeader("Authorization"), " ")[1]
		_, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			_, ok := token.Method.(*jwt.SigningMethodHMAC)

			if !ok {
				return nil, errors.New("") //TODO:
			}
			return context.JwtPrivateKey, nil
		})

		if err != nil {
			panic(err)
		}
		c.Next()
	}
}
