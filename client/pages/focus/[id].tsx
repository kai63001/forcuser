import axios from 'axios'
import { useEffect } from 'react'
import { setTemplate } from '@/store/templateSlice'
import { useDispatch } from 'react-redux'
import dynamic from 'next/dynamic'

const PomodoroV1 = dynamic(async () => await import('@/components/pomodoro/pomodoroV1'), {
  ssr: false
})

const FocusMain = (props: any) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setTemplate(props.template))
  }, [dispatch, props.template])

  return (
    <div className="w-full">
      <PomodoroV1 />
    </div>
  )
}

export async function getServerSideProps (context: any) {
  const { id }: any = context.query

  const data = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL_DOCKER}/pomodoro/get/${id}`
  )

  return {
    props: {
      id,
      template: data?.data?.data?.template
    }
  }
}

export default FocusMain
