package products

import (
	"api/internal/controller/products/requests"
	"github.com/gin-gonic/gin"
	"strconv"
)

func requestToGet(c *gin.Context) (*requests.ToGet, error) {
	offset, err := strconv.ParseInt(c.Query("offset"), 10, 32)
	if err != nil {
		return nil, err
	}
	limit, err := strconv.ParseInt(c.Query("limit"), 10, 32)
	if err != nil {
		return nil, err
	}
	orderBy := c.Query("orderBy")
	filterBy := c.Query("filterBy")
	isDesc, _ := strconv.ParseBool(c.Query("isDesc"))
	return requests.NewToGet(orderBy, filterBy, int(limit), int(offset), isDesc), nil
}

func requestToUpload(c *gin.Context) (*requests.ToUpload, error) {
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
	return requests.NewToUpload(name, description, licence, category, price, file, fileHeader), nil
}
