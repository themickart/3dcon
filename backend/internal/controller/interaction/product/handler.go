package product

import (
	"api/internal/controller"
	"api/internal/domain/interaction"
	"api/internal/repo"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"net/http"
	"strconv"
)

type handler struct {
	userManager *repo.UserManager
	likeManager *repo.LikeManager
	viewManager *repo.ViewManager
}

func newHandler(db *gorm.DB) *handler {
	return &handler{
		likeManager: repo.NewLikeManager(db),
		userManager: repo.NewUserManger(db),
		viewManager: repo.NewViewManager(db),
	}
}

// like
// @Tags interaction
// @Security ApiKeyAuth
// @Accept json
// @Produce json
// @Param id path int true "id"
// @Success 201 {string} created
// @Failure 400 {string} error
// @Router /products/like/{id} [patch]
func (h *handler) like(c *gin.Context) *controller.Error {
	id := c.Param("id")
	productId, err := strconv.ParseUint(id, 10, 8)
	if err != nil {
		return controller.NewError(err, err.Error(), http.StatusBadRequest)
	}
	userModel, err := h.userManager.Extract(c)
	if err != nil {
		return controller.NewError(err, err.Error(), http.StatusBadRequest)
	}
	like := interaction.NewLike(userModel.ID, uint(productId))
	if err = h.likeManager.Like(like); err != nil {
		return controller.NewError(err, err.Error(), http.StatusBadRequest)
	}
	c.Status(http.StatusCreated)
	return nil
}

// deleteLike
// @Tags interaction
// @Security ApiKeyAuth
// @Accept json
// @Produce json
// @Param id path int true "id"
// @Success 200 {string} ok
// @Failure 400 {string} error
// @Router /products/like/{id} [delete]
func (h *handler) deleteLike(c *gin.Context) *controller.Error {
	id := c.Param("id")
	productId, err := strconv.ParseUint(id, 10, 8)
	if err != nil {
		return controller.NewError(err, err.Error(), http.StatusBadRequest)
	}
	userModel, err := h.userManager.Extract(c)
	if err != nil {
		return controller.NewError(err, err.Error(), http.StatusBadRequest)
	}
	like := interaction.NewLike(userModel.ID, uint(productId))
	if err = h.likeManager.RemoveLike(like); err != nil {
		return controller.NewError(err, err.Error(), http.StatusBadRequest)
	}
	c.Status(http.StatusOK)
	return nil
}

// view
// @Tags interaction
// @Security ApiKeyAuth
// @Accept json
// @Produce json
// @Param id path int true "id"
// @Success 201 {string} ok
// @Failure 400 {string} error
// @Router /products/view/{id} [patch]
func (h *handler) view(c *gin.Context) *controller.Error {
	id := c.Param("id")
	productId, err := strconv.ParseUint(id, 10, 8)
	if err != nil {
		return controller.NewError(err, err.Error(), http.StatusBadRequest)
	}
	userModel, err := h.userManager.Extract(c)
	if err != nil {
		return controller.NewError(err, err.Error(), http.StatusBadRequest)
	}
	view := interaction.NewView(userModel.ID, uint(productId))
	if err = h.viewManager.View(view); err != nil {
		return controller.NewError(err, err.Error(), http.StatusBadRequest)
	}
	c.Status(http.StatusCreated)
	return nil
}
