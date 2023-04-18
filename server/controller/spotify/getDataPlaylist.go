package controller

import (
	"focuser.com/server/service"
	"github.com/gofiber/fiber/v2"
)

type SpotifyPlaylist struct {
	Url string `json:"url"`
}

func GetDataPlaylist(c *fiber.Ctx) error {
	var data SpotifyPlaylist
	if err := c.BodyParser(&data); err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": err.Error()})
	}

	token, ertoken := service.GetToken()
	if ertoken != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": ertoken.Error()})
	}
	res, err := service.GetPlaylistTracks(token, data.Url)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": err.Error()})
	}
	return c.Status(200).JSON(fiber.Map{"status": "success", "data": res})
}
