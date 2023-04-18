import Toast from '@/lib/toast'
import Image from 'next/image'

// redux
import { setTemplate } from '@/store/templateSlice'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '@/store/store'
import { type PomodoroV1State } from '../pomodoro/type/pomodoroV1'
const UploadWallpaper = () => {
  const template: PomodoroV1State = useSelector(
    (state: RootState) => state.templateSlice
  )
  const dispatch = useDispatch()
  // mock wallpaper data
  const wallpaperData = [
    {
      id: 1,
      url: 'https://images2.alphacoders.com/130/1301855.jpg',
      type: 0
    },
    {
      id: 2,
      url: 'https://images2.alphacoders.com/130/1300189.jpg',
      type: 0
    },
    {
      id: 3,
      url: 'https://images2.alphacoders.com/130/1301855.jpg',
      type: 0
    },
    {
      id: 5,
      url: 'https://images2.alphacoders.com/130/1301855.jpg',
      type: 0
    },
    {
      id: 5,
      url: 'https://images2.alphacoders.com/130/1301855.jpg',
      type: 0
    },
    {
      id: 5,
      url: 'https://images2.alphacoders.com/130/1301855.jpg',
      type: 0
    },
    {
      id: 5,
      url: 'https://images2.alphacoders.com/130/1301855.jpg',
      type: 0
    },
    {
      id: 5,
      url: 'https://images2.alphacoders.com/130/1301855.jpg',
      type: 0
    },
    {
      id: 5,
      url: 'https://images2.alphacoders.com/130/1301855.jpg',
      type: 0
    }
  ]

  const selectWallpaper = (id: number, url: string) => {
    dispatch(
      setTemplate({
        ...template,
        wallpaper: {
          type: 1,
          url
        }
      })
    )
  }

  const uploadImage = (e: any) => {
    const file = e.target.files[0]
    if (!file) return
    if (!validateImageType(file)) {
      Toast.fire({
        icon: 'error',
        title: 'Invalid image type'
      }).catch((err) => { console.log(err) })
      return
    }
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      dispatch(
        setTemplate({
          ...template,
          wallpaper: {
            type: 0,
            url: reader.result
          }
        })
      )
    }
    console.log('props.template', template)
  }

  const validateImageType = (file: any) => {
    const validTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/webp']
    if (file && !validTypes.includes(file.type)) {
      return false
    }
    return true
  }

  return (
    <div className="absolute z-50 text-white left-[65px] bg-black bg-opacity-90 w-[450px] h-[70vh] px-5 py-4 top-1/2 -translate-y-1/2 rounded-md overflow-hidden">
      <h2 className="text-2xl">Background</h2>
      <hr className="bg-gray-500 border-gray-500 my-2" />
      <h3>Custom Image</h3>
      <label htmlFor="uploadCustomImage" className="cursor-pointer">
        <div className="bg-main text-white w-full py-3 flex mt-2 items-center text-center rounded-md">
          <div className="m-auto">Upload Image</div>
        </div>
      </label>
      {/* png,jpg */}
      <input
        type="file"
        className="hidden"
        id="uploadCustomImage"
        accept="image/png, image/jpeg, image/gif, image/webp"
        onChange={uploadImage}
      />
      <span className="text-xs block mt-2 text-gray-400">
        Limit 10 MB {'(JPG,PNG)'}
      </span>
      <span className="text-xs block text-gray-400">
        {' '}
        GIF format, please subscribe to our service.
      </span>

      <div className="flex space-x-4">
        <h3 className="my-3 cursor-pointer border-b-2">Recommended</h3>
        <h3 className="my-3 cursor-pointer">GIFs</h3>
      </div>
      <div className="flex"></div>
      {/* image grid 2 */}
      <div className="grid grid-cols-2 gap-4 h-[45vh] overflow-y-scroll">
        {wallpaperData.map((wallpaper, index) => (
          <div
            key={index}
            className="rounded-md cursor-pointer "
            onClick={() => { selectWallpaper(wallpaper.id, wallpaper.url) }}
          >
            <Image
              alt="wallpaper"
              src={wallpaper.url}
              width={1000}
              height={1000}
              className="rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
export default UploadWallpaper
