import PomodoroV1 from '@/components/pomodoro/pomodoroV1'
import axios from '@/lib/axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import UseAuth from '@/components/libs/useAuth'
import Loading from '@/components/libs/Loading'

// redux
import { setTemplate } from '@/store/templateSlice'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '@/store/store'
import { setDragableEditWidget } from '@/store/dragableEditWidgetSlice'

// dynamic import
import dynamic from 'next/dynamic'
const TimerWidget = dynamic(
  async () => await import('@/components/editPomodoro/timerWidget')
)
const MusicPlayer = dynamic(
  async () => await import('@/components/editPomodoro/musicPlayer')
)
const UploadWallpaper = dynamic(
  async () => await import('@/components/editPomodoro/uploadWallpaper')
)
const SettingWidget = dynamic(
  async () => await import('@/components/editPomodoro/widget/settingWidget')
)
const SaveWidget = dynamic(
  async () => await import('@/components/editPomodoro/saveWidget')
)

const PomodoroEditPage = (props: any) => {
  const { data: session }: any = useSession()
  const dragableEditWidget = useSelector(
    (state: RootState) => state.dragableEditWidgetSlice
  )

  const dispatch = useDispatch()
  const router = useRouter()
  // check auth
  const isAuthenticated = UseAuth(true)

  const [loading, setLoading] = useState(true)

  // function check owner
  const checkOwner = async (data: any) => {
    // console.log(data)
    // console.log(session)
    if (!session) {
      return
    }
    // decode jwt
    const token = await session.token
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace('-', '+').replace('_', '/')
    const decodedData = JSON.parse(window.atob(base64))
    if (data.userId !== decodedData._id) {
      await router.push('/dashboard')
    }
  }

  // 5 = image

  useEffect(() => {
    getDataFromId().catch((err) => {
      console.log(err)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getDataFromId = async () => {
    try {
      const { data } = await axios.get(`/pomodoro/get/${props.id}`)
      console.log('getData', data)
      await checkOwner(data.data)
      // setTemplate(data.data.template);
      dispatch(setTemplate(data.data.template))
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  const openToggle = (id: number) => {
    if (id === dragableEditWidget.toggleId) {
      dispatch(
        setDragableEditWidget({
          ...dragableEditWidget,
          toggleId: 0
        })
      )
      return
    }
    dispatch(
      setDragableEditWidget({
        ...dragableEditWidget,
        toggleId: id
      })
    )
  }

  const renderEditWidget = () => {
    switch (dragableEditWidget.toggleId) {
      case 1:
        return <TimerWidget />
      case 4:
        return <MusicPlayer />
      case 5:
        return <UploadWallpaper />
      case 6:
        return <MusicPlayer />
      default:
        return null
    }
  }

  if (!isAuthenticated) {
    return <Loading />
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="flex h-screen">
      <div className=" w-12 fixed left-2 z-50 top-1/2 -translate-y-1/2">
        <div className="bg-black bg-opacity-90 flex flex-col items-center space-y-10 py-5 rounded-md">
          <div
            className="text-white cursor-pointer px-3 h-[18px]"
            id="timer widget"
            onClick={() => {
              openToggle(1)
            }}
          >
            <i className="fi fi-rr-hourglass-end"></i>
          </div>
          <div
            className="text-white cursor-pointer px-3"
            id="music player"
            onClick={() => {
              openToggle(4)
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.81748 5.04657C7.56642 4.87919 7.24361 4.86359 6.97757 5.00597C6.71153 5.14835 6.54545 5.4256 6.54545 5.72734V12.2728C6.54545 12.5745 6.71153 12.8518 6.97757 12.9942C7.24361 13.1365 7.56642 13.1209 7.81748 12.9536L12.7266 9.68083C12.9542 9.52909 13.0909 9.27362 13.0909 9.00006C13.0909 8.7265 12.9542 8.47104 12.7266 8.31929L7.81748 5.04657ZM10.7977 9.00006L8.18182 10.744V7.25612L10.7977 9.00006Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0ZM1.63636 9C1.63636 4.93318 4.93318 1.63636 9 1.63636C13.0668 1.63636 16.3636 4.93318 16.3636 9C16.3636 13.0668 13.0668 16.3636 9 16.3636C4.93318 16.3636 1.63636 13.0668 1.63636 9Z"
                fill="white"
              />
            </svg>
          </div>
          <div
            className="text-white cursor-pointer px-3"
            id="upload image"
            onClick={() => {
              openToggle(5)
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.4 1.6C1.95817 1.6 1.6 1.95817 1.6 2.4V13.6C1.6 13.943 1.81591 14.2356 2.11925 14.3493L10.6343 5.8343C10.9467 5.52188 11.4532 5.52188 11.7657 5.8343L14.4 8.46863V2.4C14.4 1.95817 14.0418 1.6 13.6 1.6H2.4ZM14.4 10.7314L11.2 7.53135L4.33134 14.4H13.6C14.0418 14.4 14.4 14.0418 14.4 13.6V10.7314ZM0 2.4C0 1.07452 1.07452 0 2.4 0H13.6C14.9255 0 16 1.07452 16 2.4V13.6C16 14.9255 14.9255 16 13.6 16H2.4C1.07452 16 0 14.9255 0 13.6V2.4ZM5.19997 4.80001C4.97905 4.80001 4.79997 4.97909 4.79997 5.20001C4.79997 5.42092 4.97905 5.60001 5.19997 5.60001C5.42088 5.60001 5.59997 5.42092 5.59997 5.20001C5.59997 4.97909 5.42088 4.80001 5.19997 4.80001ZM3.19997 5.20001C3.19997 4.09544 4.0954 3.20001 5.19997 3.20001C6.30453 3.20001 7.19997 4.09544 7.19997 5.20001C7.19997 6.30458 6.30453 7.20001 5.19997 7.20001C4.0954 7.20001 3.19997 6.30458 3.19997 5.20001Z"
                fill="white"
              />
            </svg>
          </div>
          <div
            className="text-white cursor-pointer px-3"
            id="setting"
            onClick={() => {
              openToggle(6)
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.48975 1.17C9.10975 -0.39 6.88975 -0.39 6.50975 1.17C6.45302 1.40442 6.34174 1.62213 6.18497 1.80541C6.02821 1.9887 5.83038 2.13238 5.60759 2.22477C5.38481 2.31716 5.14336 2.35564 4.90289 2.33709C4.66242 2.31854 4.42973 2.24347 4.22375 2.118C2.85175 1.282 1.28175 2.852 2.11775 4.224C2.65775 5.11 2.17875 6.266 1.17075 6.511C-0.39025 6.89 -0.39025 9.111 1.17075 9.489C1.40523 9.54581 1.62298 9.65719 1.80626 9.81407C1.98955 9.97096 2.13319 10.1689 2.22549 10.3918C2.31779 10.6147 2.35614 10.8563 2.33742 11.0968C2.3187 11.3373 2.24343 11.5701 2.11775 11.776C1.28175 13.148 2.85175 14.718 4.22375 13.882C4.42969 13.7563 4.6624 13.6811 4.90293 13.6623C5.14347 13.6436 5.38502 13.682 5.60793 13.7743C5.83084 13.8666 6.02879 14.0102 6.18568 14.1935C6.34256 14.3768 6.45394 14.5945 6.51075 14.829C6.88975 16.39 9.11075 16.39 9.48875 14.829C9.54575 14.5946 9.65724 14.377 9.81416 14.1939C9.97108 14.0107 10.169 13.8672 10.3918 13.7749C10.6147 13.6826 10.8561 13.6442 11.0966 13.6628C11.3371 13.6815 11.5698 13.7565 11.7758 13.882C13.1477 14.718 14.7178 13.148 13.8818 11.776C13.7563 11.57 13.6812 11.3373 13.6626 11.0969C13.644 10.8564 13.6824 10.6149 13.7747 10.3921C13.8669 10.1692 14.0105 9.97133 14.1936 9.81441C14.3768 9.65749 14.5944 9.546 14.8288 9.489C16.3898 9.11 16.3898 6.889 14.8288 6.511C14.5943 6.45419 14.3765 6.34281 14.1932 6.18593C14.01 6.02904 13.8663 5.83109 13.774 5.60818C13.6817 5.38527 13.6434 5.14372 13.6621 4.90318C13.6808 4.66265 13.7561 4.42994 13.8818 4.224C14.7178 2.852 13.1477 1.282 11.7758 2.118C11.5698 2.24368 11.3371 2.31895 11.0966 2.33767C10.856 2.35639 10.6145 2.31804 10.3916 2.22574C10.1687 2.13344 9.97071 1.9898 9.81382 1.80651C9.65694 1.62323 9.54556 1.40548 9.48875 1.171L9.48975 1.17ZM7.99975 11C8.7954 11 9.55846 10.6839 10.1211 10.1213C10.6837 9.55871 10.9998 8.79565 10.9998 8C10.9998 7.20435 10.6837 6.44129 10.1211 5.87868C9.55846 5.31607 8.7954 5 7.99975 5C7.2041 5 6.44104 5.31607 5.87843 5.87868C5.31582 6.44129 4.99975 7.20435 4.99975 8C4.99975 8.79565 5.31582 9.55871 5.87843 10.1213C6.44104 10.6839 7.2041 11 7.99975 11Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
        {/* end menu */}
        {dragableEditWidget.selectedWidget === 'music' && <SettingWidget />}
      </div>
      <div className="w-full">
        <PomodoroV1 />
      </div>
      <div id="toggle">{renderEditWidget()}</div>

      <SaveWidget id={props.id} />
    </div>
  )
}

// get parame id
export async function getServerSideProps (context: any) {
  const { id } = context.query
  return {
    props: {
      id
    }
  }
}

export default PomodoroEditPage
