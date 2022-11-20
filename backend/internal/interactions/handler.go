package interactions

import (
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
func (h *Handler) Like(c *gin.Context) {
	id := c.Param("id")
	productId, err := strconv.ParseUint(id, 10, 8)
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}
	userModel, err := h.userManager.ExtractUser(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}
	like := interactions.NewLike(userModel.ID, uint(productId))
	if err = h.interactionManager.Like(like); err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}
	c.Status(http.StatusCreated)
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
func (h *Handler) RemoveLike(c *gin.Context) {
	id := c.Param("id")
	productId, err := strconv.ParseUint(id, 10, 8)
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}
	userModel, err := h.userManager.ExtractUser(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}
	like := interactions.NewLike(userModel.ID, uint(productId))
	if err = h.interactionManager.RemoveLike(like); err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}
	c.Status(http.StatusOK)
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
func (h *Handler) View(c *gin.Context) {
	id := c.Param("id")
	productId, err := strconv.ParseUint(id, 10, 8)
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}
	userModel, err := h.userManager.ExtractUser(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}
	view := interactions.NewView(userModel.ID, uint(productId))
	if err = h.interactionManager.View(view); err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}
	c.Status(http.StatusOK)
}