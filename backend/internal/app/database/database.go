package database

import (
	"api/internal/domain/interactions"
	"api/internal/domain/product"
	"api/internal/domain/user"
	"fmt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"os"
	"time"
)

func NewDatabase() *gorm.DB {
	connectionString := "host=%s port=5432 dbname=golang user=user password=password sslmode=disable"
	postgresHost := os.Getenv("POSTGRES_HOST")
	if postgresHost == "" {
		postgresHost = "localhost" //TODO:
	}
	connectionString = fmt.Sprintf(connectionString, postgresHost)
	fmt.Println(connectionString)
	db, err := gorm.Open(postgres.Open(connectionString), &gorm.Config{})
	for err != nil {
		db, err = gorm.Open(postgres.Open(connectionString), &gorm.Config{})
		fmt.Println(err)
		time.Sleep(time.Second * 4) //TODO
	}
	err = db.AutoMigrate(&user.User{}, &product.Product{}, &interactions.View{}, &interactions.Like{})
	if err != nil {
		panic(err)
	}
	return db
}