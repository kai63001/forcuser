import Image from "next/image";
import Link from "next/link";
import Input from "@/components/libs/Input";
import React, { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import useAuth from "@/components/libs/useAuth";
import Layout from "@/components/Layout";

const Login = () => {
  const isAuthenticated = useAuth(true);
  const router = useRouter();

  const [error, setError]: any = useState({});

  const [loading, setLoading]: any = useState(false);

  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError({});
    const data = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };
    console.log(data);
    signIn(
      "username-login",
      {
        redirect: false,
        email: data.email,
        password: data.password,
      },
      {
        callbackUrl: `${window.location.origin}/`,
      }
    )
      .then((res) => {
        console.log("res", res);
        setLoading(false);
        if (res?.error == "Email not exists or Password not match") {
          setError({
            email: "Email or password is incorrect",
            password: "Email or password is incorrect",
          });
          return;
        }
        // router.replace("/dashboard");
      })
      .catch((err) => {
        setLoading(false);
        setError({
          email: "Email or password is incorrect",
          password: "Email or password is incorrect",
        });
        console.log("error",err);
      });
  };

  if (isAuthenticated == true) {
    return <div></div>;
  }

  return (
    <Layout>
      <div className="h-screen">
        <div className="grid grid-cols-3 w-full h-full">
          <div className="max-w-lg w-full m-auto p-10 md:p-3 col-span-3 md:col-span-1">
            <h1 className="franger text-3xl">Login</h1>
            <p className="text-gray-600">
              Please enter your login details below
            </p>
            <form className="mt-12 space-y-6" onSubmit={login}>
              <input type="hidden" name="remember" value="true" />
              <div className="-space-y-px">
                <div>
                  <Input
                    name="email"
                    label="Email address"
                    error={error.email}
                    required={true}
                    autoComplete="email"
                    type="email"
                    placeholder="Email address"
                  />
                </div>
                <div className="pt-4">
                  <Input
                    name="password"
                    label="Password"
                    required={true}
                    autoComplete="password"
                    error={error.password}
                    type="password"
                    placeholder="Password"
                  />
                </div>
                <div className="flex justify-between pt-2">
                  <label
                    htmlFor="remember-me"
                    className="inline-flex items-center"
                  >
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Remember me
                    </span>
                  </label>
                  <Link href="/auth/forgot" className="text-sm">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <button
                type="submit"
                className={`w-full ${
                  loading ? "bg-gray-500 cursor-not-allowed" : "bg-black"
                } text-white text-center py-2 rounded-md`}
                disabled={loading}
              >
                {loading && (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
                Sign in
              </button>
              <div>
                <button className="w-full border text-black text-center py-2 rounded-md -mt-10 relative">
                  <Image
                    src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                    alt="Google Logo"
                    width={25}
                    height={25}
                    className="inline-block -translate-y-0.5 mr-1"
                  />
                  Sign in with Google
                </button>
              </div>
            </form>
            <div className="mt-8 text-center">
              <span className="text-gray-500">Don&apos;t have an account?</span>
              <span className="ml-2">
                <Link href="/auth/register">Sign up for free</Link>
              </span>
            </div>
          </div>
          <div className="h-screen relative col-span-0 md:col-span-2 hidden md:block">
            {/* middle */}
            <div className="z-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="text-white text-center franger">
                <h1 className="text-5xl">Welcome back!</h1>
                <p className="text-2xl">
                  We&apos;re so excited to see you again!
                </p>
              </div>
            </div>
            {/* bottom right */}
            <div className="z-20 absolute bottom-0 right-0 mb-4 mr-4">
              <div className="text-white text-center text-sm">
                <span>Wallpaper by </span>
                <Link
                  href="https://www.artstation.com/mingjai"
                  className="underline text-blue-400"
                  target={"_blank"}
                  rel="nofollow"
                >
                  mingjai
                </Link>
              </div>
            </div>
            <div className="absolute z-10 top-0 left-0 w-full h-full bg-black opacity-20"></div>

            <Image
              src="https://storage.googleapis.com/wallpaper-focuser/wallpaper/1297352.jpg"
              alt="Login Image"
              priority={true}
              unoptimized={true}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
