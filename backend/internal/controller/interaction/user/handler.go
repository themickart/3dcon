package user

import (
	"api/internal/controller"
	"api/internal/domain/review"
	"api/internal/repo"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"net/http"
)

type handler struct {
	userManager   *repo.UserManager
	reviewManager *repo.UserReviewManager
}

func newHandler(db *gorm.DB) *handler {
	return &handler{
		userManager:   repo.NewUserManger(db),
		reviewManager: repo.NewUserReviewManager(db),
	}
}

// review
// @Tags interaction
// @Security ApiKeyAuth
// @Accept json
// @Produce json
// @Param review body review.UserUpload true "userReview"
// @Param ratedId path string true "ratedId"
// @Success 201 {string} created
// @Failure 400 {string} error
// @Router /user/review/{ratedId} [post]
func (h handler) review(c *gin.Context) *controller.Error {
	r, err := newReviewRequest(c)
	if err != nil {
		return controller.NewError(err, err.Error(), http.StatusBadRequest)
	}
	reviewer, err := h.userManager.Extract(c)
	if err != nil {
		return controller.NewError(err, err.Error(), http.StatusBadRequest)
	}
	reviewUser := review.NewUser(reviewer.ID, r.ratedId, r.review.Text)
	if err = h.reviewManager.Create(reviewUser); err != nil {
		return controller.NewError(err, err.Error(), http.StatusBadRequest)
	}
	c.Status(http.StatusCreated)
	return nil
}

// get
// @Tags interaction
// @Accept json
// @Produce json
// @Param offset query int true "offset"
// @Param limit query int true "limit"
// @Param ratedId query int false "ratedId"
// @Param authorId query int false "authorId"
// @Success 200 {object} review.UserReviewDto
// @Failure 400 {string} error
// @Router /user/review [get]
func (h handler) get(c *gin.Context) *controller.Error {
	r, err := newGetReviewRequest(c)
	if err != nil {
		return controller.NewError(err, err.Error(), http.StatusBadRequest)
	}
	reviews, err := h.reviewManager.Get(r.limit, r.offset, r.authorId, r.ratedId)
	if err != nil {
		return controller.NewError(err, err.Error(), http.StatusBadRequest)
	}
	reviewsDto := make([]*review.UserReviewDto, 0, len(reviews))
	for i := range reviews {
		reviewsDto = append(reviewsDto, review.NewUserDto(reviews[i]))
	}
	c.JSON(http.StatusOK, reviewsDto)
	return nil
}
