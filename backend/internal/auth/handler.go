package auth

import (
	"api/internal/domain/user"
	"api/internal/services"
	"github.com/gin-gonic/gin"
	"net/http"
)

type Handler struct {
	userManager *services.UserManager
	jwtUtils    *services.JwtUtils
}

func NewHandler(userManager *services.UserManager, jwtUtils *services.JwtUtils) *Handler {
	return &Handler{
		userManager: userManager,
		jwtUtils:    jwtUtils,
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
func (h *Handler) HandleLogin(c *gin.Context) {
	var loginModel LoginModel
	if err := c.BindJSON(&loginModel); err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}
	userModel, err := h.userManager.GetUserByUsername(loginModel.Username)
	if err != nil {
		c.JSON(http.StatusConflict, err.Error())
		return
	}
	if !userModel.CheckPassword(loginModel.Password) {
		c.JSON(http.StatusUnauthorized, "неверный пароль")
		return
	}
	jwtToken, err := h.jwtUtils.GenerateJwt(userModel)
	c.JSON(http.StatusOK, jwtToken)
}

// HandleJoin
// @Tags auth
// @Accept json
// @Produce json
// @Param Join body JoinModel true "join"
// @Success 201 {string} token
// @Failure 400 {string} error
// @Router /auth/join [post]
func (h *Handler) HandleJoin(c *gin.Context) {
	var joinModel JoinModel
	if err := c.BindJSON(&joinModel); err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}
	userModel := user.New(joinModel.Username, joinModel.Email, joinModel.Password, user.UserRole)
	jwtToken, err := h.jwtUtils.GenerateJwt(userModel)
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}
	err = h.userManager.AddUser(userModel)
	if err != nil {
		c.JSON(http.StatusConflict, err.Error())
		return
	}
	c.JSON(http.StatusCreated, jwtToken)
}
