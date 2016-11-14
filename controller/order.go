package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/mrtomyum/paybox_terminal/model"
	"strconv"
)

var (
	o model.Order
)

func PostNewOrderSub(ctx *gin.Context) {
	itemId := ctx.PostForm("itemId")
	size := ctx.PostForm("size")
	price := ctx.PostForm("price")
	qty := ctx.PostForm("qty")

	newItem := new(model.OrderSub)
	newItem.ItemId = itemId
	newItem.Size = size
	newItem.Price = price
	newItem.Qty = qty

	o.Items = append(o.Items, newItem)
	var total float64 = 0
	for _, i := range o.Items {
		sumItem := i.Price * i.Qty
		total += sumItem
	}
	o.Total = total
}

func DeleteOrder(ctx *gin.Context) {
	o = nil
}

func DeleteOrderItem(ctx *gin.Context) {
	l := ctx.Param("line")
	line, _ := strconv.ParseUint(l, 10, 64)
	i := line - 1 // slice index start from 0
	o.Items = append(o.Items[:i], o.Items[i + 1:]...)
}
