package controller

import (
	"api/internal/controller/appError"
	"github.com/gin-gonic/gin"
)

type AppHandler func(c *gin.Context) *appError.AppError

func (fn AppHandler) ServeHTTP(c *gin.Context) {
	if e := fn(c); e != nil {
		c.JSON(e.Code, e.Message)
	}
}
