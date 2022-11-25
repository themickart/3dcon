package auth

type JoinModel struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
	Username string `json:"username" binding:"required"`
}

type LoginModel struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}
