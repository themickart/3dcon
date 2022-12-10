package requests

import "mime/multipart"

type ToUpload struct {
	Name        string
	Description string
	Licence     string
	Category    string
	Price       float64
	File        multipart.File
	FileHeader  *multipart.FileHeader
}

func NewToUpload(name, description, licence, category string, price float64,
	file multipart.File, fileHeader *multipart.FileHeader) *ToUpload {
	return &ToUpload{
		Name: name, Description: description, Licence: licence, Category: category,
		Price: price, File: file, FileHeader: fileHeader,
	}
}
