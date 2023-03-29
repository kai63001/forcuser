import dynamic from 'next/dynamic'

import BackgroundWidget from './widget/background/backgroundWidget'
// redux
import { useSelector } from 'react-redux'
import type { RootState } from '@/store/store'
import {
  type PomodoroV1State,
  type PomodoroV1Props
} from '../pomodoro/type/pomodoroV1'
import ToDoListV1 from './widget/todo/TodoListV1'

const PomodoroWidget = dynamic(
  async () => await import('./widget/middle/pomodoroWidget')
)
const SpotifyPlayer = dynamic(
  async () => await import('./widget/musicPlayer/spotifyPlayer')
)

const PomodoroV1 = (props: PomodoroV1Props) => {
  const template: PomodoroV1State = useSelector(
    (state: RootState) => state.templateSlice
  )
  const preventDragHandler = (e: any) => {
    e.preventDefault()
  }
  return (
    <div
      className="h-screen w-full overflow-hidden"
      onDragOver={(e) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
      }}
    >
      <div className="relative h-full block" onDragStart={preventDragHandler}>
        {/* setting */}
        <div
          id="setting"
          className="absolute z-20 right-0 text-white mr-10 mt-10 cursor-pointer"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.9332 27.3334L10.2665 23.1334C9.84428 22.9779 9.39984 22.7667 8.93317 22.5001C8.4665 22.2334 8.05539 21.9556 7.69984 21.6667L3.7665 23.4667L0.666504 18.0001L4.2665 15.3667C4.22206 15.1667 4.19428 14.939 4.18317 14.6834C4.17206 14.4279 4.1665 14.2001 4.1665 14.0001C4.1665 13.8001 4.17206 13.5723 4.18317 13.3167C4.19428 13.0612 4.22206 12.8334 4.2665 12.6334L0.666504 10.0001L3.7665 4.53341L7.69984 6.33341C8.05539 6.04453 8.4665 5.76675 8.93317 5.50008C9.39984 5.23341 9.84428 5.03341 10.2665 4.90008L10.9332 0.666748H17.0665L17.7332 4.86675C18.1554 5.0223 18.6054 5.22786 19.0832 5.48341C19.5609 5.73897 19.9665 6.0223 20.2998 6.33341L24.2332 4.53341L27.3332 10.0001L23.7332 12.5667C23.7776 12.789 23.8054 13.0279 23.8165 13.2834C23.8276 13.539 23.8332 13.7779 23.8332 14.0001C23.8332 14.2223 23.8276 14.4556 23.8165 14.7001C23.8054 14.9445 23.7776 15.1779 23.7332 15.4001L27.3332 18.0001L24.2332 23.4667L20.2998 21.6667C19.9443 21.9556 19.5387 22.239 19.0832 22.5167C18.6276 22.7945 18.1776 23.0001 17.7332 23.1334L17.0665 27.3334H10.9332ZM13.9998 18.3334C15.1998 18.3334 16.2221 17.9112 17.0665 17.0667C17.9109 16.2223 18.3332 15.2001 18.3332 14.0001C18.3332 12.8001 17.9109 11.7779 17.0665 10.9334C16.2221 10.089 15.1998 9.66675 13.9998 9.66675C12.7998 9.66675 11.7776 10.089 10.9332 10.9334C10.0887 11.7779 9.6665 12.8001 9.6665 14.0001C9.6665 15.2001 10.0887 16.2223 10.9332 17.0667C11.7776 17.9112 12.7998 18.3334 13.9998 18.3334ZM13.9998 16.3334C13.3554 16.3334 12.8054 16.1056 12.3498 15.6501C11.8943 15.1945 11.6665 14.6445 11.6665 14.0001C11.6665 13.3556 11.8943 12.8056 12.3498 12.3501C12.8054 11.8945 13.3554 11.6667 13.9998 11.6667C14.6443 11.6667 15.1943 11.8945 15.6498 12.3501C16.1054 12.8056 16.3332 13.3556 16.3332 14.0001C16.3332 14.6445 16.1054 15.1945 15.6498 15.6501C15.1943 16.1056 14.6443 16.3334 13.9998 16.3334ZM12.5332 25.3334H15.4665L15.9332 21.6001C16.6665 21.4223 17.3609 21.1445 18.0165 20.7667C18.6721 20.389 19.2665 19.9334 19.7998 19.4001L23.3332 20.9334L24.6665 18.5334L21.5332 16.2334C21.6221 15.8556 21.6943 15.4834 21.7498 15.1167C21.8054 14.7501 21.8332 14.3779 21.8332 14.0001C21.8332 13.6223 21.8109 13.2501 21.7665 12.8834C21.7221 12.5167 21.6443 12.1445 21.5332 11.7667L24.6665 9.46675L23.3332 7.06675L19.7998 8.60008C19.2887 8.0223 18.7109 7.53897 18.0665 7.15008C17.4221 6.76119 16.7109 6.51119 15.9332 6.40008L15.4665 2.66675H12.5332L12.0665 6.40008C11.3109 6.55564 10.6054 6.8223 9.94984 7.20008C9.29428 7.57786 8.71095 8.04453 8.19984 8.60008L4.6665 7.06675L3.33317 9.46675L6.4665 11.7667C6.37761 12.1445 6.30539 12.5167 6.24984 12.8834C6.19428 13.2501 6.1665 13.6223 6.1665 14.0001C6.1665 14.3779 6.19428 14.7501 6.24984 15.1167C6.30539 15.4834 6.37761 15.8556 6.4665 16.2334L3.33317 18.5334L4.6665 20.9334L8.19984 19.4001C8.73317 19.9334 9.32761 20.389 9.98317 20.7667C10.6387 21.1445 11.3332 21.4223 12.0665 21.6001L12.5332 25.3334Z"
              fill="white"
            />
          </svg>
        </div>
        {/* fullscreen */}
        <div
          id="fullscreen"
          className="absolute z-20 right-0 bottom-0 text-white mr-10 mb-10 cursor-pointer"
        >
          <svg
            width="25"
            height="25"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 14V9.175H1.5V12.5H4.825V14H0ZM0 4.825V0H4.825V1.5H1.5V4.825H0ZM9.175 14V12.5H12.5V9.175H14V14H9.175ZM12.5 4.825V1.5H9.175V0H14V4.825H12.5Z"
              fill="white"
            />
          </svg>
        </div>
        {/* TodoList */}
        <ToDoListV1 />
        {/* Music Player */}
        {template?.music?.widget == 0 && <SpotifyPlayer />}

        {/* position absolute middle of center */}
        <PomodoroWidget />
        {/* make image transition black */}
        <div className="absolute z-10 top-0 left-0 w-full h-full bg-black opacity-20"></div>

        <BackgroundWidget />
      </div>
    </div>
  )
}

export default PomodoroV1
// {
// "AWS": "arn:aws:iam::483708185902:user/focuserUser"
// },
