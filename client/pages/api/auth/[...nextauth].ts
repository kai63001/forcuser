import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function refreshAccessToken(tokenObject:any) {
    try {
        const tokenResponse = await axios.post(API_URL + '/auth/refreshToken', {
            accessToken: tokenObject.accessToken,
            refreshToken: tokenObject.refreshToken
        });

        console.log("tokenResponse",tokenResponse)

        return {
            ...tokenObject,
            accessToken: tokenResponse.data.token,
            exp: tokenResponse.data.exp,
            refreshToken: tokenResponse.data.refreshToken
        }
    } catch (error:any) {
        // console.log("refreshToken",error.message, error.response.data)
        return {
            ...tokenObject,
            error: "RefreshAccessTokenError",
        }
    }
}

const providers = [
    CredentialsProvider({
        name: 'Credentials',
        authorize: async (credentials:any) => {
            try {
                const user = await axios.post(API_URL + '/auth/login', {
                    password: credentials.password,
                    email: credentials.email
                })

                // console.log("userData",user.data)

                if (user.data.token) {
                    return user.data;
                }

                return null;
            } catch (e:any) {
                console.log(e.message, e.response.data)
                throw new Error(e.response.data.error)
            }
        },
        credentials: {
            username: { label: "Username", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
        },
    })
]

const callbacks = {
    jwt: async ({ token, user }:any) => {
        // console.log("jwt",user)
        if (user) {
            token.token = user.token;
            token.expires = user.exp;
            token.refreshToken = user.refreshToken;
        }else{
            return Promise.resolve(token);
        }

        // console.log("jwt EXP",token.exp < Date.now(),token.exp, Date.now())
        //if token expired, refresh it
        if (token.exp && token.exp < Date.now()) {
            token = refreshAccessToken(token);
        }

        return Promise.resolve(token);
    },
    session: async ({ session, token }:any) => {
        //jwt decode
        const user:any = await jwt.decode(token.token)
        // console.log("user",user)

        session.user = {
            email: user.email,
        };
        session.token = token.token;
        session.refreshToken = token.refreshToken;
        session.expires = token.expires;
        session.error = token.error;

        // console.log("session",session,token)

        return Promise.resolve(session);
    },
}

export const options = {
    providers,
    callbacks,
    pages: {},
    secret: 'secretRomeoKey@#!@#(!@*#()!@#*()!@*)#('
}

const Auth = (req: NextApiRequest, res: NextApiResponse<any>) => NextAuth(req, res, options)
export default Auth;