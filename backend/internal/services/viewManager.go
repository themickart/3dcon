package services

import (
	"api/internal/domain/interactions"
	"errors"
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
	viewed, err := vm.Viewed(view)
	if err != nil {
		return err
	}
	if viewed {
		return errors.New("уже просмотрено")
	}
	return vm.db.Create(view).Error
}

func (vm *ViewManager) Viewed(view *interactions.View) (bool, error) {
	var count int64
	err := vm.db.Model(view).Where(view).Count(&count).Error //TODO
	if err != nil {
		return false, err
	}
	return count == 1, nil
}
