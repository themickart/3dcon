package auth

type LoginModel struct {
	Username string `json:"username"`
	Password string `json:"password"`
}
