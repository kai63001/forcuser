package middleware

import (
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
)

// Auth is a struct for auth
type Auth struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// AuthMiddleware takes a pointer to a fiber.Ctx object and returns an error
func AuthMiddleware(c *fiber.Ctx) error {
	//get token
	token := c.Get("Authorization")
	//verify token
	_, err := jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fiber.ErrUnauthorized
		}
		return []byte("secret"), nil
	})
	if err != nil {
		return c.Status(401).JSON(fiber.Map{"status": "error", "error": "Unauthorized"})
	}

	return c.Next()
}
