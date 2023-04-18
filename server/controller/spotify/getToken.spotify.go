package controller

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strconv"
	"time"

	"focuser.com/server/db"
	"github.com/gofiber/fiber/v2"
)

type SpotifyToken struct {
	AccessToken string `json:"access_token"`
	ExpiresIn   int    `json:"expires_in"`
}

var ctx = context.Background()

func GetToken(c *fiber.Ctx) error {

	expTokenStr, err := db.Rdb.Get(ctx, "timeOutSpotifyToken").Result()
	if err != nil {
		fmt.Println("not found")
	}
	// expToken to int
	if expTokenStr != "" {
		expToken, err := strconv.ParseInt(expTokenStr, 10, 64)
		if err != nil {
			fmt.Println(err)
		}
		// check if token is expired
		if expToken+3600 > time.Now().Unix() {
			// fmt.Println("token not expired")
			// if not expired return token
			token, err := db.Rdb.Get(ctx, "spotifyToken").Result()
			if err != nil {
				fmt.Println(err)
			}
			return c.Status(200).JSON(fiber.Map{"status": "success", "token": token})
		}
	}

	//http get https://api.spotify.com/v1/playlists/{playlist_id}/tracks
	body := []byte(`grant_type=client_credentials&client_id=` + os.Getenv("SPOTIFY_CLIENT_ID") + `&client_secret=` + os.Getenv("SPOTIFY_CLIENT_SECRET") + ``)
	r, err := http.NewRequest("POST", "https://accounts.spotify.com/api/token", bytes.NewBuffer(body))
	if err != nil {
		fmt.Println(err)
	}

	r.Header.Add("Content-Type", "application/x-www-form-urlencoded")

	client := &http.Client{}
	res, err := client.Do(r)
	if err != nil {
		fmt.Println(err)
	}
	defer res.Body.Close()
	//json decode
	token := &SpotifyToken{}
	derr := json.NewDecoder(res.Body).Decode(token)
	if derr != nil {
		fmt.Println(derr)
	}
	//set token to redis
	errRedisSetTime := db.Rdb.Set(ctx, "timeOutSpotifyToken", time.Now().Unix(), 0).Err()
	if errRedisSetTime != nil {
		fmt.Println(errRedisSetTime)
	}
	errRedisSet := db.Rdb.Set(ctx, "spotifyToken", token.AccessToken, 0).Err()
	if errRedisSet != nil {
		fmt.Println(errRedisSet)
	}
	return c.Status(200).JSON(fiber.Map{"status": "success", "token": token.AccessToken})
}
