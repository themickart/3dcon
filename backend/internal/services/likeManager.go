package services

import (
	"api/internal/domain/interactions"
	"gorm.io/gorm"
)

type LikeManager struct {
	db *gorm.DB
}

func NewLikeManager(db *gorm.DB) *LikeManager {
	return &LikeManager{
		db: db,
	}
}

func (lm *LikeManager) Create(like *interactions.Like) error {
	panic("")
}

func (lm *LikeManager) Delete(like *interactions.Like) error {
	panic("")
}

func (lm *LikeManager) Liked(userId, productId uint) (bool, error) {
	panic("")
}
