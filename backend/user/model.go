package user

import (
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type Model struct {
	gorm.Model
	Username     string
	Email        string
	PasswordHash []byte
	Role         Role
}

type ModelDto struct {
	Username string
	Email    string
	Role     Role
}

func HashPassword(password string) []byte {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		panic(err)
	}
	return hash
}

func (model Model) CheckPassword(password string) bool {
	return bcrypt.CompareHashAndPassword(model.PasswordHash, []byte(password)) == nil
}

func New(username, email, password string, role Role) *Model {
	return &Model{
		Username: username, Email: email,
		PasswordHash: HashPassword(password), Role: role,
	}
}
