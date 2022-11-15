package interactions

import "gorm.io/gorm"

type View struct {
	gorm.Model
	UserId    uint
	ProductId uint
}

func NewView(userId, productId uint) *View {
	return &View{
		UserId:    userId,
		ProductId: productId,
	}
}
