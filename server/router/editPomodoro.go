package router

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
)

// template: {
//     wallpaper: {
//       url: string;
//       type: number;
//     };
//   };
// to type struct

type EditPomodoroDataType struct {
	Wallpaper struct {
		URL  string `json:"url"`
		Type int    `json:"type"`
	} `json:"wallpaper"`
}

func EditPomodoro(c *fiber.Ctx) error {

	var editPomodoro EditPomodoroDataType
	if err := c.BodyParser(&editPomodoro); err != nil {
		return c.Status(409).JSON(bson.M{"status": "error", "error": err})
	}

	//print data
	fmt.Println(editPomodoro)

	return c.SendString("EditPomodoro")
}
