package interaction

import (
	"api/internal/domain/appError"
	"api/internal/domain/interaction"
	"api/internal/repo"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"net/http"
	"strconv"
)

type Handler struct {
	userManager *repo.UserManager
	likeManager *repo.LikeManager
	viewManager *repo.ViewManager
}

func NewHandler(db *gorm.DB) *Handler {
	return &Handler{
		likeManager: repo.NewLikeManager(db),
		userManager: repo.NewUserManger(db),
		viewManager: repo.NewViewManager(db),
	}
}

// Like
// @Tags interaction
// @Security ApiKeyAuth
// @Accept json
// @Produce json
// @Param id path int true "id"
// @Success 201 {string} created
// @Failure 400 {string} error
// @Router /products/like/{id} [patch]
func (h *Handler) Like(c *gin.Context) *appError.AppError {
	id := c.Param("id")
	productId, err := strconv.ParseUint(id, 10, 8)
	if err != nil {
		return appError.New(err, err.Error(), http.StatusBadRequest)
	}
	userModel, err := h.userManager.Extract(c)
	if err != nil {
		return appError.New(err, err.Error(), http.StatusBadRequest)
	}
	like := interaction.NewLike(userModel.ID, uint(productId))
	if err = h.likeManager.Like(like); err != nil {
		return appError.New(err, err.Error(), http.StatusBadRequest)
	}
	c.Status(http.StatusCreated)
	return nil
}

// RemoveLike
// @Tags interaction
// @Security ApiKeyAuth
// @Accept json
// @Produce json
// @Param id path int true "id"
// @Success 200 {string} ok
// @Failure 400 {string} error
// @Router /products/remove_like/{id} [patch]
func (h *Handler) RemoveLike(c *gin.Context) *appError.AppError {
	id := c.Param("id")
	productId, err := strconv.ParseUint(id, 10, 8)
	if err != nil {
		return appError.New(err, err.Error(), http.StatusBadRequest)
	}
	userModel, err := h.userManager.Extract(c)
	if err != nil {
		return appError.New(err, err.Error(), http.StatusBadRequest)
	}
	like := interaction.NewLike(userModel.ID, uint(productId))
	if err = h.likeManager.RemoveLike(like); err != nil {
		return appError.New(err, err.Error(), http.StatusBadRequest)
	}
	c.Status(http.StatusOK)
	return nil
}

// View
// @Tags interaction
// @Security ApiKeyAuth
// @Accept json
// @Produce json
// @Param id path int true "id"
// @Success 201 {string} ok
// @Failure 400 {string} error
// @Router /products/view/{id} [patch]
func (h *Handler) View(c *gin.Context) *appError.AppError {
	id := c.Param("id")
	productId, err := strconv.ParseUint(id, 10, 8)
	if err != nil {
		return appError.New(err, err.Error(), http.StatusBadRequest)
	}
	userModel, err := h.userManager.Extract(c)
	if err != nil {
		return appError.New(err, err.Error(), http.StatusBadRequest)
	}
	view := interaction.NewView(userModel.ID, uint(productId))
	if err = h.viewManager.View(view); err != nil {
		return appError.New(err, err.Error(), http.StatusBadRequest)
	}
	c.Status(http.StatusCreated)
	return nil
}
