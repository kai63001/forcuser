export interface PomodoroV1Props {
  id?: string
}

export interface PomodoroV1State {
  wallpaper: {
    url: string | any
    type: number
  }
  music: {
    widget: number
    type: string
    url: string
    theme: {
      backgroundColor: string
      opacity: number
      fontColor: string[]
    }
    position: {
      x: number
      y: number
    }
    info: {
      uri: string
      title: string
      thumbnail: string
    }
    playlist?: [any]
    draging: string
  }
  pomodoro: {
    widget: number
    theme: {
      backgroundColor: string
      opacity: number
    }
    position: {
      x: number
      y: number
    }
    draging: string
  }
  global: {
    position: {
      x: number
      y: number
    }
  }
  todolist: {
    position: {
      x: number
      y: number
    }
  }
}

export interface PomodoroState {
  template: PomodoroV1State
}
