package requests

type ToGet struct {
	OrderBy  string
	FilterBy string
	Limit    int
	Offset   int
	IsDest   bool
}

func NewToGet(orderBy, filterBy string, limit, offset int, isDest bool) *ToGet {
	return &ToGet{OrderBy: orderBy, FilterBy: filterBy, Limit: limit, Offset: offset, IsDest: isDest}
}
