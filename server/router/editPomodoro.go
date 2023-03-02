package router

import "github.com/gofiber/fiber/v2"

func EditPomodoro(c *fiber.Ctx) error {
	return c.SendString("EditPomodoro")
}
