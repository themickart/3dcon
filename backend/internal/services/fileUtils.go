package services

import (
	"io"
	"os"
)

type FileUtils struct {
}

func NewFileUtils() *FileUtils {
	return &FileUtils{}
}

func (FileUtils) WriteFile(writer io.Writer, file *os.File) error {
	data := make([]byte, 1024)
	for {
		n, err := file.Read(data)
		if err == nil {
			_, err = writer.Write(data[:n])
		}
		if err == nil {
			continue
		}
		if err == io.EOF {
			return nil
		} else {
			return err
		}
	}
}