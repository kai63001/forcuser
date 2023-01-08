package router

import (
	"context"
	"fmt"

	"focuser.com/server/db"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"golang.org/x/crypto/bcrypt"
)

// User is a struct for user
type User struct {
	Email           string `json:"email"`
	Password        string `json:"password"`
	ConfirmPassword string `json:"confirmPassword"`
}

// AuthRouterRegister takes a pointer to a fiber.Ctx object and returns an error
func AuthRouterRegister(c *fiber.Ctx) error {

	//get body json
	var user User
	if err := c.BodyParser(&user); err != nil {
		return c.Status(503).JSON(bson.M{"status": "error", "error": err.Error()})
	}

	if user.Password != user.ConfirmPassword {
		return c.Status(503).JSON(bson.M{"status": "error", "error": "Password not match"})
	}

	//find email on db
	finder := User{}
	if err := db.ClientDB.Collection("users").FindOne(context.Background(), bson.M{"email": user.Email}).Decode(&finder); err != nil {
		fmt.Println(err)
	}
	if finder != (User{}) {
		return c.Status(503).JSON(bson.M{"status": "error", "error": "Email already exists"})
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte("mypassword"), bcrypt.DefaultCost)
	// print
	// fmt.Println(string(hashedPassword), bcrypt.DefaultCost)

	//insert user on db
	_, _err := db.ClientDB.Collection("users").InsertOne(context.Background(), bson.M{"email": user.Email, "password": string(hashedPassword)})
	if _err != nil {
		return c.Status(503).JSON(bson.M{"status": "error", "error": err.Error()})
	}

	return c.Status(200).JSON(bson.M{"status": "success", "message": "User created successfully"})
}
