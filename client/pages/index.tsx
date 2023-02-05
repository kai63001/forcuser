import Layout from "@/components/Layout";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const preventDragHandler = (e: any) => {
    e.preventDefault();
  };
  return (
    <Layout>
      <div className="h-screen">
        <div className="relative h-5/6 block" onDragStart={preventDragHandler}>
          <div id="cover" className="absolute z-10">
            {/* asd */}
          </div>
          <div
            id="cover"
            className="absolute z-20 right-0 text-white mr-5 mt-5"
          >
            <Link href="/auth/login" className="text-lg">
              Login
            </Link>
          </div>
          {/* position absolute middle of center */}
          <div className="absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex flex-col items-center">
              <h1 className="text-8xl franger text-white">Focuser</h1>
              <p className="text-white">
                flexible and easy to boost your productivity free2
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
            unoptimized={true}
            alt="Focuser Background"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        {/* <p className="text-red-500">5000</p> */}

        {/* <button onClick={() => signOut()}>Sign out</button> */}
        <div className="max-w-screen-xl mx-auto mt-10 px-2 xs:px-0">
          <h2 className="text-3xl franger">Pomodoro Timer boost your productivity</h2>
          <p className="indent-12 my-5">Focuser is a customizable Pomodoro timer to help you stay focused in small chunks of your work, like studying, coding and writing. With an interactive user interface using the principles of the Pomodoro Technique, this app will enable you to personalize your workflow and break down tasks into smaller segments with breaks in between to maximize focus levels throughout your workday. Features include customizing task length and break intervals as well as providing notifications when it&apos;s time for a break or to switch tasks.</p>
          <p className="text-lg franger">Features:</p>
          <ul className="">
            <li>- Customize the timing of your work (pomodoro) and break intervals</li>
            <li>- Pause button during work mode</li>
            <li>- Built-in alarm setting to remind when you should take a break or start working</li>
          </ul>
          <p className="text-lg franger">Benefits:</p>
          <ul className="">
            <li>- Increase your productivity by breaking down large tasks into manageable chunks</li>
            <li>- Know exactly how long you have been working/ taking a break for at any given moment</li>
            <li>- Help with increasing focus and productivity while doing any task</li>
          </ul>
          <h2 className="text-3xl franger mt-5">Featured</h2>
        </div>
      </div>
    </Layout>
  );
}

// Description:  Pomofocus is an easy-to-use, customizable pomodoro timer that works on desktop & mobile browser. With its unique features such as customization of working and break time interval, ability to pause the timer during work mode, and built-in alarm to notify when you should take a break or start working, Pomofocus helps you be more productive and focus on any task you are working on - whether it's studying for school, writing a book or coding. Inspired by Pomodoro Technique, which is a time management method developed by Francesco Cirillo, Pomofocus helps increase concentration levels and encourages the users to take frequent breaks thus allowing them to stay productive throughout their tasks.
// Features:
// - Customize the timing of your work (pomodoro) and break intervals
// - Pause button during work mode
// - Built-in alarm setting to remind when you should take a break or start working      
// Benefits: 
// -Help with increasing focus and productivity while doing any task 
// - Set specific intervals for work time vs. break time according to your needs 
// - Know exactly how long you have been working/ taking a break for at any given moment

// Product Description: Pomofocus is a customizable Pomodoro timer to help you stay focused in small chunks of your work, like studying, coding and writing. With an interactive user interface using the principles of the Pomodoro Technique, this app will enable you to personalize your workflow and break down tasks into smaller segments with breaks in between to maximize focus levels throughout your workday. Features include customizing task length and break intervals as well as providing notifications when it's time for a break or to switch tasks. 
// Benefits: 
// - Increase your productivity by breaking down large tasks into manageable chunks 
// - Optimize focus levels during a long day of work 
// - Customizable timer settings to suit your needs 
// - Easily monitor progress with countdown timer