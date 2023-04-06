import FaqSelection from '@/components/libs/edit/faqSelection'
import { type RootState } from '@/store/store'
import { setTemplate } from '@/store/templateSlice'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'

const EditMusicPlayerToggleOpen = () => {
  const dispatch = useDispatch()
  const template = useSelector((state: RootState) => state.templateSlice)
  const [bgColor, setBgColor] = useState<string>('#000000')
  const onCustomColor = (e: any) => {
    setBgColor(e.target.value)
    dispatch(
      setTemplate({
        ...template,
        pomodoro: {
          ...template.pomodoro,
          theme: {
            ...template.pomodoro.theme,
            backgroundColor: e.target.value
          }
        }
      })
    )
  }

  const onOpacityChange = (e: any) => {
    dispatch(
      setTemplate({
        ...template,
        pomodoro: {
          ...template.pomodoro,
          theme: {
            ...template.pomodoro.theme,
            opacity: e.target.value / 100
          }
        }
      })
    )
  }

  return (
    <div
      id="musicPlayerSetting"
      className="absolute z-50 text-white left-[63px] hover:bg-opacity-100 bg-opacity-90 bg-black w-[450px] h-[70vh] px-5 py-4 top-1/2 -translate-y-1/2 rounded-md overflow-hidden"
    >
      <FaqSelection>
        <p className="mb-2">Custom Color Background</p>
        <div className="flex items-center space-x-2">
          <label
            htmlFor="bgColor"
            className="w-10 h-10 rounded-md rainbow border-black cursor-pointer hover:ring-2 hover:ring-gray-400 hover:border-2 duration-150"
          />
          <input
            id="bgColor"
            type="color"
            className="w-0 h-0 absolute top-24 left-2 opacity-0"
            onChange={onCustomColor}
          />
          {bgColor != '#000000' && (
            <div
              className="w-10 h-10 rounded-md ring-2 ring-main border-2 border-black cursor-pointer hover:ring-2 hover:ring-gray-400 hover:border-2 duration-150"
              style={{ background: bgColor }}
            />
          )}
        </div>
        <div className="relative my-2">
          <input
            type="range"
            onChange={onOpacityChange}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-transparent absolute top-0 left-0 z-20"
          />
          <div className='h-[9px] relative'>
            <div className='w-full h-full absolute rounded-full z-10' style={{ background: `linear-gradient(to right, rgba(255,0,0,0), ${bgColor})` }}></div>
          <Image
            src="/settings/musicPlayer/opacity-slider-track.png"
            alt="opacity"
            fill
            className='w-full h-full object-cover rounded-full'
           />
          </div>
        </div>

        <p className="mt-5 mb-2">Default Color</p>
        <div
          className="w-10 h-10 rounded-md ring-2 ring-main border-2 border-black cursor-pointer hover:ring-2 hover:ring-gray-400 hover:border-2 duration-150"
          style={{ background: bgColor }}
        />
      </FaqSelection>
    </div>
  )
}
export default EditMusicPlayerToggleOpen
