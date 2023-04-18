import '../styles/globals.scss'
import '@sweetalert2/theme-dark'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { Provider } from 'react-redux'
import { store } from '../store/store'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export default function App ({ Component, pageProps }: AppProps) {
  // const [interval, setInterval] = useState(100000000000000000000);

  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
      {/* <RefreshTokenHandler setInterval={setInterval} /> */}
    </SessionProvider>
  )
}
