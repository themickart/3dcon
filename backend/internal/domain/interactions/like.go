package interactions

import "gorm.io/gorm"

type Like struct {
	gorm.Model
	UserId    uint
	ProductId string
}

func NewLike(userId uint, productId string) *Like {
	return &Like{
		UserId:    userId,
		ProductId: productId,
	}
}
