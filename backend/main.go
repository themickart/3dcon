package main

import (
	_ "api/docs"
	"api/internal/account"
	"api/internal/auth"
	"api/internal/database"
	"api/internal/defaultAssets"
	"api/internal/filestorage"
	"api/internal/interactions"
	"api/internal/products"
	"fmt"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	swagger "github.com/swaggo/gin-swagger"
	"go.uber.org/fx"
	"golang.org/x/net/context"
	"net/http"
)

// Helloworld
// @Tags helloworld
// @Accept json
// @Produce json
// @Success 200 {string} Helloworld
// @Router /helloworld [get]
func helloworld(g *gin.Context) {
	g.JSON(http.StatusOK, "helloworld")
}

// @title 3Dcon
// @basePath /
// @host localhost:8080
// @securityDefinitions.apikey ApiKeyAuth
// @in header
// @name Authorization
func newServer(lc fx.Lifecycle) *gin.Engine {
	r := gin.New()
	r.Use(cors.Default())
	r.GET("/helloworld", helloworld)
	r.GET("/swagger/*any", swagger.WrapHandler(swaggerFiles.Handler))
	srv := &http.Server{
		Addr:    ":8080",
		Handler: r,
	}
	lc.Append(fx.Hook{
		OnStart: func(ctx context.Context) error {
			fmt.Println("Starting HTTP server at", srv.Addr)
			go func() {
				_ = srv.ListenAndServe()
			}()
			return nil
		},
		OnStop: func(ctx context.Context) error {
			return srv.Shutdown(ctx)
		},
	})
	return r
}

func main() {
	app := fx.New(
		fx.Provide(
			newServer,
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
