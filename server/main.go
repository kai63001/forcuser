package main

import (
	"focuser.com/server/router"
	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()

	app.Get("/", router.IndexRouter)

	app.Listen(":3001")
}
