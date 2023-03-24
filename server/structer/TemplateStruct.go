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
