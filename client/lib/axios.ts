import axios from "axios";
import { getSession } from "next-auth/react";

const ApiClient = () => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });
  instance.interceptors.request.use(async (request: any) => {
    const session: any = await getSession();
    console.log(`session`, session)

    if (session) {
      request.headers.Authorization = `Bearer ${session.token}`;
    }
    return request;
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(`error`, error);
    }
  );

  return instance;
};

export default ApiClient();
