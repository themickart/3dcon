package _default

import (
	"api/internal"
	"api/internal/domain/appError"
	"api/internal/utils"
	"github.com/gin-gonic/gin"
	"net/http"
	"os"
)

type Handler struct {
	fileUtils *utils.FileUtils
}

func NewHandler() *Handler {
	return &Handler{
		fileUtils: utils.NewFile(),
	}
}

func (h *Handler) Avatar(c *gin.Context) *appError.AppError {
	file, _ := os.Open(internal.DefaultAvatar)
	if err := h.fileUtils.Write(c.Writer, file); err != nil {
		return appError.New(err, err.Error(), http.StatusInternalServerError)
	}
	c.Status(http.StatusOK)
	return nil
}
