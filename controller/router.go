package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/contrib/static"
	"fmt"
)

func Router(r *gin.Engine) *gin.Engine {
	r.LoadHTMLGlob("view/**/*.tpl")
	r.Static("/html", "./view/html")
	r.Static("/public", "./view/public")
	r.Static("/js", "./view/public/js")
	r.Static("/css", "./view/public/css")
	r.Static("/img", "./view/public/img")
	r.Static("/json", "./view/public/json")

	//r.GET("/", GetIndex)
	r.Use(static.Serve("/", static.LocalFile("view", true)))
	r.GET("/menu", GetMenu)
	r.GET("/menu/:id/", GetItemsByMenuId)
	r.GET("/item/:id", GetItemById)
	//r.GET("/dev", GetDeviceIndexPage)

	r.GET("/ws", func(c *gin.Context) {
		wsPage(c.Writer, c.Request)
		fmt.Println("wsPage starting!")
	})


	// onhand initial value = 0


	return r
}
