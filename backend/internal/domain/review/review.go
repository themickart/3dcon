package review

import (
	"api/internal/domain/user"
	"gorm.io/gorm"
)

type Review struct {
	gorm.Model
	AuthorId uint
	Author   *user.User
	Text     string
}

type Dto struct {
	Author *user.User
	Text   string
}

func NewReview(authorId uint, text string) *Review {
	return &Review{AuthorId: authorId, Text: text}
}

func NewDto(author *user.User, text string) *Dto {
	return &Dto{Author: author, Text: text}
}
