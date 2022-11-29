package _default

import (
	"api/internal"
	"api/internal/controller/appError"
	"api/internal/services"
	"github.com/gin-gonic/gin"
	"net/http"
	"os"
)

type Handler struct {
	fileUtils *services.FileUtils
}

func NewHandler() *Handler {
	return &Handler{
		fileUtils: services.NewFileUtils(),
	}
}

func (h *Handler) Avatar(c *gin.Context) *appError.AppError {
	file, _ := os.Open(internal.DefaultAvatar)
	if err := h.fileUtils.WriteFile(c.Writer, file); err != nil {
		return appError.New(err, err.Error(), http.StatusInternalServerError)
	}
	c.Status(http.StatusOK)
	return nil
}
