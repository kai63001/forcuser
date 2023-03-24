package router

import (
	"context"

	"focuser.com/server/db"
	"focuser.com/server/middleware"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type GetPomodoroDataType struct {
	PomodoroId string `json:"pomodoroId"`
}

type MyFocusDataType struct {
	Name  string             `json:"name"`
	Image string             `json:"image"`
	Tag   []string           `json:"tag"`
	Id    primitive.ObjectID `bson:"_id" json:"_id"`
}

func GetPomodoroData(c *fiber.Ctx) error {
	//get params id
	var pomodoro GetPomodoroDataType
	pomodoro.PomodoroId = c.Params("id")
	var newId primitive.ObjectID
	newId, _ = primitive.ObjectIDFromHex(pomodoro.PomodoroId)

	//get data from db pomodoro
	var pomodoroData bson.M
	err := db.ClientDB.Collection("pomodoro").FindOne(context.Background(), bson.M{"_id": newId}).Decode(&pomodoroData)
	if err != nil {
		return c.Status(409).JSON(bson.M{"status": "error", "error": err})
	}

	return c.Status(200).JSON(bson.M{"status": "success", "data": pomodoroData})
}

func GetMyPomodoroList(c *fiber.Ctx) error {
	//get user data
	var user middleware.TokenUserData
	//find pomodoro from user id
	user, _ = middleware.DecodeAuth(c)
	//convert user.id to primitive.ObjectID
	var newId primitive.ObjectID
	newId, _ = primitive.ObjectIDFromHex(user.Id)

	//get data from db pomodoro
	var pomodoroData []MyFocusDataType
	//order by id Desc
	cursor, err := db.ClientDB.Collection("pomodoro").Find(context.Background(), bson.M{"userId": newId}, options.Find().SetSort(bson.D{{Key: "_id", Value: -1}}))
	if err != nil {
		return c.Status(409).JSON(bson.M{"status": "error", "error": err})
	}
	if err = cursor.All(context.Background(), &pomodoroData); err != nil {
		return c.Status(409).JSON(bson.M{"status": "error", "error": err})
	}

	return c.Status(200).JSON(bson.M{"status": "success", "data": pomodoroData})

}
