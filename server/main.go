package main

import (
	"focuser.com/server/db"
	"focuser.com/server/router"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	app := fiber.New()
	app.Use(cors.New())
	db.Mongodb()
	//insert one user

	// db.ClientDB.Database("focuser").Collection("users").InsertOne()
	app.Get("/", router.IndexRouter)
	app.Post("/auth/register", router.AuthRouterRegister)
	app.Post("/auth/login", router.AuthRouteLogin)

	app.Listen(":3001")
}
