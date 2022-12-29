package repo

import (
	"api/internal/domain/product"
	"errors"
	"gorm.io/gorm"
)

type ProductManager struct {
	db          *gorm.DB
	UserManager *UserManager
}

func NewProductManager(db *gorm.DB) *ProductManager {
	return &ProductManager{
		db:          db,
		UserManager: NewUserManger(db),
	}
}

func (pm *ProductManager) Create(model *product.Product) error {
	return pm.db.Create(model).Error
}

func (pm *ProductManager) GetById(id uint64) (*product.Product, error) {
	result := &product.Product{}
	err := pm.db.Preload("Author").Where("id = ?", id).First(result).Error
	if err = pm.handleError(err); err != nil {
		return nil, err
	}
	return result, nil
}

func (pm *ProductManager) GetAllByUserId(id uint) ([]*product.Product, error) {
	products := make([]*product.Product, 0)
	err := pm.db.Preload("Author").Where("author_id = ?", id).Find(&products).Error
	if err = pm.handleError(err); err != nil {
		return nil, err
	}
	return products, nil
}

func (pm *ProductManager) Get(limit, offset int, orderBy, category string, author string, isDesc bool) ([]*product.Product, error) {
	products := make([]*product.Product, 0)
	db := pm.db.Preload("Author")
	if orderBy != "" {
		desc := ""
		if isDesc {
			desc = "desc"
		}
		db = db.Order(orderBy + " " + desc)
	}
	if category != "" {
		db = db.Where("category = ?", category)
	}
	if author != "" {
		user, err := pm.UserManager.GetByUsername(author)
		if err == nil {
			db = db.Where("author_id = ?", user.ID)
		}
	}
	err := db.Offset(offset).Limit(limit).Find(&products).Error
	if err != nil {
		return nil, err
	}
	return products, nil
}

func (pm *ProductManager) Update(updaterId uint, updateIndo *product.UpdateInfo) error {
	products, err := pm.GetAllByUserId(updaterId)
	if err != nil {
		return err
	}
	var productToUpdate *product.Product
	for _, productModel := range products {
		if productModel.ID == updateIndo.ProductId {
			productToUpdate = productModel
			break
		}
	}
	if productToUpdate == nil {
		return errors.New("продукт может менять лишь его владелец")
	}
	updatedProduct := product.Update(*productToUpdate, updateIndo)
	return pm.db.Save(updatedProduct).Error
}

func (pm *ProductManager) Delete(model *product.Product) error {
	err := pm.db.Unscoped().Delete(model).Error
	if err = pm.handleError(err); err != nil {
		return err
	}
	return nil
}

func (pm *ProductManager) handleError(err error) error {
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return errors.New("не найдено")
	}
	return err
}
