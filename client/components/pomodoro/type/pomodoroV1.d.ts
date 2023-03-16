export interface PomodoroV1Props {
  id?: string;
  setTemplate?: Function;
  template: {
    wallpaper: {
      url: string;
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
  };
}

export interface PomodoroV1State {
  wallpaper: {
    url: string;
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
}
