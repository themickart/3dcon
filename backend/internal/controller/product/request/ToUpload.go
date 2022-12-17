package request

import (
	"github.com/gin-gonic/gin"
	"mime/multipart"
	"strconv"
)

type ToUpload struct {
	Name        string
	Description string
	Licence     string
	Category    string
	Price       float64
	File        multipart.File
	FileHeader  *multipart.FileHeader
}

func NewToUpload(c *gin.Context) (*ToUpload, error) {
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
	return &ToUpload{
		Name: name, Description: description, Licence: licence, Category: category,
		Price: price, File: file, FileHeader: fileHeader,
	}, nil
}
