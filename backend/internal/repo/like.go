package repo

import (
	"api/internal/domain/interaction"
	"api/internal/domain/product"
	"errors"
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

func (lm *LikeManager) Like(like *interaction.Like) error {
	return lm.db.Transaction(func(tx *gorm.DB) error {
		liked, err := lm.Liked(like)
		if err != nil {
			return err
		}
		if liked {
			return errors.New("уже лайкнуто")
		}
		if err = tx.Create(like).Error; err != nil {
			return err
		}
		err = tx.Model(product.Product{}).
			Where("id = ?", like.ProductId).
			Update("likes_count", gorm.Expr("likes_count + 1")).Error
		if err != nil {
			tx.Rollback()
			return err
		}
		return nil
	})
}

func (lm *LikeManager) RemoveLike(like *interaction.Like) error {
	return lm.db.Transaction(func(tx *gorm.DB) error {
		err := tx.Where("user_id = ? and product_id = ?", like.UserId, like.ProductId).Delete(like).Error
		if err != nil {
			return err
		}
		err = tx.Model(product.Product{}).
			Where("id = ?", like.ProductId).
			Update("likes_count", gorm.Expr("likes_count - 1")).Error
		if err != nil {
			tx.Rollback()
			return err
		}
		return nil
	})
}

func (lm *LikeManager) Liked(like *interaction.Like) (bool, error) {
	var count int64
	err := lm.db.Model(like).Where(like).Count(&count).Error //TODO
	if err != nil {
		return false, err
	}
	return count == 1, nil
}

func (lm *LikeManager) LikedByIds(userId, productId uint) (bool, error) {
	like := interaction.NewLike(userId, productId)
	return lm.Liked(like)
}
