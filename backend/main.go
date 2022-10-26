package main

import (
	"backend/auth"
	_ "backend/docs"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	swagger "github.com/swaggo/gin-swagger"
	"net/http"
)

// Helloworld
// @Tags helloworld
// @Accept json
// @Produce json
// @Success 200 {string} Helloworld
// @Router /helloworld [get]
func Helloworld(g *gin.Context) {
	g.JSON(http.StatusOK, "helloworld")
}

// @title 3Dcon
// @basePath /
// @host localhost:8080
// @securityDefinitions.apikey ApiKeyAuth
// @in header
// @name Authorization
func main() {
	router := gin.Default()
	router.Use(cors.Default())
	router.GET("/helloworld", Helloworld)
	authorization := router.Group("auth")
	{
		authorization.POST("/join", auth.HandleJoin)
		authorization.POST("/login", auth.HandleLogin)
	}
	router.GET("/swagger/*any", swagger.WrapHandler(swaggerFiles.Handler))
	if err := router.Run(":8080"); err != nil {
		panic(err)
	}
}
