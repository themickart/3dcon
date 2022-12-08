package repo

import (
	"api/internal/domain/interactions"
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

func (lm *LikeManager) Create(like *interactions.Like) error {
	liked, err := lm.Liked(like)
	if err != nil {
		return err
	}
	if liked {
		return errors.New("уже лайкнуто")
	}
	return lm.db.Create(like).Error
}

func (lm *LikeManager) Delete(like *interactions.Like) error {
	var count int64
	err := lm.db.Model(like).Where(like).Count(&count).Delete(like).Error
	if count == 0 {
		return errors.New("такого лайка нет")
	}
	return err
}

func (lm *LikeManager) Liked(like *interactions.Like) (bool, error) {
	var count int64
	err := lm.db.Model(like).Where(like).Count(&count).Error //TODO
	if err != nil {
		return false, err
	}
	return count == 1, nil
}

func (lm *LikeManager) LikedByIds(userId, productId uint) (bool, error) {
	like := interactions.NewLike(userId, productId)
	return lm.Liked(like)
}
