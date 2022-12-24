package account

import (
	"api/internal/domain/appError"
	"api/internal/domain/user"
	"api/internal/repo"
	"api/internal/util"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"net/http"
)

type Handler struct {
	jwtUtils    *util.JwtUtils
	userManager *repo.UserManager
	uploader    *util.Uploader
}

func NewHandler(db *gorm.DB) *Handler {
	return &Handler{
		jwtUtils:    util.NewJwt(),
		userManager: repo.NewUserManger(db),
		uploader:    util.NewUploader(),
	}
}

// Me
// @Tags account
// @Security ApiKeyAuth
// @Accept json
// @Produce json
// @Success 200 {object} user.Dto
// @Router /account/me [get]
func (h *Handler) Me(c *gin.Context) *appError.AppError {
	userModel, err := h.userManager.Extract(c)
	if err != nil {
		return appError.New(err, err.Error(), http.StatusInternalServerError)
	}
	userDto := user.NewDto(userModel)
	c.JSON(http.StatusOK, userDto)
	return nil
}

// Delete
// @Tags account
// @Security ApiKeyAuth
// @Accept json
// @Produce json
// @Success 200 {object} user.Dto
// @Router /account/delete [delete]
func (h *Handler) Delete(c *gin.Context) *appError.AppError {
	claims, _ := h.jwtUtils.ExtractClaims(c)
	userModel, err := h.userManager.GetByUsername(claims[user.Username].(string))
	if err != nil {
		return appError.New(err, err.Error(), http.StatusInternalServerError)
	}
	err = h.userManager.Delete(userModel)
	if err != nil {
		return appError.New(err, err.Error(), http.StatusBadRequest)
	}
	c.Status(http.StatusOK)
	return nil
}

// UpdateAvatar
// @Tags account
// @Security ApiKeyAuth
// @Accept       multipart/form-data
// @Produce      json
// @Param        avatar formData  file          true  "новый аватар"
// @Success      200   {string}  string        "ok"
// @Router       /account/avatar [put]
func (h *Handler) UpdateAvatar(c *gin.Context) *appError.AppError {
	userModel, err := h.userManager.Extract(c)
	if err != nil {
		return appError.New(err, err.Error(), http.StatusBadRequest)
	}
	file, fileHeader, err := c.Request.FormFile("avatar")
	if err != nil {
		return appError.New(err, err.Error(), http.StatusBadRequest)
	}
	url, _, err := h.uploader.UploadFile(file, fileHeader)
	if err != nil {
		return appError.New(err, err.Error(), http.StatusBadRequest)
	}
	err = h.userManager.UpdateAvatar(url, userModel)
	if err != nil {
		return appError.New(err, err.Error(), http.StatusBadRequest)
	}
	c.Status(http.StatusOK)
	return nil
}
