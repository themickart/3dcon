package defaultAssets

import (
	"api/internal"
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

func (h *Handler) Avatar(c *gin.Context) {
	file, _ := os.Open(internal.DefaultAvatar)
	if err := h.fileUtils.WriteFile(c.Writer, file); err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
	}
	c.Status(http.StatusOK)
}
