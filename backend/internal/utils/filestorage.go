package utils

import (
	"api/internal"
	"fmt"
	"github.com/google/uuid"
	"os"
)

const storageName = internal.Filestorage

type UploadInput struct {
	File   []byte
	Name   string
	Size   int64
	Bucket string
}

type FileStorage struct {
}

func NewFileStorage() *FileStorage {
	_ = os.Mkdir(storageName, os.ModePerm)
	return &FileStorage{}
}

func (fs *FileStorage) Create(data []byte, size int64, filename string) (string, string, error) {
	input := UploadInput{
		File:   data,
		Bucket: uuid.New().String(),
		Name:   filename,
		Size:   size,
	}
	return fs.CreateFromInput(input)
}

func (fs *FileStorage) CreateFromInput(input UploadInput) (string, string, error) {
	_ = os.Mkdir(storageName+string(os.PathSeparator)+input.Bucket, os.ModePerm)
	file, err := os.Create(storageName + string(os.PathSeparator) +
		input.Bucket + string(os.PathSeparator) + input.Name)
	if err != nil {
		return "", "", err
	}
	defer file.Close()
	n, err := file.Write(input.File)
	if n == 0 && err != nil {
		return "", "", err
	}
	return fs.generateFileURL(input.Bucket, input.Name), input.Name, nil
}

func (fs *FileStorage) Get(bucket, filename string) (*os.File, error) {
	file, err := os.Open(storageName + string(os.PathSeparator) + bucket + string(os.PathSeparator) + filename)
	if err != nil {
		return nil, nil
	}
	return file, nil
}

func (fs *FileStorage) generateFileURL(bucket, filename string) string {
	return fmt.Sprintf("http://localhost:8080/filestorage/%s/%s", bucket, filename)
}
