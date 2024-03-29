package router

import (
	"focuser.com/server/db"
	"focuser.com/server/lib"
	"focuser.com/server/structer"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func EditPomodoro(c *fiber.Ctx) error {

	var id = c.Params("id")
	var newId primitive.ObjectID
	newId, _ = primitive.ObjectIDFromHex(id)

	var editPomodoro structer.EditPomodoroDataType
	if err := c.BodyParser(&editPomodoro); err != nil {
		return c.Status(409).JSON(bson.M{"status": "error", "message": err})
	}

	//check if type is equal 0 upload image
	if editPomodoro.Wallpaper.Type == 0 && editPomodoro.Wallpaper.URL != "" {
		//read type base64 image

		//upload image
		path, err := lib.UploadImage(editPomodoro.Wallpaper.URL)
		if err != nil {
			return c.Status(409).JSON(bson.M{"status": "error", "message": err})
		}
		editPomodoro.Wallpaper.URL = "https://focuserimage.s3.us-east-2.amazonaws.com/" + path
		editPomodoro.Wallpaper.Type = 1 //change type to 1 dont upload image again
	}

	//print data
	// fmt.Println(editPomodoro)

	//update data
	if err := db.ClientDB.Collection("pomodoro").FindOneAndUpdate(c.Context(), bson.M{"_id": newId}, bson.M{"$set": bson.M{"template": editPomodoro}}).Err(); err != nil {
		return c.Status(409).JSON(bson.M{"status": "error", "message": err})
	}

	urlImage, err := lib.GetImage(id)
	//update image to db
	if err := db.ClientDB.Collection("pomodoro").FindOneAndUpdate(c.Context(), bson.M{"_id": newId}, bson.M{"$set": bson.M{"image": urlImage}}).Err(); err != nil {
		return c.Status(409).JSON(bson.M{"status": "error", "message": err})
	}

	if err != nil {
		return c.Status(409).JSON(bson.M{"status": "error", "message": err})
	}

	return c.Status(200).JSON(bson.M{"status": "success", "message": "update success", "urlImage": urlImage})
}
