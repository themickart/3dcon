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

func (userManger *UserManager) Create(model *user.User) error {
	_, err := userManger.GetByUsername(model.Username) //TODO
	if err == nil {
		return errors.New("такой пользователь уже существует")
	}
	return userManger.db.Table("users").Create(&model).Error
}

func (userManger *UserManager) GetByUsername(username string) (*user.User, error) {
	result := &user.User{}
	err := userManger.db.Where("username = ?", username).First(result).Error
	if err = userManger.handleError(err); err != nil {
		return nil, err
	}
	return result, nil
}

func (userManger *UserManager) GetById(id uint) (*user.User, error) {
	result := &user.User{}
	err := userManger.db.Where("id = ?", id).First(result).Error
	if err = userManger.handleError(err); err != nil {
		return nil, err
	}
	return result, err
}

func (userManger *UserManager) Delete(user *user.User) error {
	err := userManger.db.Unscoped().Delete(user).Error
	if err = userManger.handleError(err); err != nil {
		return err
	}
	return nil
}

func (userManger *UserManager) Extract(g *gin.Context) (*user.User, error) {
	claims, err := userManger.jwtUtils.ExtractClaims(g)
	if err != nil {
		return nil, err
	}
	username := claims[user.Username].(string)
	userModel, err := userManger.GetByUsername(username)
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
