package context

import (
	"backend/user"
	"database/sql"
	"fmt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"os"
	"time"
)

var JwtPrivateKey []byte
var Db *gorm.DB

func init() {
	initDb()
	JwtPrivateKey = []byte("TIMEWINDOWSAMD64CONFIG.GO")
}

func initDb() {
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
	if err = db.Table("users").AutoMigrate(&user.Model{}); err != nil {
		panic(err)
	}
	fmt.Println("init in db")
	Db = db
}

func Connection() (*sql.DB, error) {
	db, err := Db.DB()
	if err != nil {
		return nil, err
	}
	return db, err
}
