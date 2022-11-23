package main

import (
	"api/cmd/app"
)

// @title 3Dcon
// @basePath /
// @host localhost:8080
// @securityDefinitions.apikey ApiKeyAuth
// @in header
// @name Authorization
func main() {
	app.Run()
}
