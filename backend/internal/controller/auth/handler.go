package auth

import (
	"api/internal/controller"
	"api/internal/domain/auth"
	"api/internal/domain/user"
	"api/internal/repo"
	"api/internal/util"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"net/http"
)

type handler struct {
	userManager *repo.UserManager
	jwtUtils    *util.JwtUtils
}

func newHandler(db *gorm.DB) *handler {
	return &handler{
		userManager: repo.NewUserManger(db),
		jwtUtils:    util.NewJwt(),
	}
}

// login
// @Tags auth
// @Accept json
// @Produce json
// @Param login body LoginModel true "login"
// @Success 200 {string} token
// @Failure 400 {string} error
// @Router /auth/login [post]
func (h *handler) login(c *gin.Context) *controller.Error {
	var loginModel auth.LoginModel
	if err := c.BindJSON(&loginModel); err != nil {
		return controller.NewError(err, err.Error(), http.StatusBadRequest)
	}
	userModel, err := h.userManager.GetByUsername(loginModel.Username)
	if err != nil {
		return controller.NewError(err, err.Error(), http.StatusConflict)
	}
	if !userModel.CheckPassword(loginModel.Password) {
		return controller.NewError(err, "неверный пароль", http.StatusUnauthorized)
	}
	jwtToken, err := h.jwtUtils.GenerateJwt(userModel)
	c.JSON(http.StatusOK, jwtToken)
	return nil
}

// join
// @Tags auth
// @Accept json
// @Produce json
// @Param join body JoinModel true "join"
// @Success 201 {string} token
// @Failure 400 {string} error
// @Router /auth/join [post]
func (h *handler) join(c *gin.Context) *controller.Error {
	var joinModel auth.JoinModel
	if err := c.BindJSON(&joinModel); err != nil {
		return controller.NewError(err, err.Error(), http.StatusBadRequest)
	}
	userModel := user.New(joinModel.Username, joinModel.Email, joinModel.Password, user.UserRole)
	jwtToken, err := h.jwtUtils.GenerateJwt(userModel)
	if err != nil {
		return controller.NewError(err, err.Error(), http.StatusBadRequest)
	}
	err = h.userManager.Create(userModel)
	if err != nil {
		return controller.NewError(err, err.Error(), http.StatusConflict)
	}
	c.JSON(http.StatusCreated, jwtToken)
	return nil
}
