import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import Input from "../../components/libs/Input";

interface RegisterInterface {
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  // env api
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const register = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: RegisterInterface = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
      confirmPassword: e.currentTarget.confirmPassword.value,
    };
    console.log(data);
    if (data.password !== data.confirmPassword) {
      console.log("Passwords do not match");
      return;
    }
  };

  return (
    <div className="h-screen">
      <div className="grid grid-cols-3 w-full h-full">
        <div className="max-w-lg w-full m-auto order-2 p-10 md:p-3 col-span-3 md:col-span-1">
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
                  type="password"
                  placeholder="Password"
                />
              </div>
              <div className="pt-4">
              <Input
                  name="confirmPassword"
                  label="Confirm password"
                  required={true}
                  autoComplete="password"
                  type="password"
                  placeholder="Confirm password"
                />
                
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white text-center py-2 rounded-md"
            >
              Create account
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
                Create account with Google
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
          <div className="z-20 absolute bottom-0 right-0 mb-4 mr-4">
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
          </div>
          <div className="absolute z-10 top-0 left-0 w-full h-full bg-black opacity-20"></div>

          <Image
            src="https://images4.alphacoders.com/123/1235114.jpg"
            alt="Register Image"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
