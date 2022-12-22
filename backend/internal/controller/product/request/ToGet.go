package request

import (
	"errors"
	"github.com/gin-gonic/gin"
	"strconv"
)

type ToGet struct {
	OrderBy  string
	FilterBy string
	Limit    int
	Offset   int
	IsDest   bool
	Author   string
}

func NewToGet(c *gin.Context) (*ToGet, error) {
	offsetQuery, ok := c.GetQuery("offset")
	if !ok {
		return nil, errors.New("offset required")
	}
	offset, err := strconv.ParseInt(offsetQuery, 10, 32)
	if err != nil {
		return nil, err
	}
	limitQuery, ok := c.GetQuery("limit")
	if !ok {
		return nil, errors.New("limit required")
	}
	limit, err := strconv.ParseInt(limitQuery, 10, 32)
	if err != nil {
		return nil, err
	}
	orderBy := c.Query("orderBy")
	filterBy := c.Query("filterBy")
	author := c.Query("author")
	isDesc, _ := strconv.ParseBool(c.Query("isDesc"))
	return &ToGet{OrderBy: orderBy, FilterBy: filterBy, Limit: int(limit),
		Offset: int(offset), IsDest: isDesc, Author: author}, nil
}
