package controller

import "github.com/gofiber/fiber/v2"

func GetToken(c *fiber.Ctx) error {
	return c.SendString("Hello, World!")
}
