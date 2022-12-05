package appHandler

import (
	"api/internal/domain/appError"
	"github.com/gin-gonic/gin"
)

type AppHandler func(c *gin.Context) *appError.AppError

func New(f func(c *gin.Context) *appError.AppError) AppHandler {
	return f
}

func (fn AppHandler) HTTP(c *gin.Context) {
	if e := fn(c); e != nil {
		c.JSON(e.Code, e.Message)
	}
}
