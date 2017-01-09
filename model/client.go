package model

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"log"
)

type Client struct {
	Ws   *websocket.Conn
	Send chan *Message
	Name string
	Msg  *Message
}

func (c *Client) Read() {
	defer func() {
		c.Ws.Close()
	}()
	m := &Message{}
	for {
		err := c.Ws.ReadJSON(&m)
		if err != nil {
			log.Println("Error ReadJSON():", err)
			continue
		}
		c.Msg = m
		if c.Msg.Result == false { // คำร้องขอถูกปฏิเสธ
			log.Println("Client.Read() คำร้องขอถูกปฏิเสธ, Message.Result = false")
			continue
		}
		// Todo: ที่จริง ณ จุดนี้ไม่ควรมี c.Msg.Type == "response" ดังนั้นให้ลองดักดู
		if c.Msg.Type != "event" {
			log.Println("Error??? ตามความเข้าใจ ณ ตรงนี้ต้องมีเฉพาะ Event ส่งมา")
			continue
		}
		switch c.Name {
		case "web":
			fmt.Println("Message from web")
			c.WebEvent()
		case "dev":
			fmt.Println("Message from dev")
			c.DevEvent()
		default:
			fmt.Println("Case default: Message==>", m)
			m.Type = "response"
			m.Data = "Hello"
			c.Send <- m
		}
	}
}

func (c *Client) Write() {
	defer func() {
		c.Ws.Close()
	}()
	for {
		select {
		case m, ok := <-c.Send:
			if !ok {
				c.Ws.WriteJSON(gin.H{"message": "Cannot send data"})
				return
			}
			fmt.Println("Client.Write():", m)
			c.Ws.WriteJSON(m)
		}
	}
}

// WebEvent เป็นการแยกเส้นทาง Message Request จาก Web Frontend โดยแยกตาม Command ต่างๆ
func (c *Client) WebEvent() {
	switch c.Msg.Command {
	case "onhand":
		H.Onhand(c)
	case "cancel":
		H.Cancel(c)
	case "billing":
		H.Billing(c)
	}
}

// DevEvent เป็นการแยกเส้นทาง Message จาก Device Event หรือเป็น Response จากคำสั่งที่ส่งไปให้ Device ทำงาน
// โดย Function นี้จะแยก message ตาม Device ก่อน แล้วจึงแยกเส้นทางตาม Command
// โดยไปเรียก Method ที่เกี่ยวข้อง จาก DeviceObject ที่ประกาศไว้ใน Init()
func (c *Client) DevEvent() {
	// Todo: ณ จุดนี้ควรมีแต่ Command กลุ่ม Event เท่านั้น ใช่ไหม???
	switch c.Msg.Device {
	case "coin_hopper":
		CH.Event(c)
	case "coin_acc":
		switch c.Msg.Command {
		case "machine_id":        // ร้องขอหมายเลข Serial Number ของ อุปกรณ์ Coins Acceptor
		case "inhibit":           // ร้องขอ สถานะ Inhibit (รับ-ไม่รับเหรียญ) ของ Coins Acceptor
		case "set_inhibit":       // ตั้งค่า Inhibit (รับ-ไม่รับเหรียญ) ของ Coins Acceptor
		case "recently_inserted": // ร้องขอจานวนเงินของเหรียญล่าสุดที่ได้รับ
		case "received":          // Event น้ีจะเกิดขึ้นเมื่อเคร่ืองรับเหรียญได้รับเหรียญ
		}
	case "bill_acc":
		switch c.Msg.Command {
		case "machine_id":        // ใช้สาหรับการร้องขอหมายเลข Serial Number ของ อุปกรณ์ Bill Acceptor
		case "inhibit":           // ใช้สาหรับร้องขอ สถานะ Inhibit (รับ-ไม่รับธนบัตร) ของ Bill Acceptor
		case "set_inhibit":       // ตั้งค่า Inhibit (รับ-ไม่รับธนบัตร) ของ Bill Acceptor
		case "recently_inserted": // ร้องขอจานวนเงินของธนบัตรล่าสุดที่ได้รับ
		case "take_reject":       // สั่งให้ รับ-คืน ธนบัตรท่ีกาลังตรวจสอบอยู่ **น่าจะใช้คำว่า Escrow
		case "received":          // Event นจี้ ะเกิดขึ้นเม่ือเคร่ืองรับธนบัตรได้รับธนบัตร
		}
	case "printer":
		switch c.Msg.Command {
		case "machine_id": // ร้องขอหมายเลข Serial Number ของ อุปกรณ์ Printer
		case "do_single":  //ส่ังการเคร่ืองปริ้นเตอร์ แบบส่งคาส่ังการกระทาคาสั่งเดียว โดย action_name และ action_data สามารถดูได้จากตาราง Action
		case "do_group":   //ส่ังการเคร่ืองปร้ินเตอร์ แบบส่งคาส่ังการกระทาแบบเปน็ ชุด โดย action_name และ action_data สามารถดูได้จากตาราง Action
		}
	case "main_board":
		switch c.Msg.Command {
		case "machine_id":    // ใช้สาหรับการร้องขอหมายเลข Serial Number ของ อุปกรณ์ Main Board
		case "set_ex_output": // สั่งงาน External Output ของ Main board
		case "get_ex_output": // ใช้สาหรับอ่านค่า External Input ของ Main board
		}
	}
}
