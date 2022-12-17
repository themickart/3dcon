package util

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
	err := os.Mkdir(storageName, os.ModePerm)
	if err != nil {
		fmt.Println(err)
	}
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
	bucket := storageName + string(os.PathSeparator) + input.Bucket
	err := os.Mkdir(bucket, os.ModePerm)
	if err != nil {
		return "", "", err
	}
	file, err := os.Create(bucket + string(os.PathSeparator) + input.Name)
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
		return nil, err
	}
	return file, nil
}

func (fs *FileStorage) generateFileURL(bucket, filename string) string {
	return fmt.Sprintf("http://localhost:8080/filestorage/%s/%s", bucket, filename)
}
