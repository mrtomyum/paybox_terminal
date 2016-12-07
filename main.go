package main

import (
	"github.com/gin-gonic/gin"
	c "github.com/mrtomyum/paybox_terminal/controller"
)

func main() {

	r := gin.Default()
	app := c.Router(r)
	//go c.WsClient()
	app.Run(":8888")
}
