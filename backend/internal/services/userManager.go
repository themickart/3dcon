package services

import (
	"api/internal/user"
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

func (userManger *UserManager) AddUser(model *user.Model) {
	userManger.db.Table("users").Create(&model)
}

func (userManger *UserManager) GetUserByUsername(username, password string) (*user.Model, error) {
	result := &user.Model{}
	userManger.db.Table("users").Where("username = ?", username).Take(result) //TODO

	if !result.CheckPassword(password) {
		return nil, errors.New("") //TODO
	}
	return result, nil
}
