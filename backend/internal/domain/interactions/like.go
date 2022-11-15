package interactions

import "gorm.io/gorm"

type Like struct {
	gorm.Model
	UserId    uint
	ProductId uint
}

func NewLike(userId, productId uint) *Like {
	return &Like{
		UserId:    userId,
		ProductId: productId,
	}
}
