package auth

import (
	"backend/context"
	"backend/user"
	"errors"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"strings"
	"time"
)

type Jwt string

func GenerateJwt(currentUser *user.Model) (Jwt, error) {
	token := jwt.New(jwt.SigningMethodHS512)
	claimsCurrent := token.Claims.(jwt.MapClaims)
	claimsCurrent[user.ExpiresAt] = time.Now().Add(10 * time.Hour).Unix()
	claimsCurrent[user.Username] = currentUser.Username
	claimsCurrent[user.RoleClaim] = currentUser.Role
	claimsCurrent[user.Email] = currentUser.Email
	tokenString, err := token.SignedString(context.JwtPrivateKey)
	if err != nil {
		return "", err
	}
	return Jwt(tokenString), nil
}

func ExtractClaims(g *gin.Context) (jwt.MapClaims, error) {
	request := g.Request
	tokenString := strings.Split(request.Header.Get("Authorization"), " ")[1]
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		_, ok := token.Method.(*jwt.SigningMethodHMAC)

		if !ok {
			return nil, errors.New("") //TODO:
		}
		return context.JwtPrivateKey, nil
	})
	if err != nil {
		return nil, err
	}
	return token.Claims.(jwt.MapClaims), err
}
