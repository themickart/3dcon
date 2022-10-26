package auth

type JoinModel struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	Username string `json:"username"`
}
