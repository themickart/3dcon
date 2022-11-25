package product

import (
	"api/internal/domain/user"
	"gorm.io/gorm"
)

type Product struct {
	gorm.Model
	Name        string
	AuthorId    uint
	Category    string //TODO
	Author      user.User
	CoverUrl    string
	Price       float64
	LikesCount  uint
	ViewsCount  uint
	Description string
	Licence     string //TODO
}

func New(name, coverUrl, description, licence, category string, authorId uint, price float64) *Product {
	return &Product{
		Category:    category,
		Name:        name,
		CoverUrl:    coverUrl,
		AuthorId:    authorId,
		Description: description,
		Price:       price,
		Licence:     licence,
	}
}

func Update(product Product, info *UpdateInfo) *Product {
	product.Name = info.Name
	product.Price = info.Price
	product.Category = info.Category
	return &product
}
