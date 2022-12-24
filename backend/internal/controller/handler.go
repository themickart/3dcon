package controller

import (
	"github.com/gin-gonic/gin"
)

type Handler func(c *gin.Context) *Error

func NewHandler(f func(c *gin.Context) *Error) Handler {
	return f
}

func (fn Handler) HTTP(c *gin.Context) {
	if e := fn(c); e != nil {
		c.JSON(e.Code, e.Message)
	}
}
