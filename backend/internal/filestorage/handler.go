package filestorage

import (
	"api/internal/services"
	"github.com/gin-gonic/gin"
	"net/http"
)

type Handler struct {
	fileStorage *services.FileStorage
	fileUtils   *services.FileUtils
}

func NewHandler(fileStorage *services.FileStorage) *Handler {
	return &Handler{
		fileStorage: fileStorage,
		fileUtils:   services.NewFileUtils(),
	}
}

// GetFile
// @Tags filestorage
// @Accept json
// @Produce json
// @Param id path string true "id"
// @Success 200 {string} string
// @Failure 400 {string} error
// @Router /filestorage/{id} [get]
func (h *Handler) GetFile(c *gin.Context) {
	filename := c.Param("filename")
	bucket := c.Param("bucket")
	file, err := h.fileStorage.Get(bucket, filename)
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}
	err = h.fileUtils.WriteFile(c.Writer, file)
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}
	c.Status(http.StatusOK)
}
