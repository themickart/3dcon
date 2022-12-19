package user

import (
	"api/internal/domain/appError"
	"api/internal/domain/user"
	"api/internal/repo"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"net/http"
)

type handler struct {
	userManager *repo.UserManager
}

func newHandler(db *gorm.DB) *handler {
	return &handler{userManager: repo.NewUserManger(db)}
}

// GetById
// @Tags user
// @Accept json
// @Produce json
// @Param username path string true "username"
// @Success 200 {object} user.Dto
// @Failure 400 {string} error
// @Failure 404 {string} error
// @Router /user/{username} [get]
func (h *handler) get(c *gin.Context) *appError.AppError {
	username := c.Param("username")
	userModel, err := h.userManager.GetByUsername(username)
	if err != nil {
		return appError.New(err, err.Error(), http.StatusNotFound)
	}
	dto := user.NewDto(userModel)
	c.JSON(http.StatusOK, dto)
	return nil
}
