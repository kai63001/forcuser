import LayoutIndex from '@/components/LayoutIndex'
import { Divider } from '@/components/profile/Divider'
import Image from 'next/image'
import Link from 'next/link'

// eslint-disable-next-line @typescript-eslint/space-before-function-paren
export default function Home() {
  const preventDragHandler = (e: any) => {
    e.preventDefault()
  }
  return (
    <LayoutIndex>
      <div className="h-screen">
        <div className="relative h-5/6 block" onDragStart={preventDragHandler}>
          <div id="cover" className="absolute z-10">
            {/* icon */}
          </div>
          <div
            id="cover"
            className="absolute z-20 right-0 text-white mr-5 mt-5 flex gap-4"
          >
            <Link href="/auth/login" className="text-lg border-white border-solid border-2 rounded-lg px-4 py-2 hover:bg-white hover:text-black duration-200">
              Login
            </Link>
            <Link href="/auth/login" className="text-lg bg-green1 border-green1 border-solid border-2 rounded-lg px-4 py-2 hover:bg-green1 hover:text-black duration-200">
              Login
            </Link>
          </div>
          {/* position absolute middle of center */}
          <div className="absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex flex-col items-center">
              <h1 className="text-8xl franger text-white">Focusify</h1>
              <p className="text-white mt-5">
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
            src="https://i.pinimg.com/originals/cb/80/50/cb8050ca365c64ad71c3e0fe030499e0.gif"
            unoptimized={true}
            alt="Focusify Background"
            fill
            style={{ objectFit: 'cover' }}
          />
          {/* <video className="absolute  top-0 left-0 w-full h-full object-cover" autoPlay loop muted>
            <source src={`https://static.wallpaperwaifu.com/videos/preview/2022/howl-and-sophie-howls-moving-castle-preview.mp4`} type="video/mp4" />
          </video> */}
        </div>
        <div className='mx-[5%] md:mx-[25%] flex flex-col items-center'>
          <div className="mt-16 text-green1 text-3xl ">Pomodoro Timer boost your productivity</div>
          <div className='mt-7 font-light'>Focusify is a customizable Pomodoro timer to help you stay focused in small chunks of your work, like studying, coding and writing. With an interactive user interface using the principles of the Pomodoro Technique, this app will enable you to personalize your workflow and break down tasks into smaller segments with breaks in between to maximize focus levels throughout your workday. Features include customizing task length and break intervals as well as providing notifications when it&apos;s time for a break or to switch tasks.</div>
          <div className='mt-16'>
            <Image
              unoptimized
              src={'/icon/business-people.png'}
              alt="business people icon"
              width={500}
              height={300}
              className="object-cover rounded-full"
            />
          </div>
          <div className="mt-16 text-green1 text-3xl">What is the Pomodoro Technique?</div>
          <div className='mt-7 font-light'>
            The Pomodoro Technique is a productivity practice designed to draw your full attention to your current task and get it done in the fastest and most creative way possible.
            <br /><br />
            he word Pomodoro means tomato from Italian. Francesco Cirillo, who developed this technique in the 1980s, uses a tomato timer to divide his work into 25-minute intervals.
          </div>
          <div className="mt-16 sm:flex sm:flex-col md:grid md:grid-cols-[1fr_1fr] w-full">
            <div>
              <div className="text-green1 text-3xl">Features</div>
              <div className='ml-3 mt-7 font-light flex flex-col gap-4'>
                <li>Customize the timing of your work (pomodoro) and break intervals</li>
                <li> Pause button during work mode</li>
                <li>Built-in alarm setting to remind when you should take a break or start working</li>
              </div>
            </div>
            <div className='flex justify-center'>
              <Image
                unoptimized
                src={'/icon/business-people.png'}
                alt="business people icon"
                width={450}
                height={250}
                className="object-cover rounded-full"
              />
            </div>
          </div>
          <div className="mt-16 sm:flex sm:flex-col md:grid md:grid-cols-[1fr_1fr] w-full">
            <div className='flex justify-center'>
              <Image
                unoptimized
                src={'/icon/business-people.png'}
                alt="business people icon"
                width={450}
                height={250}
                className="object-cover rounded-full"
              />
            </div>
            <div>
              <div className="text-green1 text-3xl">Benefits</div>
              <div className='ml-3 mt-7 font-light flex flex-col gap-4'>
                <li>Increase your productivity by breaking down large tasks into manageable chunks</li>
                <li> Know exactly how long you have been working/ taking a break for at any given moment</li>
                <li>Help with increasing focus and productivity while doing any task</li>
              </div>
            </div>
          </div>
          <div className="mt-16 sm:flex sm:flex-col md:grid md:grid-cols-[1fr_1fr] w-full">
            <div>
              <div className="text-green1 text-3xl">Premium Features</div>
              <div className='ml-3 mt-7 font-light flex flex-col gap-4'>
                <li>Customize the timing of your work (pomodoro) and break intervals</li>
                <li> Pause button during work mode</li>
                <li>Built-in alarm setting to remind when you should take a break or start working</li>
              </div>
            </div>
            <div className='flex justify-center'>
              <Image
                unoptimized
                src={'/icon/business-people.png'}
                alt="business people icon"
                width={450}
                height={250}
                className="object-cover rounded-full"
              />
            </div>
          </div>
          <div className='w-full mt-16 mb-8 text-center'>
            <div className="text-green1 text-3xl">Try Focuser Pro Free</div>
            <div className='flex flex-col items-center'>
              <div className='flex gap-2 mt-6 w-[360px]'>
                <Image
                  unoptimized
                  src={'/icon/check-icon.png'}
                  alt="business people icon"
                  width={20}
                  height={20}
                  className="object-cover rounded-full"
                />
                <div className='font-light'>Free 7 Day trial, cancel any time.</div>
              </div>
              <div className='flex gap-2 mt-6 w-[360px]'>
                <Image
                  unoptimized
                  src={'/icon/check-icon.png'}
                  alt="business people icon"
                  width={20}
                  height={20}
                  className="object-cover rounded-full"
                />
                <div className='font-light'>We&apos;ll remind you before your trial ends.</div>

              </div>
              <button
                className="mt-8 bg-main text-white px-5 py-2 rounded-md"
                onClick={() => {
                  console.log('test')
                }}
              >
                Create a Focus
              </button>
            </div>
          </div>
        </div>
        <div className='my-8 w-full'><Divider /></div>
        <div className='flex gap-8 justify-center'>
          <div className='text-yellow1 hover:underline cursor-pointer'>Home</div>
          <div className='text-yellow1 hover:underline cursor-pointer'>Privacy</div>
          <div className='text-yellow1 hover:underline cursor-pointer'>Feed back</div>
          <div className='text-yellow1 hover:underline cursor-pointer'>Contact</div>
        </div>
        <div className='flex gap-7 mt-8 justify-center'>
          <div className='cursor-pointer'>
            <Image
              unoptimized
              src={'/icon/facebook.png'}
              alt="facebook icon"
              width={35}
              height={35}
              className="object-cover rounded-full"
            />
          </div>
          <div className='cursor-pointer'>
            <Image
              unoptimized
              src={'/icon/instagram.png'}
              alt="instagram icon"
              width={35}
              height={35}
              className="object-cover rounded-full"
            />
          </div>
        </div>
        <div className='flex mt-4 mb-8 font-light justify-center'>©Focuser 2023. All Rights Reserved.</div>
      </div>
    </LayoutIndex>
  )
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
