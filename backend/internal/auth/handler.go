package auth

import (
	"api/internal/services"
	"api/internal/user"
	"encoding/json"
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
	request := c.Request
	var loginModel LoginModel
	if err := json.NewDecoder(request.Body).Decode(&loginModel); err != nil {
		c.Status(http.StatusBadRequest)
		return
	}
	userModel, err := h.userManager.GetUserByUsername(loginModel.Username, loginModel.Password)
	if err != nil {
		c.JSON(http.StatusBadRequest, "неверный пароль")
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
	request := c.Request
	var joinModel JoinModel
	if err := json.NewDecoder(request.Body).Decode(&joinModel); err != nil {
		c.Status(http.StatusBadRequest)
		return
	}
	userModel := user.New(joinModel.Username, joinModel.Email, joinModel.Password, user.User)
	jwtToken, err := h.jwtUtils.GenerateJwt(userModel)
	if err != nil {
		panic(err)
	}
	c.JSON(http.StatusCreated, jwtToken)
	h.userManager.AddUser(userModel)
}
