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

func (userManger *UserManager) AddUser(model *user.User) error {
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

func (userManger *UserManager) handleError(err error) error {
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return errors.New("пользователь не найден")
	}
	return err
}
