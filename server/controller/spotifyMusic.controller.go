package controller

import "github.com/gofiber/fiber/v2"

func IndexRouter(c *fiber.Ctx) error {
	return c.SendString("Hello, World!")
}
