package user

import (
	"api/internal"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username     string `gorm:"unique;not null"`
	Email        string
	PasswordHash []byte
	Role         Role
	SalesCount   uint
	AvatarUrl    string
}

func New(username, email, password string, role Role) *User {
	return &User{
		Username:     username,
		Email:        email,
		PasswordHash: HashPassword(password),
		Role:         role,
		SalesCount:   0,
		AvatarUrl:    internal.DefaultAvatar,
	}
}

type Dto struct {
	Id         uint       `json:"id"`
	Username   string     `json:"name"`
	SalesCount uint       `json:"salesCount"`
	AvatarUrl  string     `json:"avatarUrl"`
	Reputation Reputation `json:"reputation"`
}

func HashPassword(password string) []byte {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		panic(err)
	}
	return hash
}

func (model User) CheckPassword(password string) bool {
	return bcrypt.CompareHashAndPassword(model.PasswordHash, []byte(password)) == nil
}

func NewDto(model *User) *Dto {
	return &Dto{
		Id:         model.ID,
		Reputation: *NewReputation(),
		Username:   model.Username,
		SalesCount: model.SalesCount,
		AvatarUrl:  model.AvatarUrl,
	}
}
