package services

import (
	"api/internal/domain/product"
	"errors"
	"gorm.io/gorm"
)

type ProductManager struct {
	db          *gorm.DB
	likeManager *LikeManager
}

func NewProductManager(db *gorm.DB) *ProductManager {
	return &ProductManager{
		db:          db,
		likeManager: NewLikeManager(db),
	}
}

func (pm *ProductManager) CreateProduct(model *product.Product) error {
	return pm.db.Create(model).Error
}

func (pm *ProductManager) GetProductById(id uint) (*product.Product, error) {
	result := &product.Product{}
	err := pm.db.Model(product.Product{}).Where("id = ?", id).First(result).Error
	if err = pm.handleError(err); err != nil {
		return nil, err
	}
	return result, nil
}

func (pm *ProductManager) GetAllProductsByOwnerId(id uint) ([]*product.Product, error) {
	products := make([]*product.Product, 0)
	err := pm.db.Model(product.Product{}).Where("owner_id = ?", id).Find(&products).Error
	if err = pm.handleError(err); err != nil {
		return nil, err
	}
	return products, nil
}

func (pm *ProductManager) handleError(err error) error {
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return errors.New("не найдено")
	}
	return err
}

func (pm *ProductManager) GetProducts(count int, offset int) ([]*product.Product, error) {
	products := make([]*product.Product, 0)
	err := pm.db.Model(product.Product{}).Offset(offset).Limit(count).Find(&products).Error
	if err != nil {
		return nil, err
	}
	return products, nil
}
