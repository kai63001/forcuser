package router

import (
	"context"

	"focuser.com/server/db"
	"focuser.com/server/middleware"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type PomodoroType struct {
	PomodoroName string   `json:"pomodoroName"`
	Tag          []string `json:"tag"`
	TemplateId   string   `json:"templateId"`
}

func CreatePomodoro(c *fiber.Ctx) error {

	//get post data
	var pomodoro PomodoroType
	if err := c.BodyParser(&pomodoro); err != nil {
		return c.Status(409).JSON(bson.M{"status": "error", "error": err})
	}

	//get user data
	var user middleware.TokenUserData

	user, _ = middleware.DecodeAuth(c)
	//convert user.id to primitive.ObjectID
	var newId primitive.ObjectID
	newId, _ = primitive.ObjectIDFromHex(user.Id)

	//insert db

	result, err := db.ClientDB.Collection("pomodoro").InsertOne(context.Background(), bson.M{"name": pomodoro.PomodoroName, "tag": pomodoro.Tag, "templateId": pomodoro.TemplateId, "userId": newId, "template": bson.M{}})
	if err != nil {
		return c.Status(409).JSON(bson.M{"status": "error", "error": err})
	}
	//get

	return c.Status(200).JSON(bson.M{"status": "success", "data": "Pomodoro created", "id": result.InsertedID})
}
