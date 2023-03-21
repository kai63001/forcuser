package router

import (
	"context"
	"fmt"
	"os"
	"time"

	"focuser.com/server/db"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
)

// User is a struct for user
type User struct {
	Email           string `json:"email"`
	Name            string `json:"name"`
	Image           string `json:"image"`
	Id              string `bson:"_id,omitempty"`
	Password        string `json:"password"`
	ConfirmPassword string `json:"confirmPassword"`
}

type Token struct {
	AccessToken string `json:"accessToken"`
	Refresh     string `json:"refresh"`
}

type TokenData struct {
	Email string `json:"email"`
	Id    string `bson:"_id,omitempty"`
	jwt.StandardClaims
}

func LoginByGoogle(c *fiber.Ctx) error {
	//get email from body
	var user User
	if err := c.BodyParser(&user); err != nil {
		fmt.Println(err)
	}
	finder := User{}
	if err := db.ClientDB.Collection("users").FindOne(context.Background(), bson.M{"email": user.Email}).Decode(&finder); err != nil {
		fmt.Println("error", err)
	}

	if finder == (User{}) {
		fmt.Println("not found")
		//create and get id last login and create date
		result, err := db.ClientDB.Collection("users").InsertOne(context.Background(), bson.M{"email": user.Email, "image": user.Image, "name": user.Name, "lastLogin": time.Now(), "createDate": time.Now()})
		if err != nil {
			fmt.Println(err)
		}
		//create token

		tokenString, tokenStringRefresh, err := createToken(&User{Email: user.Email, Id: result.InsertedID.(primitive.ObjectID).Hex()})
		if err != nil {
			return c.Status(409).JSON(bson.M{"status": "error", "error": err})
		}

		return c.Status(200).JSON(bson.M{"status": "success", "token": tokenString, "refreshToken": tokenStringRefresh, "exp": time.Now().Add(time.Hour*24).Unix() * 1000})
	}

	//update last login
	if _, err := db.ClientDB.Collection("users").UpdateOne(context.Background(), bson.M{"email": user.Email}, bson.M{"$set": bson.M{"lastLogin": time.Now()}}); err != nil {
		fmt.Println(err)
		return c.Status(409).JSON(bson.M{"status": "error", "error": err})
	}

	//create token
	tokenString, tokenStringRefresh, err := createToken(&finder)
	if err != nil {
		return c.Status(409).JSON(bson.M{"status": "error", "error": err})
	}

	return c.Status(200).JSON(bson.M{"status": "success", "token": tokenString, "refreshToken": tokenStringRefresh, "exp": time.Now().Add(time.Hour*24).Unix() * 1000})

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
	_, _err := db.ClientDB.Collection("users").InsertOne(context.Background(), bson.M{"email": user.Email, "password": string(hashedPassword), "createDate": time.Now(), "lastLoginDate": time.Now()})
	if _err != nil {
		return c.Status(503).JSON(bson.M{"status": "error", "error": _err.Error()})
	}

	return c.Status(200).JSON(bson.M{"status": "success", "message": "User created successfully"})
}

func AuthRouteLogin(c *fiber.Ctx) error {

	//get body json
	var user User
	if err := c.BodyParser(&user); err != nil {
		fmt.Println(user)
		fmt.Println(err.Error())
		return c.Status(503).JSON(bson.M{"status": "error", "error": err.Error()})
	}

	//log user

	//find email on db
	finder := User{}
	if err := db.ClientDB.Collection("users").FindOne(context.Background(), bson.M{"email": user.Email}).Decode(&finder); err != nil {
		fmt.Println(err)
	}
	if finder == (User{}) {
		return c.Status(409).JSON(bson.M{"status": "error", "error": "Email not exists or Password not match"})
	}

	//update last login date
	_, errUpdateLogin := db.ClientDB.Collection("users").UpdateOne(context.Background(), bson.M{"email": user.Email}, bson.M{"$set": bson.M{"lastLoginDate": time.Now()}})
	if errUpdateLogin != nil {
		return c.Status(503).JSON(bson.M{"status": "error", "error": errUpdateLogin.Error()})
	}

	// print
	// fmt.Println(finder)

	//compare password
	err := bcrypt.CompareHashAndPassword([]byte(finder.Password), []byte(user.Password))
	if err != nil {
		return c.Status(409).JSON(bson.M{"status": "error", "error": "Email not exists or Password not match"})
	}

	//jwt create access token
	tokenString, tokenStringRefresh, err := createToken(&finder)

	return c.Status(200).JSON(bson.M{"status": "success", "message": "User logged successfully", "token": tokenString, "refreshToken": tokenStringRefresh, "exp": time.Now().Add(time.Hour*24).Unix() * 1000})
}

func AuthRouterRefreshToken(c *fiber.Ctx) error {
	//get body json
	var tokenData Token
	if err := c.BodyParser(&tokenData); err != nil {
		return c.Status(503).JSON(bson.M{"status": "error", "error": err.Error()})
	}

	//check refresh token
	token, err := jwt.Parse(tokenData.Refresh, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(os.Getenv("REFRESH_TOKEN_SECRET")), nil
	})
	if err != nil {
		return c.Status(503).JSON(bson.M{"status": "error", "error": err.Error()})
	}

	tokenString, tokenStringRefresh := "", ""

	// check token
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		if time.Now().Unix() < int64(claims["exp"].(float64)) {
			// Create new claims
			//convert claims email to string

			//parese jwt accessToken
			accessToken, err := jwt.Parse(tokenData.AccessToken, func(token *jwt.Token) (interface{}, error) {
				if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
					return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
				}
				return []byte(os.Getenv("REFRESH_TOKEN_SECRET")), nil
			})
			if err != nil {
				return c.Status(503).JSON(bson.M{"status": "error", "error": err.Error()})
			}

			// check token
			if claimsToken, ok := accessToken.Claims.(jwt.MapClaims); ok && accessToken.Valid {
				email := claimsToken["email"].(string)
				userNew := User{
					Email: email,
				}

				tokenString, tokenStringRefresh, err = createToken(&userNew)
			}

			// claims to user

			if err != nil {
				return c.Status(503).JSON(bson.M{"status": "error", "error": err.Error()})
			}

			fmt.Println(claims)
		} else {
			fmt.Println("Refresh token expired")
		}
	} else {
		fmt.Println("Invalid token")
	}

	return c.Status(200).JSON(bson.M{"status": "success", "message": "Generated new refresh token", "token": tokenString, "refreshToken": tokenStringRefresh, "exp": time.Now().Add(time.Hour*24).Unix() * 1000})
}

func createToken(user *User) (string, string, error) {
	//get _id from user bt email
	var userDB TokenData
	if err := db.ClientDB.Collection("users").FindOne(context.Background(), bson.M{"email": user.Email}).Decode(&userDB); err != nil {
		return "", "", err
	}

	//jwt create access token
	claims := jwt.MapClaims{
		"email": user.Email,
		"_id":   userDB.Id,
		"iat":   time.Now().Unix(),
		"exp":   time.Now().Add(time.Hour*24).Unix() * 1000,
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte(os.Getenv("ACCESS_TOKEN_SECRET")))
	if err != nil {
		return "", "", err
	}
	//jwt create refresh token
	claimsRefresh := jwt.MapClaims{
		"iat": time.Now().Unix(),
		"exp": time.Now().Add(time.Hour*24*7).Unix() * 1000,
	}
	tokenRefresh := jwt.NewWithClaims(jwt.SigningMethodHS256, claimsRefresh)
	tokenStringRefresh, err := tokenRefresh.SignedString([]byte(os.Getenv("REFRESH_TOKEN_SECRET")))
	if err != nil {
		return "", "", err
	}

	return tokenString, tokenStringRefresh, nil
}
