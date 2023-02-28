export interface PomodoroV1Props {
  template: {
    wallpaper: {
      url: string;
      type: number;
    };
  };
}

export interface PomodoroV1State {
  wallpaper: {
    url: string;
    type: number;
  };
}
