package services

import (
	"fmt"
	"github.com/google/uuid"
	"os"
)

type UploadInput struct {
	File        []byte
	Name        string
	Size        int64
	ContentType string
}

type FileStorage struct {
}

func NewFileStorage() *FileStorage {
	return &FileStorage{}
}

func (fs *FileStorage) Create(data []byte, size int64, contentType string) (string, string, error) {
	input := UploadInput{
		File:        data,
		Name:        uuid.New().String(),
		Size:        size,
		ContentType: contentType,
	}
	_ = os.Mkdir("filestorage", os.ModePerm) //TODO
	file, err := os.Create("filestorage" + string(os.PathSeparator) + input.Name)
	if err != nil {
		return "", "", err
	}
	defer file.Close()
	n, err := file.Write(input.File)
	if n == 0 && err != nil {
		return "", "", err
	}
	return fs.generateFileURL(input.Name), input.Name, nil
}

func (fs *FileStorage) Get(id string) (*os.File, error) {
	file, err := os.Open("filestorage" + string(os.PathSeparator) + id)
	if err != nil {
		return nil, nil
	}
	return file, nil
}

func (fs *FileStorage) generateFileURL(fileName string) string {
	return fmt.Sprintf("http://localhost:8080/filestorage/%s", fileName)
}
