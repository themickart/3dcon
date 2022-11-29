package auth

import (
	"api/internal/controller/appError"
	"api/internal/domain/auth"
	"api/internal/domain/user"
	"api/internal/services"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"net/http"
)

type Handler struct {
	userManager *services.UserManager
	jwtUtils    *services.JwtUtils
}

func NewHandler(db *gorm.DB) *Handler {
	return &Handler{
		userManager: services.NewUserManger(db),
		jwtUtils:    services.NewJwtUtils(),
	}
}

// HandleLogin
// @Tags auth
// @Accept json
// @Produce json
// @Param Login body LoginModel true "login"
// @Success 200 {string} token
// @Failure 400 {string} error
// @Router /auth/login [post]
func (h *Handler) HandleLogin(c *gin.Context) *appError.AppError {
	var loginModel auth.LoginModel
	if err := c.BindJSON(&loginModel); err != nil {
		return appError.New(err, err.Error(), http.StatusBadRequest)
	}
	userModel, err := h.userManager.GetUserByUsername(loginModel.Username)
	if err != nil {
		return appError.New(err, err.Error(), http.StatusConflict)
	}
	if !userModel.CheckPassword(loginModel.Password) {
		return appError.New(err, "неверный пароль", http.StatusUnauthorized)
	}
	jwtToken, err := h.jwtUtils.GenerateJwt(userModel)
	c.JSON(http.StatusOK, jwtToken)
	return nil
}

// HandleJoin
// @Tags auth
// @Accept json
// @Produce json
// @Param Join body JoinModel true "join"
// @Success 201 {string} token
// @Failure 400 {string} error
// @Router /auth/join [post]
func (h *Handler) HandleJoin(c *gin.Context) *appError.AppError {
	var joinModel auth.JoinModel
	if err := c.BindJSON(&joinModel); err != nil {
		return appError.New(err, err.Error(), http.StatusBadRequest)
	}
	userModel := user.New(joinModel.Username, joinModel.Email, joinModel.Password, user.UserRole)
	jwtToken, err := h.jwtUtils.GenerateJwt(userModel)
	if err != nil {
		return appError.New(err, err.Error(), http.StatusBadRequest)
	}
	err = h.userManager.CreateUser(userModel)
	if err != nil {
		return appError.New(err, err.Error(), http.StatusConflict)
	}
	c.JSON(http.StatusCreated, jwtToken)
	return nil
}
