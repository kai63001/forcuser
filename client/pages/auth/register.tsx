import Image from "next/image";
import Link from "next/link";

const Register = () => {
  return (
    <div className="h-screen">
      <div className="grid grid-cols-3 w-full h-full gap-4">
        <div className="max-w-lg w-full m-auto order-2">
          <h1 className="franger text-3xl">Register</h1>
          <p className="text-gray-600">
            Please enter your register details below
          </p>
          <form className="mt-12 space-y-6">
            <input type="hidden" name="remember" value="true" />
            <div className="-space-y-px">
              <div>
                <label htmlFor="email-address" className="mb-2">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div className="pt-4">
                <label htmlFor="password" className="mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
              <div className="pt-4">
                <label htmlFor="ConfirmPassword" className="mb-2">
                  Confirm password
                </label>
                <input
                  id="ConfirmPassword"
                  name="ConfirmPassword"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm password"
                />
              </div>
            </div>
            <button className="w-full bg-black text-white text-center py-2 rounded-md">
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
        <div className="col-span-2 h-screen relative ">
          {/* middle */}
          <div className="z-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="text-white text-center franger">
              <h1 className="text-5xl">Welcome!</h1>
              <p className="text-2xl">
                Create account for your productivity free and start using our services
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
