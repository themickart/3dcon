package filestorage

import (
	"api/internal/domain/appError"
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

// Get
// @Tags filestorage
// @Accept json
// @Produce json
// @Param bucket path string true "bucket"
// @Param filename path string true "filename"
// @Success 200 {string} string
// @Failure 400 {string} error
// @Router /filestorage/{bucket}/{filename} [get]
func (h *Handler) Get(c *gin.Context) *appError.AppError {
	filename := c.Param("filename")
	bucket := c.Param("bucket")
	file, err := h.fileStorage.Get(bucket, filename)
	if err != nil {
		return appError.New(err, err.Error(), http.StatusBadRequest)
	}
	err = h.fileUtils.Write(c.Writer, file)
	if err != nil {
		return appError.New(err, err.Error(), http.StatusBadRequest)
	}
	c.Status(http.StatusOK)
	return nil
}
