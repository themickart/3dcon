package filestorage

import (
	"api/internal/controller"
	"api/internal/util"
	"github.com/gin-gonic/gin"
	"net/http"
)

type handler struct {
	fileStorage *util.FileStorage
	fileUtils   *util.FileUtils
}

func newHandler() *handler {
	return &handler{
		fileStorage: util.NewFileStorage(),
		fileUtils:   util.NewFile(),
	}
}

// get
// @Tags filestorage
// @Accept json
// @Produce json
// @Param bucket path string true "bucket"
// @Param filename path string true "filename"
// @Success 200 {string} string
// @Failure 400 {string} error
// @Router /filestorage/{bucket}/{filename} [get]
func (h *handler) get(c *gin.Context) *controller.Error {
	filename := c.Param("filename")
	bucket := c.Param("bucket")
	file, err := h.fileStorage.Get(bucket, filename)
	if err != nil {
		return controller.NewError(err, err.Error(), http.StatusBadRequest)
	}
	err = h.fileUtils.Write(c.Writer, file)
	if err != nil {
		return controller.NewError(err, err.Error(), http.StatusBadRequest)
	}
	c.Status(http.StatusOK)
	return nil
}
