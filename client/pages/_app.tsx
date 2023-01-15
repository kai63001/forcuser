import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react';
import RefreshTokenHandler from '@/components/libs/refreshTokenHandler';
import { useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [interval, setInterval] = useState(100000);

  return (
      <SessionProvider session={pageProps.session} refetchInterval={interval}>
          <Component {...pageProps} />
          <RefreshTokenHandler setInterval={setInterval} />
      </SessionProvider>
  )
}
