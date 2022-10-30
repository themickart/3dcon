package services

import (
	"api/internal/domain/user"
	"errors"
	"gorm.io/gorm"
)

type UserManager struct {
	db *gorm.DB
}

func NewUserManger(db *gorm.DB) *UserManager {
	return &UserManager{
		db: db,
	}
}

func (userManger *UserManager) AddUser(model *user.Model) error {
	_, err := userManger.GetUserByUsername(model.Username)
	if err == nil {
		return errors.New("такой пользователь уже существует")
	}
	userManger.db.Table("users").Create(&model)
	return nil
}

func (userManger *UserManager) GetUserByUsername(username string) (*user.Model, error) {
	result := &user.Model{}
	err := userManger.db.Table("users").Where("username = ?", username).First(result).Error
	if err == nil {
		return result, nil
	}
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, errors.New("пользователь не найден")
	}
	return nil, err
}
