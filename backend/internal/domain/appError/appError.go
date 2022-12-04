package appError

type AppError struct {
	Error   error
	Message string
	Code    int
}

func New(err error, message string, code int) *AppError {
	return &AppError{Error: err, Message: message, Code: code}
}
