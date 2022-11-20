package services

import (
	"api/internal/domain/interactions"
	"gorm.io/gorm"
	"sync"
)

type InteractionManager struct {
	db              *gorm.DB
	likeManager     *LikeManager
	viewManager     *ViewManager
	productManager  *ProductManager
	likeMutex       sync.Mutex
	viewMutex       sync.Mutex
	removeLikeMutex sync.Mutex
}

func NewInteractionManager(db *gorm.DB) *InteractionManager {
	return &InteractionManager{
		db:             db,
		viewManager:    NewViewManager(db),
		productManager: NewProductManager(db),
		likeManager:    NewLikeManager(db),
	}
}

func (im *InteractionManager) RemoveLike(like *interactions.Like) error {
	if err := im.likeManager.Delete(like); err != nil {
		return err
	}
	im.removeLikeMutex.Lock()
	defer im.removeLikeMutex.Unlock()
	productModel, err := im.productManager.GetProductById(like.ProductId)
	if err != nil {
		return err
	}
	productModel.LikesCount--
	im.db.Save(productModel)
	return nil
}

func (im *InteractionManager) Like(like *interactions.Like) error {
	if err := im.likeManager.Create(like); err != nil {
		return err
	}
	im.likeMutex.Lock() //TODO
	defer im.likeMutex.Unlock()
	productModel, err := im.productManager.GetProductById(like.ProductId)
	if err != nil {
		return err
	}
	productModel.LikesCount++
	im.db.Save(productModel)
	return nil
}

func (im *InteractionManager) View(view *interactions.View) error {
	if err := im.viewManager.Create(view); err != nil {
		return err
	}
	im.viewMutex.Lock()
	defer im.viewMutex.Unlock()
	productModel, err := im.productManager.GetProductById(view.ProductId)
	if err != nil {
		return err
	}
	productModel.ViewsCount++
	im.db.Save(productModel)
	return nil
}
