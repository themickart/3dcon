package product

type UpdateInfo struct {
	ProductId uint    `json:"productId" binding:"required"`
	Price     float64 `json:"price" binding:"required"`
	Name      string  `json:"name" binding:"required"`
	Category  string  `json:"category" binding:"required"`
}
