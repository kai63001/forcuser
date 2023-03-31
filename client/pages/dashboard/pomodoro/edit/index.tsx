import { useRouter } from 'next/router'

const PomodoroEditPage = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      <h1>Pomodoro Edit Page</h1>
    </div>
  )
}

export default PomodoroEditPage
