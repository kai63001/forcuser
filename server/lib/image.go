package lib

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"

	"github.com/google/uuid"
	"github.com/h2non/bimg"
)

func GetImage(site string) {
	//http://localhost:7171/api/screenshot

	// use gowitness api to screenshot website

	//http post request to http://localhost:7171/api/screenshot

	// if oneshot is true, then it will take screenshot of the site and return the image data
	// if oneshot is false, then it will take screenshot of the site and save it to the database

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

	//optimize image with bimg

	filename := strings.Replace(uuid.New().String(), "-", "", -1) + ".webp"
	fmt.Println("filename:", filename)
	converted, err := bimg.NewImage(respBody).Convert(bimg.WEBP)
	if err != nil {
		fmt.Println("Error converting image:", err)
		return
	}
	processed, err := bimg.NewImage(converted).Process(bimg.Options{Quality: 75})
	if err != nil {
		fmt.Println("Error processed image:", err)
		return
	}

	ioutil.WriteFile(filename, processed, 0644)

}
