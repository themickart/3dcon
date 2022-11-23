package app

import (
	"api/cmd/app/server"
	"api/internal/account"
	"api/internal/auth"
	"api/internal/database"
	"api/internal/defaultAssets"
	"api/internal/filestorage"
	"api/internal/interactions"
	"api/internal/products"
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
			defaultAssets.Route,
			interactions.Route,
		),
	)
	app.Run()
}
