import { type PomodoroV1State } from '@/components/pomodoro/type/pomodoroV1'

export const templateDefalut: PomodoroV1State = {
  wallpaper: {
    url: '',
    type: 0
  },
  music: {
    widget: -1,
    type: '',
    url: '',
    theme: {
      backgroundColor: '#000000',
      opacity: 1,
      fontColor: ['#ffffff', '#9ca3af']
    },
    info: {
      uri: 'https://open.spotify.com/playlist/4Zjli1P13J5mmSCD5iKAXK',
      title: 'Lofi 💿 for study, chill, and more',
      thumbnail: 'https://i.scdn.co/image/ab67706c0000da842a07ae7bf4baaed76ac0db21'
    },
    position: {
      x: 0,
      y: 0
    },
    draging: ''
  },
  pomodoro: {
    widget: -1,
    theme: {
      backgroundColor: '#000000',
      opacity: 1
    },
    position: {
      x: -1,
      y: -1
    },
    draging: ''
  },
  global: {
    position: {
      x: 0,
      y: 0
    }
  },
  todolist: {
    position: {
      x: -1,
      y: -1
    }
  }
}
