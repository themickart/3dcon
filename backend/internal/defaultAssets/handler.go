package defaultAssets

import (
	"api/internal"
	"github.com/gin-gonic/gin"
	"io"
	"net/http"
	"os"
)

type Handler struct {
}

func NewHandler() *Handler {
	return &Handler{}
}

func (h *Handler) Avatar(c *gin.Context) {
	file, _ := os.Open(internal.DefaultAvatar)
	data := make([]byte, 1024)
	for {
		n, err := file.Read(data)
		if err == io.EOF { //TODO
			break
		}
		_, _ = c.Writer.Write(data[:n])
	}
	c.Status(http.StatusOK)
}
