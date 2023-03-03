package main

import (
	"log"

	"focuser.com/server/db"
	"focuser.com/server/middleware"
	"focuser.com/server/router"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

func main() {
	app := fiber.New()
	app.Use(cors.New())
	db.Mongodb()

	//env
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	//insert one user

	// db.ClientDB.Database("focuser").Collection("users").InsertOne()
	app.Post("/auth/register", router.AuthRouterRegister)
	app.Post("/auth/login", router.AuthRouteLogin)
	app.Post("/auth/refreshToken", router.AuthRouterRefreshToken)
	app.Get("/", router.IndexRouter)
	app.Use(middleware.AuthMiddleware)
	app.Post("/pomodoro/create", router.CreatePomodoro)
	app.Get("/pomodoro/get/:id", router.GetPomodoroData)
	app.Post("/pomodoro/edit/:id", router.EditPomodoro)

	app.Listen(":4000")
}
