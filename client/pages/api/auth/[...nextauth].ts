/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from 'axios'
import { type NextApiRequest, type NextApiResponse } from 'next'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

import jwt from 'jsonwebtoken'

const API_URL = process.env.NEXT_PUBLIC_API_URL_DOCKER

async function RefreshAccessToken (tokenObject: any) {
  console.log('refreshAccessToken')
  try {
    const tokenResponse = await axios.post(`${API_URL}/auth/refreshToken`, {
      accessToken: tokenObject.accessToken,
      refreshToken: tokenObject.refreshToken
    })

    // console.log("tokenResponse", tokenResponse);

    return {
      ...tokenObject,
      accessToken: tokenResponse.data.token,
      exp: tokenResponse.data.exp,
      refreshToken: tokenResponse.data.refreshToken
    }
  } catch (error: any) {
    // console.log("refreshToken",error.message, error.response.data)
    return {
      ...tokenObject,
      error: 'RefreshAccessTokenError'
    }
  }
}

const providers = [
  CredentialsProvider({
    id: 'username-login',
    name: 'Credentials',
    authorize: async (credentials: any) => {
      try {
        const user = await axios.post(`${API_URL}/auth/login`, {
          password: credentials.password,
          email: credentials.email
        })

        // console.log("userData", user);``

        if (user.data.token) {
          return user.data
        }

        return null
      } catch (e: any) {
        // console.log(e);
        throw new Error(e.response.data.error)
      }
    },
    credentials: {
      email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
      password: { label: 'Password', type: 'password' }
    }
  }),
  GoogleProvider({
    // @ts-expect-error
    clientId: process.env.GOOGLE_CLIENT_ID,
    // @ts-expect-error
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  })
]

const callbacks = {
  jwt: async ({ token, user, account }: any) => {
    if (account && account.provider === 'google') {
      user.token = account.token
      user.refreshToken = account.refresh
      user.expires = account.exp

      return await Promise.resolve(user)
    }
    // console.log("jwt", token);
    if (user) {
      // console.log("user", user)
      token.token = user.token
      token.expires = user.exp
      token.refreshToken = user.refreshToken
    } else {
      return await Promise.resolve(token)
    }

    // console.log("jwt EXP",token.exp < Date.now(),token.exp, Date.now())
    // if token expired, refresh it
    if (token.exp && token.exp < Date.now()) {
      token = RefreshAccessToken(token)
    }

    return await Promise.resolve(token)
  },
  session: async ({ session, token }: any) => {
    // jwt decode
    const user: any = jwt.decode(token.token) ?? token

    session.user = {
      email: user.email,
      name: user.name,
      image: user.image
    }
    session.token = token.token
    session.refreshToken = token.refreshToken
    session.expires = token.expires
    session.error = token.error

    // console.log("session",session,token)

    return await Promise.resolve(session)
  },
  // login
  signIn: async ({ account, profile }: any) => {
    if (account.provider === 'google') {
      // console.log("google profile", profile);
      const response = await axios.post(`${API_URL}/auth/google`, {
        email: profile.email,
        name: profile.name,
        image: profile.picture
      })

      //   console.log(response.data);

      account.token = await response.data.token
      account.refresh = await response.data.refreshToken
      account.exp = await response.data.exp

      return true

      //   const user = await axios.post(`${API_URL}/auth/google`, {
      //     email: profile.email,
      //     name: profile.name,
      //     googleId: profile.id,
      //     image: profile.image,
      //   });
    }
    return true
  }
}

export const Options: any = {
  providers,
  callbacks,
  pages: {},
  secret: process.env.NEXT_PUBLIC_SECRET_JWT
}

const Auth = (req: NextApiRequest, res: NextApiResponse<any>) =>
  NextAuth(req, res, Options)
export default Auth
