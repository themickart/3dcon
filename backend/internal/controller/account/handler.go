package account

import (
	"api/internal/controller/appError"
	"api/internal/domain/user"
	"api/internal/services"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"net/http"
)

type Handler struct {
	jwtUtils    *services.JwtUtils
	userManager *services.UserManager
}

func NewHandler(db *gorm.DB) *Handler {
	return &Handler{
		jwtUtils:    services.NewJwtUtils(),
		userManager: services.NewUserManger(db),
	}
}

// Me
// @Tags account
// @Security ApiKeyAuth
// @Accept json
// @Produce json
// @Success 200 {object} user.ModelDto
// @Router /account/me [get]
func (h *Handler) Me(c *gin.Context) *appError.AppError {
	claims, _ := h.jwtUtils.ExtractClaims(c)
	userModel, err := h.userManager.GetUserByUsername(claims[user.Username].(string))
	if err != nil {
		return appError.New(err, err.Error(), http.StatusInternalServerError)
	}
	userDto := user.NewDto(userModel)
	c.JSON(http.StatusOK, userDto)
	return nil
}
