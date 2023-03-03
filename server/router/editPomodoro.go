package router

import (
	"focuser.com/server/db"
	"focuser.com/server/lib"
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

	lib.GetImage("google.com")
	return c.Status(200).JSON(bson.M{"status": "success", "error": "update success"})
}
