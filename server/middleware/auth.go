package middleware

import (
	"os"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
)

// Auth is a struct for auth
type Auth struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type TokenUserData struct {
	Email string `json:"email"`
	Id    string `bson:"_id,omitempty"`
	jwt.StandardClaims
}

// AuthMiddleware takes a pointer to a fiber.Ctx object and returns an error
func AuthMiddleware(c *fiber.Ctx) error {
	//get token
	token := c.Get("Authorization")
	//token remove Bearer
	token = strings.TrimPrefix(token, "Bearer ")
	//verify token
	_, err := jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fiber.ErrUnauthorized
		}
		return []byte(os.Getenv("ACCESS_TOKEN_SECRET")), nil
	})
	if err != nil {
		return c.Status(401).JSON(fiber.Map{"status": "error", "error": "Unauthorized", "message": err.Error()})
	}

	return c.Next()
}

func DecodeAuth(c *fiber.Ctx) (TokenUserData, error) {
	token := c.Get("Authorization")
	token = strings.TrimPrefix(token, "Bearer ")
	//decode token
	claims := jwt.MapClaims{}
	_, err := jwt.ParseWithClaims(token, claims, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fiber.ErrUnauthorized
		}
		return []byte(os.Getenv("ACCESS_TOKEN_SECRET")), nil
	})
	if err != nil {
		return TokenUserData{}, err
	}
	//get id from token
	var auth TokenUserData
	auth.Email = claims["email"].(string)
	auth.Id = claims["_id"].(string)

	return auth, nil

}
