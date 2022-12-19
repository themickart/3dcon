package app

import (
	"api/internal/controller/account"
	"api/internal/controller/auth"
	"api/internal/controller/filestorage"
	"api/internal/controller/interaction"
	"api/internal/controller/product"
	"api/internal/controller/user"
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
			newServer,
			newDatabase,
		),
		fx.Invoke(
			auth.Route,
			account.Route,
			product.Route,
			filestorage.Route,
			interaction.Route,
			user.Route,
		),
	)
	app.Run()
}
