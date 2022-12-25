package review

import "api/internal/domain/user"

type UserReview struct {
	*Review
	RatedId uint
	Rated   *user.User
}

type UserReviewDto struct {
	Text   string
	Author *user.Dto
	Rated  *user.Dto
}

func NewUser(authorId uint, userId uint, text string) *UserReview {
	review := NewReview(authorId, text)
	userReview := &UserReview{review, userId, nil}
	return userReview
}

func NewUserDto(userReview *UserReview) *UserReviewDto {
	return &UserReviewDto{
		Text: userReview.Text, Author: user.NewDto(userReview.Author),
		Rated: user.NewDto(userReview.Rated),
	}
}

type UserUpload struct {
	Text string `json:"text" binding:"required"`
}
