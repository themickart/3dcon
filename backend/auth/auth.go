package auth

import (
	"backend/context"
	"backend/user"
	"encoding/json"
	"github.com/gin-gonic/gin"
	"net/http"
)

var userManager = UserManager{}

// HandleLogin
// @Tags auth
// @Accept json
// @Produce json
// @Param Login body LoginModel true "login"
// @Success 200 {string} token
// @Failure 400 {string} error
// @Router /auth/login [post]
func HandleLogin(g *gin.Context) {
	request := g.Request
	var loginModel LoginModel
	if err := json.NewDecoder(request.Body).Decode(&loginModel); err != nil {
		g.Status(http.StatusBadRequest)
		return
	}
	userModel, err := userManager.GetUser(&loginModel)
	if err != nil {
		g.JSON(http.StatusBadRequest, "неверный пароль")
		return
	}
	jwtToken, err := GenerateJwt(userModel)
	g.JSON(http.StatusOK, jwtToken)
}

// HandleJoin
// @Tags auth
// @Accept json
// @Produce json
// @Param Join body JoinModel true "join"
// @Success 201 {string} token
// @Failure 400 {string} error
// @Router /auth/join [post]
func HandleJoin(g *gin.Context) {
	request := g.Request
	var joinModel JoinModel
	if err := json.NewDecoder(request.Body).Decode(&joinModel); err != nil {
		g.Status(http.StatusBadRequest)
		return
	}
	userModel := user.New(joinModel.Username, joinModel.Email, joinModel.Password, user.User)
	jwtToken, err := GenerateJwt(userModel)
	if err != nil {
		panic(err)
	}
	g.JSON(http.StatusCreated, jwtToken)
	userManager.AddUser(userModel)
}

type UserManager struct {
}

func (userManger UserManager) AddUser(model *user.Model) {
	context.Db.Table("users").Create(&model)
}

func (userManger UserManager) GetUser(model *LoginModel) (*user.Model, error) {
	result := &user.Model{}
	context.Db.Table("users").Where("username = ?", model.Username).Take(result) //TODO

	if !result.CheckPassword(model.Password) {
		return nil, nil
	}
	return result, nil
}
