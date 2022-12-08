package app

import (
	"api/internal/app/database"
	"api/internal/app/server"
	"api/internal/controller/account"
	"api/internal/controller/auth"
	_default "api/internal/controller/default"
	"api/internal/controller/filestorage"
	"api/internal/controller/interactions"
	"api/internal/controller/products"
	"go.uber.org/fx"
)

// Run
// @title 3Dcon
// @basePath /
// @host localhost:8080
// @securityDefinitions.apikey ApiKeyAuth
// @in header
// @name Authorization
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
