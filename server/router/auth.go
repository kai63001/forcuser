package router

import (
	"context"
	"fmt"
	"time"

	"focuser.com/server/db"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
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
		return c.Status(409).JSON(bson.M{"status": "error", "error": "Email already exists"})
	}

	//print user
	fmt.Println(&user)
	fmt.Println(user)

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		fmt.Println(user)
		return c.Status(503).JSON(bson.M{"status": "error", "error": err.Error()})
	}
	// print
	fmt.Println(string(hashedPassword), bcrypt.DefaultCost)

	//insert user on db
	_, _err := db.ClientDB.Collection("users").InsertOne(context.Background(), bson.M{"email": user.Email, "password": string(hashedPassword)})
	if _err != nil {
		return c.Status(503).JSON(bson.M{"status": "error", "error": _err.Error()})
	}

	return c.Status(200).JSON(bson.M{"status": "success", "message": "User created successfully"})
}

func AuthRouteLogin(c *fiber.Ctx) error {

	var accestTokenSecret = []byte("secretRomeoKey@#!@#(!@*#()!@#*()!@*)#(")
	var refreshTokenSecret = []byte("refrshsceretRomeoKeyjiosddfjiojioj12io3ji0U*!@#&@!*#&!@*(#&!*(@#&*(!@(#)")

	//get body json
	var user User
	if err := c.BodyParser(&user); err != nil {
		return c.Status(503).JSON(bson.M{"status": "error", "error": err.Error()})
	}

	//find email on db
	finder := User{}
	if err := db.ClientDB.Collection("users").FindOne(context.Background(), bson.M{"email": user.Email}).Decode(&finder); err != nil {
		fmt.Println(err)
	}
	if finder == (User{}) {
		return c.Status(409).JSON(bson.M{"status": "error", "error": "Email not exists or Password not match"})
	}

	// print
	fmt.Println(finder)

	//compare password
	err := bcrypt.CompareHashAndPassword([]byte(finder.Password), []byte(user.Password))
	if err != nil {
		return c.Status(409).JSON(bson.M{"status": "error", "error": "Email not exists or Password not match"})
	}

	//jwt create
	claims := jwt.MapClaims{
		"email": user.Email,
		"iat":   time.Now().Add(10 * time.Hour).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, _err := token.SignedString(accestTokenSecret)
	if _err != nil {
		return c.Status(500).JSON(bson.M{"status": "error", "error": _err})
	}
	fmt.Println(tokenString)
	//jwt create refresh token
	claimsRefresh := jwt.MapClaims{
		"iat": time.Now().Add(50 * time.Hour).Unix(),
	}
	tokenRefresh := jwt.NewWithClaims(jwt.SigningMethodHS256, claimsRefresh)
	tokenStringRefresh, _err := tokenRefresh.SignedString(refreshTokenSecret)
	if _err != nil {
		return c.Status(500).JSON(bson.M{"status": "error", "error": _err})
	}

	return c.Status(200).JSON(bson.M{"status": "success", "message": "User logged successfully", "token": tokenString, "refreshToken": tokenStringRefresh})
}
