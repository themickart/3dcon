package account

import (
	"api/internal/services"
	"api/internal/user"
	"github.com/gin-gonic/gin"
	"net/http"
)

type Handler struct {
	jwtUtils *services.JwtUtils
}

func NewHandler(jwtUtils *services.JwtUtils) *Handler {
	return &Handler{jwtUtils: jwtUtils}
}

// Me
// @Tags account
// @Security ApiKeyAuth
// @Accept json
// @Produce json
// @Success 200 {object} user.ModelDto
// @Router /account/me [get]
func (h *Handler) Me(c *gin.Context) {
	claims, _ := h.jwtUtils.ExtractClaims(c)
	userDto := user.ModelDto{
		Username: claims[user.Username].(string),
		Role:     user.Role(claims[user.RoleClaim].(string)),
		Email:    claims[user.Email].(string),
	}
	c.JSON(http.StatusOK, userDto)
}
