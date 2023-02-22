package router

import "github.com/gofiber/fiber/v2"

type PomodoroType struct {
	PomodoroName string `json:"pomodoroName"`
	Tag          string `json:"tag"`
	TemplateId   string `json:"templateId"`
}

func CreatePomodoro(c *fiber.Ctx) error {

	//get post data
	var pomodoro PomodoroType
	if err := c.BodyParser(&pomodoro); err != nil {
		return err
	}

	return c.SendString("Hello, Worldasd! s👋!asda")
}
