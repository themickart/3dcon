package user

type Reputation struct {
	Total            float32 `json:"total"`
	Reviews          uint    `json:"reviews"`
	ReviewsThisMonth uint    `json:"reviewsThisMonth"`
	ReviewsThisWeek  uint    `json:"reviewsThisWeek"`
}

func NewReputation() *Reputation {
	return &Reputation{
		Total:            100,
		Reviews:          0,
		ReviewsThisMonth: 0,
		ReviewsThisWeek:  0,
	}
}
