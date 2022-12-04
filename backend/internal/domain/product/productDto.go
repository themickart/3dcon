package product

import (
	"api/internal/domain/user"
	"time"
)

type Dto struct {
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
	Category    string            `json:"category"` //TODO
}

func NewDto(model *Product) *Dto {
	return &Dto{
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
		Category: model.Category,
	}
}

func NewViewedAndLikedDtoFromDto(dto Dto, isViewed, isLiked bool) *Dto {
	dto.IsViewed = isViewed
	dto.IsLiked = isLiked
	return &dto
}
