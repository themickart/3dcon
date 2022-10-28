package services

import (
	"api/internal"
	"api/internal/user"
	"errors"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"strings"
	"time"
)

type JwtUtils struct {
}

func NewJwtUtils() *JwtUtils {
	return &JwtUtils{}
}
func (jwtUtil *JwtUtils) GenerateJwt(currentUser *user.Model) (string, error) {
	token := jwt.New(jwt.SigningMethodHS512)
	claimsCurrent := token.Claims.(jwt.MapClaims)
	claimsCurrent[user.ExpiresAt] = time.Now().Add(10 * time.Hour).Unix()
	claimsCurrent[user.Username] = currentUser.Username
	claimsCurrent[user.RoleClaim] = currentUser.Role
	claimsCurrent[user.Email] = currentUser.Email
	tokenString, err := token.SignedString(internal.JwtPrivateKey)
	if err != nil {
		return "", err
	}
	return tokenString, nil
}

func (jwtUtil *JwtUtils) ExtractClaims(g *gin.Context) (jwt.MapClaims, error) {
	token, err := jwtUtil.ExtractToken(g)
	if err != nil {
		return nil, err
	}
	return token.Claims.(jwt.MapClaims), err
}

func (jwtUtil *JwtUtils) ExtractToken(g *gin.Context) (*jwt.Token, error) {
	request := g.Request
	tokenString := strings.Split(request.Header.Get("Authorization"), " ")[1]
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		_, ok := token.Method.(*jwt.SigningMethodHMAC)

		if !ok {
			return nil, errors.New("") //TODO:
		}
		return internal.JwtPrivateKey, nil
	})
	if err != nil {
		return nil, err
	}
	return token, err
}
