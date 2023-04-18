import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

interface HomeCardInterface {
  image: string
  id: string
}

const HomeCard = (props: HomeCardInterface) => {
  const [isOpen, setIsOpen] = useState(false)

  const openDropdown = (e: any) => {
    e.preventDefault()
    setIsOpen(!isOpen)
  }

  const dropdown: any = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdown.current && !dropdown.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdown])
  return (
    <Link href={`/focus/${props.id}`}>
      <div className=" rounded-md group cursor-pointer">
        <div className="relative w-full h-[170px] shadow-md">
          <Image
            src={`${
              props.image
                ? `${process.env.NEXT_PUBLIC_S3_ENDPOINT}${props.image}`
                : '/screenshot/demo.png'
            }`}
            alt="Picture of the author"
            fill
            unoptimized={true}
            className="rounded-md"
          />
          <div
            className={`absolute right-1 top-1 z-20 opacity-0 group-hover:opacity-100 duration-200 ${
              isOpen && 'opacity-100'
            }`}
          >
            <div
              className={`${
                isOpen ? 'bg-main text-white' : 'bg-white'
              } hover:bg-main hover:text-white px-2 py-1 shadow-md rounded-md`}
              onClick={openDropdown}
            >
              <svg
                fill="currentColor"
                className=""
                height="17px"
                width="17px"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 32.055 32.055"
                xmlSpace="preserve"
              >
                <g>
                  <path d="M3.968,12.061C1.775,12.061,0,13.835,0,16.027c0,2.192,1.773,3.967,3.968,3.967c2.189,0,3.966-1.772,3.966-3.967 C7.934,13.835,6.157,12.061,3.968,12.061z M16.233,12.061c-2.188,0-3.968,1.773-3.968,3.965c0,2.192,1.778,3.967,3.968,3.967 s3.97-1.772,3.97-3.967C20.201,13.835,18.423,12.061,16.233,12.061z M28.09,12.061c-2.192,0-3.969,1.774-3.969,3.967 c0,2.19,1.774,3.965,3.969,3.965c2.188,0,3.965-1.772,3.965-3.965S30.278,12.061,28.09,12.061z" />{' '}
                </g>{' '}
              </svg>
            </div>
          </div>
          {isOpen && (
            <div
              ref={dropdown}
              onClick={(e) => { e.preventDefault() }}
              className="absolute right-1 top-8 bg-white py-1 rounded-md shadow-md"
            >
              <div className="flex flex-col space-y-2 w-52">
                <Link
                  href={`/dashboard/pomodoro/edit/${props.id}`}
                  className="cursor-pointer hover:bg-gray-200 px-2 py-1 text-sm"
                >
                  Edit
                </Link>
              </div>
            </div>
          )}
        </div>
        <p className="text-gray-800 mt-2">My Lofi Study</p>
      </div>
    </Link>
  )
}

export default HomeCard
