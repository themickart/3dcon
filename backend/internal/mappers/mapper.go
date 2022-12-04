package mappers

import (
	"api/internal/domain/product"
	"api/internal/domain/user"
	"api/internal/services"
	"gorm.io/gorm"
)

type Product struct {
	likeManager *services.LikeManager
	viewManager *services.ViewManager
}

func NewProductMapper(db *gorm.DB) *Product {
	return &Product{
		likeManager: services.NewLikeManager(db),
		viewManager: services.NewViewManager(db),
	}
}

func (pm *Product) ModelsToDto(products []*product.Product, userModel *user.User) []*product.Dto {
	productsDto := make([]*product.Dto, len(products)) //TODO
	for i := range products {
		productsDto[i] = pm.ModelToDto(userModel, products[i])
	}
	return productsDto
}

func (pm *Product) ModelToDto(userModel *user.User, productModel *product.Product) *product.Dto {
	if userModel == nil {
		return product.NewDto(productModel)
	}
	productDto := product.NewDto(productModel)
	isLiked, err := pm.likeManager.LikedByIds(userModel.ID, productModel.ID)
	if err != nil {
		return productDto
	}
	isViewed, err := pm.viewManager.ViewedByIds(userModel.ID, productModel.ID)
	if err != nil {
		return productDto
	}
	productDto.IsLiked = isLiked
	productDto.IsViewed = isViewed
	return productDto
}
