package lib

import (
	"bytes"
	"encoding/base64"
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

func GetImage(id string) (string, error) {
	//http://localhost:7171/api/screenshot

	// use gowitness api to screenshot website

	//http post request to http://localhost:7171/api/screenshot

	// if oneshot is true, then it will take screenshot of the site and return the image data
	// if oneshot is false, then it will take screenshot of the site and save it to the database

	requestBody := []byte(`{"url": "http://client:3000/focus/` + id + `", "oneshot": "true"}`)

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
	// fmt.Println("filename:", filename)
	converted, err := bimg.NewImage(respBody).Convert(bimg.WEBP)
	if err != nil {
		fmt.Println("Error converting image:", err)
		return "", err
	}
	processed, err := bimg.NewImage(converted).Process(bimg.Options{Quality: 95, Compression: 6, Width: 960, Height: 540})
	if err != nil {
		fmt.Println("Error processed image:", err)
		return "", err
	}

	// ioutil.WriteFile(filename, processed, 0644)

	refilename, reerr := UploadToS3(processed, filename, "screenshot")
	if reerr != nil {
		fmt.Println("Error uploading image:", err)
		return "", err
	}
	fmt.Println("refilename:", refilename)
	return refilename, nil

}

func UploadImage(base64String string) (string, error) {
	// base64 convert to []byte
	//decode base64 to []byte
	//slice the base64 string to get the data
	b64data := base64String[strings.IndexByte(base64String, ',')+1:]
	decoded, err := base64.StdEncoding.DecodeString(b64data)

	if err != nil {
		fmt.Println("Error decoding image:", err)
		return "", err
	}
	//decode to buffer
	buf := bytes.NewBuffer(decoded)

	filename := ""
	processed := []byte{}

	//check if image type is gif
	if buf.Bytes()[0] == 0x47 && buf.Bytes()[1] == 0x49 && buf.Bytes()[2] == 0x46 {
		filename = strings.Replace(uuid.New().String(), "-", "", -1) + ".gif"
		processed = buf.Bytes()
	} else {
		filename = strings.Replace(uuid.New().String(), "-", "", -1) + ".webp"
		converted, err := bimg.NewImage([]byte(buf.String())).Convert(bimg.WEBP)
		if err != nil {
			fmt.Println("Error converting image:", err)
		}
		processed, err = bimg.NewImage(converted).Process(bimg.Options{Quality: 95, Compression: 6, Width: 1920, Height: 1080})
	}

	// fmt.Println("converted:", []byte(base64))
	refilename, reerr := UploadToS3(processed, filename, "wallpapers")
	if reerr != nil {
		fmt.Println("Error uploading image:", err)
		return "", err
	}

	return refilename, nil
}

// func Base64ConvertToByte(base64 string) ([]byte, error) {

func UploadToS3(processed []byte, filename string, path string) (string, error) {
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
		Key:                aws.String(path + "/" + filename),
		Body:               bytes.NewReader(processed),
		ContentLength:      aws.Int64(size),
		ContentType:        aws.String(http.DetectContentType(processed)),
		ContentDisposition: aws.String("attachment"),
		ACL:                aws.String("public-read"),
	}

	// fmt.Printf("%v\n", object)
	_, err := s3Client.PutObject(&object)
	if err != nil {
		fmt.Println(err.Error())
		return "", err
	}

	return path + "/" + filename, nil
}

func DeleteToS3(filename string) error {
	s3Config := &aws.Config{
		Credentials: credentials.NewStaticCredentials(
			os.Getenv("S3_BUCKET_KEY"),
			os.Getenv("S3_SECRET_KEY"),
			""),
		Region: aws.String("us-east-2"),
	}

	newSession := session.New(s3Config)
	s3Client := s3.New(newSession)

	object := s3.DeleteObjectInput{
		Bucket: aws.String("focuserimage"),
		Key:    aws.String(filename),
	}

	_, err := s3Client.DeleteObject(&object)
	if err != nil {
		fmt.Println(err.Error())
		return err
	}

	return nil
}
