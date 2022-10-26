package account

import (
	"backend/auth"
	"backend/user"
	"github.com/gin-gonic/gin"
	"net/http"
)

// Me
// @Tags account
// @Security ApiKeyAuth
// @Accept json
// @Produce json
// @Success 200 {object} user.ModelDto
// @Router /account/me [get]
func Me(g *gin.Context) {
	claims, _ := auth.ExtractClaims(g)
	userDto := user.ModelDto{
		Username: claims[user.Username].(string),
		Role:     user.Role(claims[user.RoleClaim].(string)),
		Email:    claims[user.Email].(string),
	}
	g.JSON(http.StatusOK, userDto)
}
