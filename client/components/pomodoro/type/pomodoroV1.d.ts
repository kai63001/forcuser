export interface PomodoroV1Props {
  id?: string;
}

export interface PomodoroV1State {
  wallpaper: {
    url: string | any;
    type: number;
  };
  music: {
    type: string;
    url: string;
    position: {
      x: number;
      y: number;
    };
  };
  pomodoro: {
    widget: number;
    position: {
      x: number;
      y: number;
    };
  };
  global: {
    position: {
      x: number;
      y: number;
    };
  };
}

export interface PomodoroState {
  template: PomodoroV1State;
}