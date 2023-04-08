package structer

type EditPomodoroDataType struct {
	Wallpaper struct {
		URL  string `json:"url"`
		Type int    `json:"type"`
	} `json:"wallpaper"`
	Music struct {
		Widget   int    `json:"widget"`
		URL      string `json:"url"`
		Type     string `json:"type"`
		Position struct {
			X float64 `json:"x"`
			Y float64 `json:"y"`
		} `json:"position"`
		Theme struct {
			BackgroundColor string   `json:"backgroundColor" bson:"backgroundColor"`
			FontColor       []string `json:"fontColor" bson:"fontColor"`
			Opacity         float64  `json:"opacity"`
		} `json:"theme"`
	} `json:"music"`
	Pomodoro struct {
		Position struct {
			X float64 `json:"x"`
			Y float64 `json:"y"`
		} `json:"position"`
	} `json:"pomodoro"`
	Global struct {
		Position struct {
			X float64 `json:"x"`
			Y float64 `json:"y"`
		} `json:"position"`
	} `json:"global"`
	TodoList struct {
		Position struct {
			X float64 `json:"x"`
			Y float64 `json:"y"`
		} `json:"position"`
	} `json:"todoList"`
}
