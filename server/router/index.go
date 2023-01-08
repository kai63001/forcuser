package router

import (
	"context"

	"focuser.com/server/db"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
)

// IndexRouter takes a pointer to a fiber.Ctx object and returns an error
func IndexRouter(c *fiber.Ctx) error {
	// insert db
	_, err := db.ClientDB.Database("focuser").Collection("users").InsertOne(context.Background(), bson.D{{Key: "name", Value: "pi"}})
	if err != nil {
		panic(err)
	}

	return c.SendString("Hello, World! exe")
}
