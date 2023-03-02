package router

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"net/http"

	"focuser.com/server/db"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// template: {
//     wallpaper: {
//       url: string;
//       type: number;
//     };
//   };
// to type struct

type EditPomodoroDataType struct {
	Wallpaper struct {
		URL  string `json:"url"`
		Type int    `json:"type"`
	} `json:"wallpaper"`
}

func EditPomodoro(c *fiber.Ctx) error {

	var id = c.Params("id")
	var newId primitive.ObjectID
	newId, _ = primitive.ObjectIDFromHex(id)

	var editPomodoro EditPomodoroDataType
	if err := c.BodyParser(&editPomodoro); err != nil {
		return c.Status(409).JSON(bson.M{"status": "error", "error": err})
	}

	//print data
	// fmt.Println(editPomodoro)

	//update data
	if err := db.ClientDB.Collection("pomodoro").FindOneAndUpdate(c.Context(), bson.M{"_id": newId}, bson.M{"$set": bson.M{"template": editPomodoro}}).Err(); err != nil {
		return c.Status(409).JSON(bson.M{"status": "error", "error": err})
	}

	getImage("github.com/kbinani/screenshot")
	return c.Status(200).JSON(bson.M{"status": "success", "error": "update success"})
}

func getImage(site string) {
	//http://localhost:7171/api/screenshot

	// use gowitness api to screenshot website

	//http post request to http://localhost:7171/api/screenshot
	requestBody := []byte(`{"url": "http://client:3000", "oneshot": "true"}`)

	// Create a new HTTP POST request
	req, err := http.NewRequest("POST", "http://gowitness:7171/api/screenshot", bytes.NewBuffer(requestBody))
	if err != nil {
		fmt.Println("Error creating HTTP request:", err)
		return
	}

	// Set the request header content-type
	req.Header.Set("Content-Type", "application/json")

	// Send the request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {

		fmt.Println("Error sending HTTP request:", err)
		return
	}

	// Read the response body
	respBody, err := ioutil.ReadAll(resp.Body)
	if err != nil {

		fmt.Println("Error reading HTTP response:", err)
		return
	}
	//respBody binary data to base64

	// Print the response body
	// fmt.Println(string(respBody))

	//!base 64
	// imageDataEncoded := base64.StdEncoding.EncodeToString(respBody)

	// Print the encoded data
	// fmt.Println("Encoded Image Data:", imageDataEncoded)

	// respBody to png file
	ioutil.WriteFile("test.png", respBody, 0644)

}
