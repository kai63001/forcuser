import { type RootState } from '@/store/store'
import { setTemplate } from '@/store/templateSlice'
import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

const FontSetting = () => {
  const dispatch = useDispatch()
  const template = useSelector((state: RootState) => state.templateSlice)
  const [fontColor, setFontColor] = useState<string[]>(
    template.music?.theme?.fontColor ?? ['#ffffff', '#9ca3af']
  )

  const fontColorChange = (e: any, i: number) => {
    const newFontColor = [...fontColor]
    newFontColor[i] = e.target.value
    setFontColor(newFontColor)
    dispatch(
      setTemplate({
        ...template,
        music: {
          ...template.music,
          theme: {
            ...template.music.theme,
            fontColor: newFontColor
          }
        }
      })
    )
  }

  return (
    <>
      <p className="mb-1">Fonts Color</p>
      <div className="flex items-center space-x-2 relative">
        {fontColor.map((color, index) => (
          <React.Fragment key={index}>
            <label
              htmlFor={`bgColor${index}`}
              className="w-10 h-10 rounded-md ring-2 ring-white border-2 border-black cursor-pointer hover:ring-2 hover:ring-gray-400 hover:border-2 duration-150"
              style={{ backgroundColor: color }}
            />
            <input
              id={`bgColor${index}`}
              type="color"
              className="w-0 h-0 absolute top-8 opacity-0"
              onChange={(e) => {
                fontColorChange(e, index)
              }}
            />
          </React.Fragment>
        ))}
      </div>
    </>
  )
}

export default FontSetting
