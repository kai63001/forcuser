package db

import (
	"context"

	"github.com/redis/go-redis/v9"
)

var Rdb *redis.Client
var ctx = context.Background()

func ConnectToRedis() {
	Rdb = redis.NewClient(&redis.Options{
		Addr:     "redis:6379",
		Password: "", // no password set
		DB:       0,  // use default DB
	})

	_, err := Rdb.Ping(ctx).Result()
	if err != nil {
		panic(err)
	} else {
		println("redis connected")
	}

}
