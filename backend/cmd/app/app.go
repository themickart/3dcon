package app

import (
	"api/cmd/app/server"
	"api/internal/controller/account"
	"api/internal/controller/auth"
	"api/internal/controller/default"
	"api/internal/controller/filestorage"
	"api/internal/controller/interactions"
	"api/internal/controller/products"
	"api/internal/database"
	"go.uber.org/fx"
)

func Run() {
	app := fx.New(
		fx.Provide(
			server.Run,
			database.NewDatabase,
		),
		fx.Invoke(
			auth.Route,
			account.Route,
			products.Route,
			filestorage.Route,
			_default.Route,
			interactions.Route,
		),
	)
	app.Run()
}
