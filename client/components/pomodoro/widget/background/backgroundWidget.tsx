import Image from 'next/image'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store/store'
import { type PomodoroV1State } from '../../type/pomodoroV1'
const BackgroundWidget = () => {
  const template: PomodoroV1State = useSelector(
    (state: RootState) => state.templateSlice
  )
  return (
    <Image
      src={`${template?.wallpaper?.url || '/demo/demo.jpg'}`}
      alt="Focusify Background"
      unoptimized={true}
      fill
      style={{ objectFit: 'cover' }}
    />
  )
}

export default BackgroundWidget
