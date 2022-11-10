package product

import (
	"api/internal/domain/user"
	"gorm.io/gorm"
	"time"
)

type Product struct {
	gorm.Model
	Name        string
	OwnerId     uint //TODO
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
	CreatedAt   time.Time         `json:"createdAt"`
	Name        string            `json:"name"`
	Author      user.ModelDto     `json:"author"`
	CoverUrl    string            `json:"coverUrl"`
	Price       float64           `json:"price"`
	LikesCount  uint              `json:"likesCount"`
	ViewsCount  uint              `json:"viewsCount"`
	Description string            `json:"description"`
	Licence     string            `json:"licence"`
	Gallery     []string          `json:"gallery"`
	Tags        []string          `json:"tags"`
	Info        map[string]string `json:"info"`
}

func NewDto(model *Product, author *user.ModelDto) *ModelDto {
	return &ModelDto{
		Name:        model.Name,
		CoverUrl:    model.CoverUrl,
		Author:      *author,
		CreatedAt:   model.CreatedAt,
		Description: model.Description,
		LikesCount:  model.LikesCount,
		ViewsCount:  model.ViewsCount,
		Licence:     model.Licence,
		Price:       model.Price,
		Gallery:     []string{model.CoverUrl},
		Tags:        []string{"тег продукта"},
		Info: map[string]string{
			"Тип":      "неизвестно",
			"Полигоны": "неизвестно",
			"Точки":    "неизвестно",
			"Текстура": "неизвестно",
		},
	}
}
