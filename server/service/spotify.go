package service

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
)

type SpotifyToken struct {
	AccessToken string `json:"access_token"`
	ExpiresIn   int    `json:"expires_in"`
}

var ctx = context.Background()

func GetToken() (string, error) {
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
				return "", err
			}
			return token, nil
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
		return "", derr
	}
	//set token to redis
	errRedisSetTime := db.Rdb.Set(ctx, "timeOutSpotifyToken", time.Now().Unix(), 0).Err()
	if errRedisSetTime != nil {
		return "", errRedisSetTime
	}
	errRedisSet := db.Rdb.Set(ctx, "spotifyToken", token.AccessToken, 0).Err()
	if errRedisSet != nil {
		return "", errRedisSet
	}
	return token.AccessToken, nil
}

type SpotifyPlaylist struct {
	Items []struct {
		Track struct {
			Name    string `json:"name"`
			URI     string `json:"uri"`
			Artists []struct {
				Name string `json:"name"`
			} `json:"artists"`
		} `json:"track"`
	} `json:"items"`
}

func GetPlaylistTracks(token string) (interface{}, error) {
	// https://api.spotify.com/v1/playlists/{playlist_id}/tracks
	// items(track(name,uri,artists(name)))
	r, err := http.NewRequest("GET", "https://api.spotify.com/v1/playlists/37i9dQZF1DXcBWIGoYBM5M/tracks", nil)
	if err != nil {
		return SpotifyPlaylist{}, err
	}
	r.Header.Add("Authorization", "Bearer "+token)
	r.Header.Add("Content-Type", "application/json")
	// r.URL.Query().Add("fields", "items(track(name,uri,artists(name)))")
	q := r.URL.Query()
	q.Add("fields", "items(track(name,uri,artists(name)))")
	r.URL.RawQuery = q.Encode()
	client := &http.Client{}
	res, err := client.Do(r)
	if err != nil {
		return SpotifyPlaylist{}, err
	}
	defer res.Body.Close()
	spotifyPlaylist := &SpotifyPlaylist{}
	derr := json.NewDecoder(res.Body).Decode(spotifyPlaylist)
	if derr != nil {
		return SpotifyPlaylist{}, derr
	}

	fmt.Print(spotifyPlaylist)

	return spotifyPlaylist, nil

}
