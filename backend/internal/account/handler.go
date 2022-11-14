package account

import (
	"api/internal/domain/user"
	"api/internal/services"
	"github.com/gin-gonic/gin"
	"net/http"
)

type Handler struct {
	jwtUtils    *services.JwtUtils
	userManager *services.UserManager
}

func NewHandler(userManager *services.UserManager) *Handler {
	return &Handler{
		jwtUtils:    services.NewJwtUtils(),
		userManager: userManager}
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
	userModel, err := h.userManager.GetUserByUsername(claims[user.Username].(string))
	if err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}
	userDto := user.NewDto(userModel)
	c.JSON(http.StatusOK, userDto)
}
