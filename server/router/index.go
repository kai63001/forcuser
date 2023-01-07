package router

import "github.com/gofiber/fiber/v2"

//generate index router fiber
func IndexRouter(c *fiber.Ctx) error {
	return c.SendString("Hello, World! exe")
}
