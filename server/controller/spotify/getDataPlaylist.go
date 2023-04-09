package controller

import (
	"focuser.com/server/service"
	"github.com/gofiber/fiber/v2"
)

func GetDataPlaylist(c *fiber.Ctx) error {
	token, ertoken := service.GetToken()
	if ertoken != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": ertoken})
	}
	res, err := service.GetPlaylistTracks(token)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": err})
	}
	return c.Status(200).JSON(fiber.Map{"status": "success", "data": res})
}
