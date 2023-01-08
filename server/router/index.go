package router

import (
	"github.com/gofiber/fiber/v2"
)

// IndexRouter takes a pointer to a fiber.Ctx object and returns an error
func IndexRouter(c *fiber.Ctx) error {
	// insert db
	// _, err := db.ClientDB.Database("focuser").Collection("users").InsertOne(context.Background(), bson.D{{Key: "name", Value: "pi"}})
	return c.SendString("Hello, World! exe")
}
