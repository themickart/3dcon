package controller

type Error struct {
	Error   error
	Message string
	Code    int
}

func NewError(err error, message string, code int) *Error {
	return &Error{Error: err, Message: message, Code: code}
}
