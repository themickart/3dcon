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

func NewHandler() *Handler {
	return &Handler{
		fileStorage: services.NewFileStorage(),
		fileUtils:   services.NewFileUtils(),
	}
}

// GetFile
// @Tags filestorage
// @Accept json
// @Produce json
// @Param bucket path string true "bucket"
// @Param filename path string true "filename"
// @Success 200 {string} string
// @Failure 400 {string} error
// @Router /filestorage/{bucket}/{filename} [get]
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
