package product

import (
	"errors"
	"github.com/gin-gonic/gin"
	"mime/multipart"
	"strconv"
)

type toGet struct {
	OrderBy  string
	Category string
	Limit    int
	Offset   int
	IsDest   bool
	Author   string
}

func newToGet(c *gin.Context) (*toGet, error) {
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
	category := c.Query("category")
	author := c.Query("author")
	isDesc, _ := strconv.ParseBool(c.Query("isDesc"))
	return &toGet{OrderBy: orderBy, Category: category, Limit: int(limit),
		Offset: int(offset), IsDest: isDesc, Author: author}, nil
}

type toUpload struct {
	Name        string
	Description string
	Licence     string
	Category    string
	Price       float64
	File        multipart.File
	FileHeader  *multipart.FileHeader
}

func newToUpload(c *gin.Context) (*toUpload, error) {
	file, fileHeader, err := c.Request.FormFile("cover")
	if err != nil {
		return nil, err
	}
	price, err := strconv.ParseFloat(c.Request.FormValue("price"), 32)
	if err != nil {
		return nil, err
	}
	name := c.Request.FormValue("name")
	description := c.Request.FormValue("description") //TODO
	licence := c.Request.FormValue("licence")
	category := c.Request.FormValue("category")
	return &toUpload{
		Name: name, Description: description, Licence: licence, Category: category,
		Price: price, File: file, FileHeader: fileHeader,
	}, nil
}
