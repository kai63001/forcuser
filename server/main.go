package main

import (
	"focuser.com/server/db"
	"focuser.com/server/router"
	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()

	db.Mongodb()
	//insert one user

	// db.ClientDB.Database("focuser").Collection("users").InsertOne()
	app.Get("/", router.IndexRouter)
	app.Post("/auth/register", router.AuthRouterRegister)

	app.Listen(":3001")
}
