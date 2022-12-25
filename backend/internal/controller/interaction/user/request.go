package user

import (
	"api/internal/domain/review"
	"github.com/gin-gonic/gin"
	"strconv"
)

type reviewRequest struct {
	ratedId uint
	review  *review.UserUpload
}

func newReviewRequest(c *gin.Context) (*reviewRequest, error) {
	ratedId, err := strconv.ParseUint(c.Param("ratedId"), 10, 32)
	if err != nil {
		return nil, err
	}
	reviewModel := &review.UserUpload{}
	if err = c.BindJSON(reviewModel); err != nil {
		return nil, err
	}
	return &reviewRequest{ratedId: uint(ratedId), review: reviewModel}, nil
}

type getReviewRequest struct {
	limit    uint
	offset   uint
	authorId string
	ratedId  string
}

func newGetReviewRequest(c *gin.Context) (*getReviewRequest, error) {
	limit, err := strconv.ParseUint(c.Query("limit"), 10, 32)
	if err != nil {
		return nil, err
	}
	offset, err := strconv.ParseUint(c.Query("offset"), 10, 32)
	if err != nil {
		return nil, err
	}
	authorId, ok := c.GetQuery("authorId")
	if _, err = strconv.ParseUint(authorId, 10, 32); ok && err != nil {
		return nil, err
	}
	ratedId, ok := c.GetQuery("ratedId")
	if _, err = strconv.ParseUint(ratedId, 10, 32); ok && err != nil {
		return nil, err
	}
	return &getReviewRequest{
			limit:    uint(limit),
			offset:   uint(offset),
			authorId: authorId,
			ratedId:  ratedId},
		nil
}
