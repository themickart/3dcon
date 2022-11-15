package services

import (
	"api/internal/domain/interactions"
	"gorm.io/gorm"
)

type ViewManager struct {
	db *gorm.DB
}

func NewViewManager(db *gorm.DB) *ViewManager {
	return &ViewManager{
		db: db,
	}
}

func (vm *ViewManager) Create(view *interactions.View) error {
	panic("")
}

func (vm *ViewManager) Viewed(userId, productId uint) (bool, error) {
	panic("")
}
