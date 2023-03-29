import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Input from "@/components/libs/Input";
import axios from "@/lib/axios";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { signIn } from "next-auth/react";

interface RegisterInterface {
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  // env api
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [error, setError]: any = useState({});

  const router = useRouter();

  const [loading, setLoading]: any = useState(false);

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError({});
    const data: RegisterInterface = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
      confirmPassword: e.currentTarget.confirmPassword.value,
    };
    if (data.password !== data.confirmPassword) {
      setError({
        confirmPassword: "blank",
        password: "Passwords do not match",
      });
      setLoading(false);
      console.log("Passwords do not match");
      return;
    }
    axios
      .post(`${API_URL}/auth/register`, data)
      .then((res) => {
        setLoading(false);
        console.log(res);
        //redirect to login
        router.replace("/auth/login");
      })
      .catch((err) => {
        setLoading(false);
        const nameError = err.response?.data?.error;
        console.log(err.response);
        console.log(err);
        if (nameError == "Email already exists") {
          setError({
            email: "Email already exists",
          });
        }
      });
  };

  const googleLogin = (e: any) => {
    e.preventDefault();
    signIn("google", {
      callbackUrl: `${window.location.origin}/dashboard`,
    }).then((res) => {
      console.log("res", res);
    });
  };

  return (
    <Layout>
      <div className="h-screen">
        <div className="grid grid-cols-3 w-full h-full">
          <div className="max-w-lg w-full m-auto order-2 p-10 md:p-3 col-span-3 md:col-span-1">
            <Link href={"/"}>
              <div className="absolute top-10 underline text-gray-400">
                Back to Home
              </div>
            </Link>
            <h1 className="franger text-3xl">Register</h1>
            <p className="text-gray-600">
              Please enter your register details below
            </p>
            <form className="mt-12 space-y-6" onSubmit={register}>
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
                <div className="pt-4">
                  <Input
                    name="confirmPassword"
                    label="Confirm password"
                    required={true}
                    error={error.confirmPassword}
                    autoComplete="password"
                    type="password"
                    placeholder="Confirm password"
                  />
                </div>
              </div>
              <button
                type="submit"
                className={`w-full ${
                  loading ? "bg-gray-500 cursor-not-allowed" : "bg-main"
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
                Create account
              </button>
              <div>
                <button
                  className="w-full border text-black text-center py-2 rounded-md -mt-10 relative"
                  onClick={googleLogin}
                >
                  <Image
                    src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                    alt="Google Logo"
                    width={25}
                    height={25}
                    className="inline-block -translate-y-0.5 mr-1"
                  />
                  Continue with Google
                </button>
              </div>
            </form>
            <div className="mt-8 text-center">
              <span className="text-gray-500">Have an account?</span>
              <span className="ml-2">
                <Link href="/auth/login">Sign in</Link>
              </span>
            </div>
          </div>
          <div className="h-screen relative col-span-0 md:col-span-2 hidden md:block">
            {/* middle */}
            <div className="z-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="text-white text-center franger">
                <h1 className="text-5xl">Welcome!</h1>
                <p className="text-2xl">
                  Create account for your productivity free and start using our
                  services
                </p>
              </div>
            </div>
            {/* bottom right */}
            {/* <div className="z-20 absolute bottom-0 right-0 mb-4 mr-4">
              <div className="text-white text-center text-sm">
                <span>Wallpaper by </span>
                <Link
                  href="https://www.deviantart.com/vsales"
                  className="underline text-blue-400"
                  target={"_blank"}
                  rel="nofollow"
                >
                  vsales
                </Link>
              </div>
            </div> */}
            <div className="absolute z-10 top-0 left-0 w-full h-full bg-black opacity-20"></div>

            <Image
              src="/background/sea.gif"
              alt="Register Image"
              priority={true}
              unoptimized={true}
              fill
              style={{ objectFit: "cover" }}
            />
            {/* <video
              className="absolute  top-0 left-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
            >
              <source
                src={`https://static.wallpaperwaifu.com/videos/preview/2021/starry-night-clouds-preview.mp4`}
                type="video/mp4"
              />
            </video> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
