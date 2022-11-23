package product

import (
	"api/internal/domain/user"
	"gorm.io/gorm"
	"time"
)

type Product struct {
	gorm.Model
	Name        string
	AuthorId    uint
	Author      user.User
	CoverUrl    string
	Price       float64
	LikesCount  uint
	ViewsCount  uint
	Description string
	Licence     string //TODO
}

func New(name, coverUrl, description, licence string, authorId uint, price float64) *Product {
	return &Product{
		Name:        name,
		CoverUrl:    coverUrl,
		AuthorId:    authorId,
		Description: description,
		Price:       price,
		Licence:     licence,
	}
}

type ModelDto struct {
	Id          uint              `json:"id"`
	CreatedAt   time.Time         `json:"createdAt"`
	Name        string            `json:"name"`
	Author      user.ModelDto     `json:"author"`
	CoverUrl    string            `json:"coverUrl"`
	Price       float64           `json:"price"`
	LikesCount  uint              `json:"likesCount"`
	IsLiked     bool              `json:"isLiked"`
	ViewsCount  uint              `json:"viewsCount"`
	IsViewed    bool              `json:"isViewed"`
	Description string            `json:"description"`
	Licence     string            `json:"licence"`
	Gallery     []string          `json:"gallery"`
	Tags        []string          `json:"tags"`
	Info        map[string]string `json:"info"`
}

func NewDto(model *Product) *ModelDto {
	return &ModelDto{
		Id:          model.ID,
		Name:        model.Name,
		CoverUrl:    model.CoverUrl,
		Author:      *user.NewDto(&model.Author),
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

func NewViewedAndLikedDtoFromDto(dto ModelDto, isViewed, isLiked bool) *ModelDto {
	dto.IsViewed = isViewed
	dto.IsLiked = isLiked
	return &dto
}
