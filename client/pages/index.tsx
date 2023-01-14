import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";


export default function Home() {
  const preventDragHandler = (e: any) => {
    e.preventDefault();
  };
  return (
    <div className="h-screen">
      <div className="relative h-5/6 block" onDragStart={preventDragHandler}>
        <div id="cover" className="absolute z-10">
          asd
        </div>
        <div id="cover" className="absolute z-20 right-0 text-white mr-5 mt-5">
          <Link href="/auth/login" className="text-lg">Login</Link>
        </div>
        {/* position absolute middle of center */}
        <div className="absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col items-center">
            <h1 className="text-8xl franger text-white">Focuser</h1>
            <p className="text-white">
              flexible and easy to boost your productivity free
            </p>
            <button className="bg-white px-7 py-2 mt-2 rounded-full hover:bg-transparent hover:text-white border-2 border-white duration-200 text-xl">
              Create
            </button>
          </div>
        </div>
        {/* make image transition black */}

        <div className="absolute z-10 top-0 left-0 w-full h-full bg-black opacity-50"></div>
        <Image
          src="https://wallpaperaccess.com/full/2825725.gif"
          alt="Focuser Background"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <p className="text-red-500">5000</p>

      <button onClick={() => signOut()}>
        Sign out
      </button>
    </div>
  );
}
