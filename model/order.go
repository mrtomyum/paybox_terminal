package model

import (
	"reflect"
	"fmt"
	"errors"
	"time"
)

type Sale struct {
	Id       int64
	Created  *time.Time
	HostId   string `json:"host_id" db:"host_id"`
	Total    float64 `json:"total"`
	Payment  float64 `json:"payment"`
	Change   float64 `json:"change"`
	Type     string `json:"type" db:"type"`
	IsPosted bool `json:"is_posted" db:"is_posted"`
	SaleSubs []*SaleSub `json:"sale_subs" `
}

type SaleSub struct {
	Line     uint64 `json:"line"`
	SaleId   uint64 `json:"sale_id" db:"sale_id"`
	ItemId   uint64  `json:"item_id" db:"item_id"`
	ItemName string  `json:"item_name" db:"item_name"`
	PriceId  int     `json:"price_id" db:"price_id"`
	Price    float64 `json:"price"`
	Qty      int     `json:"qty"`
	Unit     string `json:"unit"`
}

func SetField(obj interface{}, name string, value interface{}) error {
	structValue := reflect.ValueOf(obj).Elem()
	fmt.Printf("[func SetField] reflect.ValueOf(obj).Elem() name= %v ,value= %v \n", name, value)
	structFieldValue := structValue.FieldByName(name)

	if !structFieldValue.IsValid() {
		return fmt.Errorf("No such field: %o in obj", name)
	}

	if !structFieldValue.CanSet() {
		return fmt.Errorf("Cannot set %o field value", name)
	}

	structFieldType := structFieldValue.Type()
	val := reflect.ValueOf(value)
	if structFieldType != val.Type() {
		return errors.New("Provided value type didn't match obj field type")
	}

	structFieldValue.Set(val)
	return nil
}

func (s *Sale) FillStruct(m map[string]interface{}) error {
	for k, v := range m {
		err := SetField(s, k, v)
		if err != nil {
			return err
		}
	}
	return nil
}

func (s *Sale) Post() error {
	// Ping Server api.paybox.work:8080/ping
	// if post Error s.IsPosted = false
	// IsNetOnline => Post Order ขึ้น Cloud
	s.IsPosted = true
	return nil
}

func (s *Sale) Save() error {
	fmt.Println("h.OrderSave() start")
	sql1 := `INSERT INTO sale(
		host_id,
		total,
		payment,
		change,
		type,
		is_posted
		)
	VALUES (?,?,?,?,?,?)`

	// Todo: Add time to "created" field
	//created := time.Now()
	rs, err := db.Exec(sql1,
		s.HostId,
		s.Total,
		s.Payment,
		s.Change,
		s.Type,
		s.IsPosted,
	)
	if err != nil {
		return err
	}
	s.Id, _ = rs.LastInsertId()

	os := SaleSub{}
	sql2 := `INSERT INTO sale_sub(
		sale_id,
		item_id,
		qty,
		price_id,
		price
		)
	VALUES(?,?,?,?,?)`
	// Todo: Loop til end SaleSub
	rs, err = db.Exec(sql2,
		s.Id,
		os.Line,
		os.ItemId,
		os.ItemName,
		os.PriceId,
		os.Price,
		os.Qty,
		os.Unit,
	)
	if err != nil {
		return err
	}
	// Check result
	inserted := Sale{}
	err = db.Get(&inserted, "SELECT * FROM sale WHERE id = ?", s.Id)
	if err != nil {
		return err
	}
	fmt.Println("Order.Save() completed, data->", inserted)
	return nil
}
