package services

import (
	"api/internal/domain/product"
	"errors"
	"gorm.io/gorm"
)

type ProductManager struct {
	db *gorm.DB
}

func NewProductManager(db *gorm.DB) *ProductManager {
	return &ProductManager{
		db: db,
	}
}

func (productManager *ProductManager) AddProduct(model *product.Product) error {
	return productManager.db.Create(model).Error
}

func (productManager *ProductManager) GetProductById(id string) (*product.Product, error) {
	result := &product.Product{}
	err := productManager.db.Model(product.Product{}).Where("id = ?", id).First(result).Error
	if err = productManager.handleError(err); err != nil {
		return nil, err
	}
	return result, nil
}

func (productManager *ProductManager) GetAllProductsByOwnerId(id uint) ([]*product.Product, error) {
	products := make([]*product.Product, 0)
	err := productManager.db.Model(product.Product{}).Where("owner_id = ?", id).Find(&products).Error
	if err = productManager.handleError(err); err != nil {
		return nil, err
	}
	return products, nil
}

func (productManager *ProductManager) handleError(err error) error {
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return errors.New("не найдено")
	}
	return err
}
