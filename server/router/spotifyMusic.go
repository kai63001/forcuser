package router

import (
	controller "focuser.com/server/controller/spotify"
	"focuser.com/server/middleware"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func SpotifyRouter(app *fiber.App) {
	api := app.Group("/spotify", logger.New(), middleware.AuthMiddleware)
	api.Get("/token", controller.GetToken)
	api.Post("/playlist-data", controller.GetDataPlaylist)
}
