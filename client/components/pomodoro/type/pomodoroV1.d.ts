export interface PomodoroV1Props {
  id?: string;
}

export interface PomodoroV1State {
  wallpaper: {
    url: string | any;
    type: number;
  };
  music: {
    widget: number;
    type: string;
    url: string;
    position: {
      x: number;
      y: number;
    };
    draging: string;
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
  todolist: {
    position: {
      x: number;
      y: number;
    };
  };
}

export interface PomodoroState {
  template: PomodoroV1State;
}