package app

import (
	"api/internal/domain/interaction"
	"api/internal/domain/product"
	"api/internal/domain/review"
	"api/internal/domain/user"
	"fmt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"os"
	"time"
)

func newDatabase() *gorm.DB {
	connectionString := "host=%s port=5432 dbname=3dcon user=user password=password sslmode=disable"
	postgresHost := os.Getenv("POSTGRES_HOST")
	if postgresHost == "" {
		postgresHost = "localhost" //TODO:
	}
	connectionString = fmt.Sprintf(connectionString, postgresHost)
	fmt.Println(connectionString)
	db, err := gorm.Open(postgres.Open(connectionString), &gorm.Config{})
	for err != nil {
		fmt.Println(err)
		time.Sleep(time.Second * 4) //TODO
		db, err = gorm.Open(postgres.Open(connectionString), &gorm.Config{})
	}
	err = db.AutoMigrate(&user.User{}, &product.Product{}, &interaction.View{}, &interaction.Like{}, &review.UserReview{})
	if err != nil {
		panic(err)
	}
	return db
}
