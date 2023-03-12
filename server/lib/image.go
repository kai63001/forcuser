package lib

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"strings"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/google/uuid"
	"github.com/h2non/bimg"
)

func GetImage(site string) (string, error) {
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
		return "", err
	}

	// Set the request header content-type
	req.Header.Set("Content-Type", "application/json")

	// Send the request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {

		fmt.Println("Error sending HTTP request:", err)
		return "", err
	}

	// Read the response body
	respBody, err := ioutil.ReadAll(resp.Body)
	if err != nil {

		fmt.Println("Error reading HTTP response:", err)
		return "", err
	}

	filename := strings.Replace(uuid.New().String(), "-", "", -1) + ".webp"
	fmt.Println("filename:", filename)
	converted, err := bimg.NewImage(respBody).Convert(bimg.WEBP)
	if err != nil {
		fmt.Println("Error converting image:", err)
		return "", err
	}
	processed, err := bimg.NewImage(converted).Process(bimg.Options{Quality: 75, Compression: 6, Width: 640, Height: 321})
	if err != nil {
		fmt.Println("Error processed image:", err)
		return "", err
	}

	// ioutil.WriteFile(filename, processed, 0644)

	s3Config := &aws.Config{
		Credentials: credentials.NewStaticCredentials(
			os.Getenv("S3_BUCKET_KEY"),
			os.Getenv("S3_SECRET_KEY"),
			""),
		Region: aws.String("us-east-2"),
	}

	newSession := session.New(s3Config)
	s3Client := s3.New(newSession)

	size := int64(len(processed))

	object := s3.PutObjectInput{
		Bucket:             aws.String("focuserimage"),
		Key:                aws.String("screenshot/" + filename),
		Body:               bytes.NewReader(processed),
		ContentLength:      aws.Int64(size),
		ContentType:        aws.String(http.DetectContentType(processed)),
		ContentDisposition: aws.String("attachment"),
		ACL:                aws.String("public-read"),
	}

	fmt.Printf("%v\n", object)
	_, err = s3Client.PutObject(&object)
	if err != nil {
		fmt.Println(err.Error())
	}

	return "screenshot/" + filename, nil

}
