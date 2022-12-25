package repo

import (
	"api/internal/domain/review"
	"gorm.io/gorm"
)

type UserReviewManager struct {
	db *gorm.DB
}

func NewUserReviewManager(db *gorm.DB) *UserReviewManager {
	return &UserReviewManager{
		db: db,
	}
}

func (urm *UserReviewManager) Create(reviewUser *review.UserReview) error {
	return urm.db.Create(reviewUser).Error
}

func (urm *UserReviewManager) Get(limit, offset uint, authorId, ratedId string) ([]*review.UserReview, error) {
	reviews := make([]*review.UserReview, 0)
	db := urm.db.Preload("Author").Preload("Rated").Limit(int(limit)).Offset(int(offset))
	if authorId != "" {
		db = db.Where("author_id = ?", authorId)
	}
	if ratedId != "" {
		db = db.Where("rated_id = ?", ratedId)
	}
	if err := db.Find(&reviews).Error; err != nil {
		return nil, err
	}
	return reviews, nil
}
