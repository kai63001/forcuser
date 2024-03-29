import Image from 'next/image'
import { setTemplate } from '@/store/templateSlice'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '@/store/store'
import { type PomodoroV1State } from '../pomodoro/type/pomodoroV1'
import { useRef, useState } from 'react'
import { setDragableEditWidget } from '@/store/dragableEditWidgetSlice'

const MusicPlayer = () => {
  const template: PomodoroV1State = useSelector(
    (state: RootState) => state.templateSlice
  )
  const dragableEditWidget = useSelector(
    (state: RootState) => state.dragableEditWidgetSlice
  )
  const dispatch = useDispatch()

  const selectMusicPlayer = (id: number, toggleId: any) => {
    if (template?.music?.widget == id) {
      dispatch(
        setTemplate({
          ...template,
          music: {
            ...template.music,
            widget: -1
          }
        })
      )
      dispatch(
        setDragableEditWidget({
          ...dragableEditWidget,
          toggleId
        })
      )
      return
    }
    dispatch(
      setTemplate({
        ...template,
        music: {
          ...template.music,
          widget: id
        }
      })
    )
    dispatch(
      setDragableEditWidget({
        ...dragableEditWidget,
        toggleId: ''
      })
    )
  }

  const [, setDragging] = useState(false)

  const thisWidget = useRef(null)

  const onDragagleEnd = (e: any, id: any, toggleId: any) => {
    e.preventDefault()
    if (thisWidget.current) {
      const { top, left, right, bottom } =
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        thisWidget.current?.getBoundingClientRect()
      if (
        e.clientX < left ||
        e.clientX > right ||
        e.clientY < top ||
        e.clientY > bottom
      ) {
        console.log('template 2', template)
        dispatch(
          setTemplate({
            ...template,
            music: {
              ...template.music,
              widget: id,
              position: {
                x: e.clientX,
                y: e.clientY
              },
              // random int
              draging: Math.floor(Math.random() * 1000).toString()
            }
          })
        )
        dispatch(
          setDragableEditWidget({
            ...dragableEditWidget,
            toggleId
          })
        )
      }
      setDragging(false)
    }
  }

  return (
    <div
      ref={thisWidget}
      className="absolute z-50 text-white left-[65px] bg-black bg-opacity-90 w-[450px] h-[70vh] px-5 py-4 top-1/2 -translate-y-1/2 rounded-md overflow-hidden"
    >
      <h2 className="text-2xl">Music Player</h2>
      <hr className="bg-gray-500 border-gray-500 my-2" />
      {/* scroll here */}
      <div className="overflow-y-scroll h-[60vh]">
        <div className="flex flex-col space-y-2">
        <div
            className="rounded-md cursor-grab"
            onClick={() => {
              selectMusicPlayer(1, 'edit-music-player-spotify-iframe')
            }}
            onDragStart={(e) => {
              console.log('start')
              setDragging(true)
            }}
            onDragEnd={(event) => {
              onDragagleEnd(event, 1, 'edit-music-player-spotify-iframe')
            }}
          >
            <Image
              className="rounded-md"
              src="/widget/music/iframeSpofityPlayer.png"
              width={400}
              height={200}
              alt="music player spotify iframe"
            />
          </div>
          <div
            className="rounded-md cursor-grab"
            onClick={() => {
              selectMusicPlayer(0, 'edit-music-player-1')
            }}
            onDragStart={(e) => {
              console.log('start')
              setDragging(true)
            }}
            onDragEnd={(event) => {
              onDragagleEnd(event, 0, 'edit-music-player-1')
            }}
          >
            <Image
              className="rounded-md"
              src="/widget/music/musicPlayer.png"
              width={400}
              height={200}
              alt="music player 1"
            />
          </div>
          {/* <div
            onClick={() => {
              selectMusicPlayer(0)
            }}
            onDragStart={(e) => {
              console.log('start')
              setDragging(true)
            }}
            onDragEnd={(event) => {
              onDragagleEnd(event, 0)
            }}
            className={`group cursor-pointer border-2 rounded-md ${
              dragging ? 'opacity-0' : 'opacity-100'
            } ${
              template?.music?.widget == 0
                ? 'bg-main border-main'
                : 'bg-black2 border-black2'
            } `}
          >
            <div className="rounded-md">
              <Image
                className="rounded-md"
                src="/widget/music/musicPlayer.png"
                width={400}
                height={200}
                alt="music player 1"
              />
            </div>
            <div className="px-2 py-1 text-purple-50">Spotify Music Player</div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default MusicPlayer
