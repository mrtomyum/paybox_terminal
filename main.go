package main

import (
	"fmt"
	"github.com/mrtomyum/paybox_web/ctrl"
	"time"
)

func main() {
	app := ctrl.Router()
	fmt.Println("1")

	// Dial to HW_SERVICE
	//go ctrl.ConnectToHW()
	fmt.Println("2")
	time.Sleep(1 * time.Second)
	// Run Web Server
	app.Run(":8888")

	//app.RunTLS(
	//	":8088",
	//	"api.nava.work.crt",
	//	"nava.work.key",
	//)
}
