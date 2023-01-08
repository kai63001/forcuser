package router

import (
	"github.com/gofiber/fiber/v2"
)

// AuthRouterRegister takes a pointer to a fiber.Ctx object and returns an error
func AuthRouterRegister(c *fiber.Ctx) error {
	return c.SendString("Register")
}
