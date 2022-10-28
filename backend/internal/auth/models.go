package auth

type JoinModel struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	Username string `json:"username"`
}

type LoginModel struct {
	Username string `json:"username"`
	Password string `json:"password"`
}
