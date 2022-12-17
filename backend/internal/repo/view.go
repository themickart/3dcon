package repo

import (
	"api/internal/domain/interaction"
	"api/internal/domain/product"
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

func (vm *ViewManager) View(view *interaction.View) error {
	return vm.db.Transaction(func(tx *gorm.DB) error {
		viewed, err := vm.Viewed(view)
		if err != nil {
			return err
		}
		if viewed {
			return errors.New("уже просмотренно")
		}
		if err = tx.Create(view).Error; err != nil {
			return err
		}
		err = tx.Model(product.Product{}).
			Where("id = ?", view.ProductId).
			Update("views_count", gorm.Expr("views_count + 1")).Error
		if err != nil {
			tx.Rollback()
			return err
		}
		return nil
	})
}

func (vm *ViewManager) Viewed(view *interaction.View) (bool, error) {
	var count int64
	err := vm.db.Model(view).Where(view).Count(&count).Error //TODO
	if err != nil {
		return false, err
	}
	return count == 1, nil
}

func (vm *ViewManager) ViewedByIds(userId, productId uint) (bool, error) {
	view := interaction.NewView(userId, productId)
	return vm.Viewed(view)
}
