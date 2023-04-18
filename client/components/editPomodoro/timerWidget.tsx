import Image from 'next/image'
import { setTemplate } from '@/store/templateSlice'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '@/store/store'
import { type PomodoroV1State } from '../pomodoro/type/pomodoroV1'
import { useRef, useState } from 'react'

const TimerWidget = () => {
  const template: PomodoroV1State = useSelector(
    (state: RootState) => state.templateSlice
  )
  const dispatch = useDispatch()

  const selectTimerWidget = (id: number) => {
    if (template?.pomodoro?.widget == id) {
      dispatch(
        setTemplate({
          ...template,
          pomodoro: {
            ...template.pomodoro,
            widget: -1
          }
        })
      )
      return
    }
    dispatch(
      setTemplate({
        ...template,
        pomodoro: {
          ...template.pomodoro,
          widget: id
        }
      })
    )
  }

  const [dragging, setDragging] = useState(false)

  const thisWidget = useRef(null)

  const onDragagleEnd = (e: any, id: any) => {
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
        dispatch(
          setTemplate({
            ...template,
            pomodoro: {
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
      }
      setDragging(false)
    }
  }

  return (
    <div
      ref={thisWidget}
      className="absolute z-50 text-white left-[65px] bg-black bg-opacity-90 w-[450px] h-[70vh] px-5 py-4 top-1/2 -translate-y-1/2 rounded-md overflow-hidden"
    >
      <h2 className="text-2xl">Timer Widget</h2>
      <hr className="bg-gray-500 border-gray-500 my-2" />
      {/* scroll here */}
      <div className="overflow-y-scroll h-[60vh]">
        <div className="flex flex-col space-y-2">
          <div
            onClick={() => {
              selectTimerWidget(0)
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
              template?.pomodoro?.widget == 0
                ? 'bg-main border-main'
                : 'bg-black2 border-black2'
            } `}
          >
            <div className="rounded-md">
              <Image
                className="rounded-md"
                src="/widget/pomodoro/widget1.png"
                width={400}
                height={200}
                alt="music player 1"
              />
            </div>
            <div className="px-2 py-1 text-purple-50">Pomodoro V1 Widget</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimerWidget
