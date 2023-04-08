package router

import (
	"focuser.com/server/controller"
	"focuser.com/server/middleware"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func SpotifyRouter(app *fiber.App) {
	api := app.Group("/spotify", logger.New(), middleware.AuthMiddleware)
	api.Get("/token", controller.IndexRouter)
}
