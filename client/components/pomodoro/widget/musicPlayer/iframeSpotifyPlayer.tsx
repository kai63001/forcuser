import { setDragableEditWidget } from '@/store/dragableEditWidgetSlice'
import { type RootState } from '@/store/store'
import { setTemplate } from '@/store/templateSlice'
import { useState, useRef, useEffect } from 'react'
import Draggable from 'react-draggable'
import { useDispatch, useSelector } from 'react-redux'
import { type PomodoroV1State } from '../../type/pomodoroV1'
import { useRouter } from 'next/router'

const IframeSpotyPlayer = () => {
  const dispatch = useDispatch()
  const dragableEditWidget = useSelector(
    (state: RootState) => state.dragableEditWidgetSlice
  )
  const template: PomodoroV1State = useSelector(
    (state: RootState) => state.templateSlice
  )

  const router = useRouter()

  const [isDragging, setIsDragging] = useState(false)

  const [position, setPosition] = useState({ x: 0, y: 0 })

  const [isEdit, setIsEdit] = useState(false)
  useEffect(() => {
    checkIsEdit()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const checkIsEdit = () => {
    if (router.pathname.includes('edit')) {
      setIsEdit(true)
      return true
    }

    setIsEdit(false)
    return false
  }
  const handleStart = () => {
    dispatch(
      setDragableEditWidget({
        ...dragableEditWidget,
        selectedWidget: 'edit-music-player-1'
      })
    )
    if (Number.isNaN(position.x) || Number.isNaN(position.y)) {
      setPosition({ x: 0, y: 0 })
    }

    setIsDragging(true)
  }

  const handleStop = (e: any, data: any) => {
    setPosition({ x: data.x, y: data.y })
    setIsDragging(false)
    dispatch(
      setTemplate({
        ...template,
        music: {
          ...template.music,
          position: { x: data.x, y: data.y }
        }
      })
    )
  }

  const [maxHeight, setMaxHeight] = useState(0)
  const [maxWidth, setMaxWidth] = useState(0)
  useEffect(() => {
    setMaxHeight(window.innerHeight - thisWidget.current.clientHeight)
    setMaxWidth(window.innerWidth - thisWidget.current.clientWidth)
  }, [])

  const thisWidget: any = useRef(null)

  // useEffect check template.music.position change
  useEffect(() => {
    // console.log('change')
    if (
      template?.music.position &&
      template?.music?.position.x &&
      template?.music?.position.y
    ) {
      setPosition({
        x:
          (template?.music.position.x /
            (template?.global?.position.x - thisWidget.current.clientWidth)) *
          (window.innerWidth - thisWidget.current.clientWidth),
        y:
          (template?.music.position.y /
            (template?.global?.position.y - thisWidget.current.clientHeight)) *
          (window.innerHeight - thisWidget.current.clientHeight)
      })
    }
    // console.log(template)
  }, [template?.global?.position.x, template?.global?.position.y, template?.music.draging, template?.music.position])
  return (
    <Draggable
      onStart={handleStart}
      onStop={handleStop}
      position={position}
      disabled={!isEdit}
      nodeRef={thisWidget}
      bounds={{
        top: 0,
        left: 0,
        right: maxWidth,
        bottom: maxHeight
      }}
    >
      <div
        ref={thisWidget}
        id="leftBottom"
        className={`absolute w-[370px] h-[153px] z-20 text-white ${
          isEdit &&
          (isDragging
            ? 'cursor-grabbing opacity-80'
            : 'cursor-grab opacity-100')
        }`}
      >
        {isEdit && <div className="w-full h-full z-50 absolute"></div>}
        <iframe
          id="spotify"
          width="370px"
          height="100%"
          frameBorder="0"
          allowFullScreen
          data-src="https://open.spotify.com/embed/playlist/4Zjli1P13J5mmSCD5iKAXK?theme=0"
          src="https://open.spotify.com/embed/playlist/4Zjli1P13J5mmSCD5iKAXK?theme=0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        ></iframe>
      </div>
    </Draggable>
  )
}

export default IframeSpotyPlayer
