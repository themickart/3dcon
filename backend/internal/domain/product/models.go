package product

import (
	"api/internal/domain/user"
	"gorm.io/gorm"
	"time"
)

type Product struct {
	gorm.Model
	Name        string
	OwnerId     uint
	CoverUrl    string
	Price       float64
	LikesCount  uint
	ViewsCount  uint
	Description string
	Licence     string //TODO
}

func New(name, coverUrl, description, licence string, ownerId uint, price float64) *Product {
	return &Product{
		Name:        name,
		CoverUrl:    coverUrl,
		OwnerId:     ownerId,
		Description: description,
		Price:       price,
		Licence:     licence,
	}
}

type ModelDto struct {
	CreatedAt   time.Time     `json:"created_at"`
	Name        string        `json:"name"`
	Owner       user.ModelDto `json:"owner"`
	CoverUrl    string        `json:"cover_url"`
	Price       float64       `json:"price"`
	LikesCount  uint          `json:"likes_count"`
	ViewsCount  uint          `json:"views_count"`
	Description string        `json:"description"`
	Licence     string        `json:"licence"`
}

func NewDto(model *Product, owner *user.ModelDto) *ModelDto {
	return &ModelDto{
		Name:        model.Name,
		CoverUrl:    model.CoverUrl,
		Owner:       *owner,
		CreatedAt:   model.CreatedAt,
		Description: model.Description,
		LikesCount:  model.LikesCount,
		ViewsCount:  model.ViewsCount,
		Licence:     model.Licence,
		Price:       model.Price,
	}
}
