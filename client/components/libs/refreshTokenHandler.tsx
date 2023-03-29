import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

const RefreshTokenHandler = (props: any) => {
  const { data: session }: any = useSession()

  useEffect(() => {
    if (session) {
      // console.log("sessction",session.expires - Date.now(),session.expires,Date.now())
      // console.log("value retrun",session.expires <  Date.now()? 0 :session.expires - Date.now())
      // console.log("return")
      // props.setInterval(session.expires <  Date.now()? 0 :session.expires - Date.now());

      // const timeRemaining = Math.round(session.expires - Date.now());
      // props.setInterval(timeRemaining > 0 ? timeRemaining : 0);
    }
  }, [session])

  return null
}

export default RefreshTokenHandler
