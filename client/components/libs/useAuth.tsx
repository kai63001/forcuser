import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function UseAuth (shouldRedirect: any) {
  const { data: session }: any = useSession()
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // console.log("useAuth", session)
    if (session?.error === 'RefreshAccessTokenError') {
      signOut({ callbackUrl: '/auth/login', redirect: shouldRedirect }).catch(
        (err) => {
          console.error('err', err)
        }
      )
    }

    if (session === null) {
      if (router.route !== '/auth/login') {
        router.replace('/auth/login').catch((err) => {
          console.error('err', err)
        }
        )
      }
      setIsAuthenticated(false)
    } else if (session !== undefined) {
      if (router.route === '/auth/login') {
        router.replace('/dashboard').catch((err) => {
          console.error('err', err)
        }
        )
      }
      setIsAuthenticated(true)
    }
  }, [router, session, shouldRedirect])

  return isAuthenticated
}
