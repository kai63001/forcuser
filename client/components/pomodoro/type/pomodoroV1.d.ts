export interface PomodoroV1Props {
  id?: string;
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
