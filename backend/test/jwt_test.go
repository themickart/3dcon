package test

import (
	"api/internal/domain/user"
	"api/internal/services"
	"github.com/golang-jwt/jwt"
	"testing"
)

func TestGenerateJwt(t *testing.T) {
	jwtUtils := services.JwtUtils{}
	username := "oliver"
	email := "f@gmail.com"
	password := ""
	tokenString, _ := jwtUtils.GenerateJwt(user.New(username, email, password, user.User))
	token, _ := jwtUtils.ExtractTokenFromString(tokenString)
	mapClaims := token.Claims.(jwt.MapClaims)
	if mapClaims[user.Username] != username {
		t.Fatalf("user.Username != %s", username)
	}
	if mapClaims[user.Email] != email {
		t.Fatalf("user.Email != %s", email)
	}
	if mapClaims[user.RoleClaim] != string(user.User) {
		t.Fatalf("user.RoleClaim != %s", user.User)
	}
}
