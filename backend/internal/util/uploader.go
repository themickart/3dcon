package util

import "mime/multipart"

type Uploader struct {
	fileStorage *FileStorage
}

func NewUploader() *Uploader {
	return &Uploader{fileStorage: NewFileStorage()}
}

func (u *Uploader) UploadFile(file multipart.File, header *multipart.FileHeader) (url string, name string, err error) {
	defer file.Close()
	data := make([]byte, header.Size)
	_, _ = file.Read(data)
	url, name, err = u.fileStorage.Create(data, header.Size, header.Filename)
	if err != nil {
		return "", "", err
	}
	return
}
