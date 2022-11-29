package interactions

import (
	"api/internal/controller/appError"
	"api/internal/domain/interactions"
	"api/internal/services"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"net/http"
	"strconv"
)

type Handler struct {
	userManager        *services.UserManager
	likeManager        *services.LikeManager
	interactionManager *services.InteractionManager
}

func NewHandler(db *gorm.DB) *Handler {
	return &Handler{
		likeManager:        services.NewLikeManager(db),
		userManager:        services.NewUserManger(db),
		interactionManager: services.NewInteractionManager(db),
	}
}

// Like
// @Tags interactions
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
	userModel, err := h.userManager.ExtractUser(c)
	if err != nil {
		return appError.New(err, err.Error(), http.StatusBadRequest)
	}
	like := interactions.NewLike(userModel.ID, uint(productId))
	if err = h.interactionManager.Like(like); err != nil {
		return appError.New(err, err.Error(), http.StatusBadRequest)
	}
	c.Status(http.StatusCreated)
	return nil
}

// RemoveLike
// @Tags interactions
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
	userModel, err := h.userManager.ExtractUser(c)
	if err != nil {
		return appError.New(err, err.Error(), http.StatusBadRequest)
	}
	like := interactions.NewLike(userModel.ID, uint(productId))
	if err = h.interactionManager.RemoveLike(like); err != nil {
		return appError.New(err, err.Error(), http.StatusBadRequest)
	}
	c.Status(http.StatusOK)
	return nil
}

// View
// @Tags interactions
// @Security ApiKeyAuth
// @Accept json
// @Produce json
// @Param id path int true "id"
// @Success 200 {string} ok
// @Failure 400 {string} error
// @Router /products/view/{id} [patch]
func (h *Handler) View(c *gin.Context) *appError.AppError {
	id := c.Param("id")
	productId, err := strconv.ParseUint(id, 10, 8)
	if err != nil {
		return appError.New(err, err.Error(), http.StatusBadRequest)
	}
	userModel, err := h.userManager.ExtractUser(c)
	if err != nil {
		return appError.New(err, err.Error(), http.StatusBadRequest)

	}
	view := interactions.NewView(userModel.ID, uint(productId))
	if err = h.interactionManager.View(view); err != nil {
		return appError.New(err, err.Error(), http.StatusBadRequest)
	}
	c.Status(http.StatusOK)
	return nil
}
