package services

import (
	"api/internal/domain/user"
	"errors"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type UserManager struct {
	db       *gorm.DB
	jwtUtils *JwtUtils
}

func NewUserManger(db *gorm.DB) *UserManager {
	return &UserManager{
		db:       db,
		jwtUtils: NewJwtUtils(),
	}
}

func (userManger *UserManager) CreateUser(model *user.User) error {
	_, err := userManger.GetUserByUsername(model.Username) //TODO
	if err == nil {
		return errors.New("такой пользователь уже существует")
	}
	userManger.db.Table("users").Create(&model)
	return nil
}

func (userManger *UserManager) GetUserByUsername(username string) (*user.User, error) {
	result := &user.User{}
	err := userManger.db.Model(result).Where("username = ?", username).First(result).Error
	if err = userManger.handleError(err); err != nil {
		return nil, err
	}
	return result, nil
}

func (userManger *UserManager) GetUserById(id uint) (*user.User, error) {
	result := &user.User{}
	err := userManger.db.Model(result).Where("id = ?", id).First(result).Error
	if err = userManger.handleError(err); err != nil {
		return nil, err
	}
	return result, err
}

func (userManger *UserManager) ExtractUser(g *gin.Context) (*user.User, error) {
	claims, err := userManger.jwtUtils.ExtractClaims(g)
	if err != nil {
		return nil, err
	}
	username := claims[user.Username].(string)
	userModel, err := userManger.GetUserByUsername(username)
	if err != nil {
		return nil, err
	}
	return userModel, err
}

func (userManger *UserManager) handleError(err error) error {
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return errors.New("пользователь не найден")
	}
	return err
}
