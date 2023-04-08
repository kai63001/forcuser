import Input from '@/components/libs/Input'
import { Divider } from '@/components/profile/Divider'
import Layout from '@/components/profile/Layout'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import type { ChangeEvent, FC } from 'react'

export type Theme = 'dark' | 'light' | 'auto'

const Profile: FC = () => {
  const { data: session }: any = useSession()
  const userImageDropdown: any = useRef(null)
  const [isRename, setIsRename] = useState(false)
  const [Name, setName] = useState('')
  const [isChangeEmail, setIsChangeEmail] = useState(false)
  const [Email, setEmail] = useState('')
  const fileInput: any = useRef(null)
  const [theme, setTheme] = useState<Theme>('light')

  const renderNameButton = (isRename: boolean) => {
    switch (isRename) {
      case true:
        return <button
          onClick={() => {
            setIsRename(false)
          }}
          className="bg-green1 text-white px-5 py-2 rounded-md"
        >
          Submit
        </button>

      case false:
        return <button
          onClick={() => {
            setIsRename(true)
          }}
          className="bg-green1 text-white px-5 py-2 rounded-md"
        >
          Edit
        </button>
    }
  }
  const renderEmailButton = (isRename: boolean) => {
    switch (isRename) {
      case true:
        return <button
          onClick={() => {
            setIsChangeEmail(false)
          }}
          className="bg-green1 text-white px-5 py-2 rounded-md"
        >
          Submit
        </button>

      case false:
        return <button
          onClick={() => {
            setIsChangeEmail(true)
          }}
          className="bg-green1 text-white px-5 py-2 rounded-md"
        >
          Edit
        </button>
    }
  }

  useEffect(() => {
    const themeFromStorage = localStorage.getItem('theme')
    themeFromStorage !== null && setTheme(themeFromStorage as Theme)
  }, [])

  const handleRenameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }
  const handleChangeEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleTheme = (theme: Theme) => {
    setTheme(theme)
    localStorage.setItem('theme', theme)
  }
  return (
    <Layout title="Profile">
      <div className="md:w-[70%]">
        <div className="text-[20px] text-[#52525B]">Your account</div>
        <div className="mt-[32px] flex items-center justify-between">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center cursor-pointer rounded-full"
              ref={userImageDropdown}
            >
              <Image
                unoptimized
                src={session?.user?.image || '/icon/man.png'}
                alt="Picture of the author"
                width={80}
                height={80}
                className="object-cover rounded-full"
              />
            </div>
            <div className="ml-8">
              <div className="text-[700] text-[20px]">
                Upload your profile photo
              </div>
              <div className="text-[700] text-[16px]">
                This helps your teammates recognize you in Focusify.
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              fileInput.current.click()
            }}
            className="bg-green1 text-white px-5 py-2 rounded-md"
          >
            Upload photo
          </button>
          <input
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              console.log(e.target.files)
            }}
            ref={fileInput} type="file" className="hidden" />
        </div>
        <div className='mt-8 mb-4 text-[20px] text-[700]'>Name</div>
        <div className='mb-8 flex justify-between items-center'>
          {isRename
            ? <Input name='Name' onChange={handleRenameInput} type='text' placeholder={Name !== '' ? Name : 'Tosakan_911'} />
            : <div>{Name !== '' ? Name : 'Tosakaan_911'}</div>}
          {renderNameButton(isRename)}
        </div>
        <Divider />
        <div className='mt-8 mb-4 text-[20px] text-[700]'>Email address</div>
        <div className='mb-8 flex justify-between items-center'>
          {isChangeEmail
            ? <div className='w-4/12'>
              <Input name={'Email'} type="text" onChange={handleChangeEmailInput}
                placeholder={Email !== '' ? Email : 'Tosakan_prp_4418@hotmail.com'} />
            </div>
            : <div>{Email !== '' ? Email : 'Tosakan_prp_4418@hotmail.com'}</div>}
          {renderEmailButton(isChangeEmail)}
        </div>
        <Divider />
        <div className='mt-8 mb-4 text-[20px] text-[700]'>Theme Saved</div>
        <div>{'Customize Your UI theme.'}</div>
        <div className='flex gap-[10%] mt-8 pb-8'>
          {/* light */}
          <div onClick={() => { handleTheme('light') }} className='cursor-pointer'>
            <div className={theme === 'light' ? 'outline-red-600 border-green1 border-solid border-[3px] rounded-[12px] relative' : ''}>
              <svg width="200" height="143" viewBox="0 0 200 143" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="200" height="142.941" rx="9.41177" fill="#1F2123" />
                <path d="M0 9.41174C0 4.21377 4.21379 0 9.41177 0H75.8824V142.941H9.41177C4.2138 142.941 0 138.727 0 133.529V9.41174Z" fill="#2C2C2E" />
                <circle cx="15.8825" cy="20.5883" r="5.29412" fill="#6C6E6F" />
                <rect x="27.647" y="17.353" width="37.6471" height="6.47059" rx="3.23529" fill="#4B4A4D" />
                <rect x="10.5884" y="41.1765" width="54.7059" height="5.29412" rx="2.64706" fill="#4B4A4D" />
                <rect x="10.5884" y="50.5881" width="40" height="5.29412" rx="2.64706" fill="#4B4A4D" />
                <rect x="10.5884" y="71.1765" width="40" height="5.29412" rx="2.64706" fill="#4B4A4D" />
                <rect x="10.5884" y="80.5881" width="54.7059" height="5.29412" rx="2.64706" fill="#4B4A4D" />
                <rect x="10.5884" y="90" width="54.7059" height="5.29412" rx="2.64706" fill="#4B4A4D" />
                <rect x="10.5884" y="99.4119" width="40" height="5.29412" rx="2.64706" fill="#4B4A4D" />
                <circle cx="99.4118" cy="22.353" r="7.05882" fill="#6C6E6F" />
                <rect x="92.353" y="34.7058" width="49.4118" height="6.47059" rx="3.23529" fill="#494B4D" />
                <circle cx="95.2942" cy="53.5293" r="2.94118" fill="#3C3E40" />
                <rect x="102.353" y="50.8823" width="72.9412" height="5.29412" rx="2.64706" fill="#494B4D" />
                <circle cx="95.2942" cy="62.9412" r="2.94118" fill="#3C3E40" />
                <rect x="102.353" y="60.5881" width="79.4118" height="5.29412" rx="2.64706" fill="#494B4D" />
                <circle cx="95.2942" cy="72.353" r="2.94118" fill="#3C3E40" />
                <rect x="102.353" y="69.4119" width="79.4118" height="5.29412" rx="2.64706" fill="#494B4D" />
                <circle cx="95.2942" cy="81.7647" r="2.94118" fill="#3C3E40" />
                <rect x="102.353" y="79.1177" width="72.9412" height="5.29412" rx="2.64706" fill="#494B4D" />
                <circle cx="95.2942" cy="97.0589" r="2.94118" fill="#3C3E40" />
                <rect x="102.353" y="94.4119" width="72.9412" height="5.29412" rx="2.64706" fill="#494B4D" />
                <circle cx="95.2942" cy="106.47" r="2.94118" fill="#3C3E40" />
                <rect x="102.353" y="104.118" width="79.4118" height="5.29412" rx="2.64706" fill="#494B4D" />
                <circle cx="95.2942" cy="115.882" r="2.94118" fill="#3C3E40" />
                <rect x="102.353" y="112.941" width="79.4118" height="5.29412" rx="2.64706" fill="#494B4D" />
                <circle cx="95.2942" cy="125.294" r="2.94118" fill="#3C3E40" />
                <rect x="102.353" y="122.647" width="72.9412" height="5.29412" rx="2.64706" fill="#494B4D" />
              </svg>
              {theme === 'light' && <div className='absolute bottom-2 right-2'>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.39375 10.9125L11.7 5.60625L10.8375 4.7625L6.39375 9.20625L4.14375 6.95625L3.3 7.8L6.39375 10.9125ZM7.5 15C6.475 15 5.50625 14.8031 4.59375 14.4094C3.68125 14.0156 2.88437 13.4781 2.20312 12.7969C1.52187 12.1156 0.984375 11.3187 0.590625 10.4062C0.196875 9.49375 0 8.525 0 7.5C0 6.4625 0.196875 5.4875 0.590625 4.575C0.984375 3.6625 1.52187 2.86875 2.20312 2.19375C2.88437 1.51875 3.68125 0.984375 4.59375 0.590625C5.50625 0.196875 6.475 0 7.5 0C8.5375 0 9.5125 0.196875 10.425 0.590625C11.3375 0.984375 12.1312 1.51875 12.8062 2.19375C13.4812 2.86875 14.0156 3.6625 14.4094 4.575C14.8031 5.4875 15 6.4625 15 7.5C15 8.525 14.8031 9.49375 14.4094 10.4062C14.0156 11.3187 13.4812 12.1156 12.8062 12.7969C12.1312 13.4781 11.3375 14.0156 10.425 14.4094C9.5125 14.8031 8.5375 15 7.5 15Z" fill="#00C1A2" />
                </svg>
              </div>}

            </div>
            <div className='flex justify-center'>Light</div>
          </div>
          {/* black */}
          <div onClick={() => { handleTheme('dark') }} className='cursor-pointer'>
            <div className={theme === 'dark' ? 'outline-red-600 border-green1 border-solid border-[3px] rounded-[12px] relative' : ''}>
              <svg width="200" height="143" viewBox="0 0 200 143" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="200" height="142.941" rx="9.41177" fill="#1F2123" />
                <path d="M0 9.41174C0 4.21377 4.21379 0 9.41177 0H75.8824V142.941H9.41177C4.2138 142.941 0 138.727 0 133.529V9.41174Z" fill="#2C2C2E" />
                <circle cx="15.8825" cy="20.5883" r="5.29412" fill="#6C6E6F" />
                <rect x="27.647" y="17.353" width="37.6471" height="6.47059" rx="3.23529" fill="#4B4A4D" />
                <rect x="10.5884" y="41.1765" width="54.7059" height="5.29412" rx="2.64706" fill="#4B4A4D" />
                <rect x="10.5884" y="50.5881" width="40" height="5.29412" rx="2.64706" fill="#4B4A4D" />
                <rect x="10.5884" y="71.1765" width="40" height="5.29412" rx="2.64706" fill="#4B4A4D" />
                <rect x="10.5884" y="80.5881" width="54.7059" height="5.29412" rx="2.64706" fill="#4B4A4D" />
                <rect x="10.5884" y="90" width="54.7059" height="5.29412" rx="2.64706" fill="#4B4A4D" />
                <rect x="10.5884" y="99.4119" width="40" height="5.29412" rx="2.64706" fill="#4B4A4D" />
                <circle cx="99.4118" cy="22.353" r="7.05882" fill="#6C6E6F" />
                <rect x="92.353" y="34.7058" width="49.4118" height="6.47059" rx="3.23529" fill="#494B4D" />
                <circle cx="95.2942" cy="53.5293" r="2.94118" fill="#3C3E40" />
                <rect x="102.353" y="50.8823" width="72.9412" height="5.29412" rx="2.64706" fill="#494B4D" />
                <circle cx="95.2942" cy="62.9412" r="2.94118" fill="#3C3E40" />
                <rect x="102.353" y="60.5881" width="79.4118" height="5.29412" rx="2.64706" fill="#494B4D" />
                <circle cx="95.2942" cy="72.353" r="2.94118" fill="#3C3E40" />
                <rect x="102.353" y="69.4119" width="79.4118" height="5.29412" rx="2.64706" fill="#494B4D" />
                <circle cx="95.2942" cy="81.7647" r="2.94118" fill="#3C3E40" />
                <rect x="102.353" y="79.1177" width="72.9412" height="5.29412" rx="2.64706" fill="#494B4D" />
                <circle cx="95.2942" cy="97.0589" r="2.94118" fill="#3C3E40" />
                <rect x="102.353" y="94.4119" width="72.9412" height="5.29412" rx="2.64706" fill="#494B4D" />
                <circle cx="95.2942" cy="106.47" r="2.94118" fill="#3C3E40" />
                <rect x="102.353" y="104.118" width="79.4118" height="5.29412" rx="2.64706" fill="#494B4D" />
                <circle cx="95.2942" cy="115.882" r="2.94118" fill="#3C3E40" />
                <rect x="102.353" y="112.941" width="79.4118" height="5.29412" rx="2.64706" fill="#494B4D" />
                <circle cx="95.2942" cy="125.294" r="2.94118" fill="#3C3E40" />
                <rect x="102.353" y="122.647" width="72.9412" height="5.29412" rx="2.64706" fill="#494B4D" />
              </svg>
              {theme === 'dark' && <div className='absolute bottom-2 right-2'>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.39375 10.9125L11.7 5.60625L10.8375 4.7625L6.39375 9.20625L4.14375 6.95625L3.3 7.8L6.39375 10.9125ZM7.5 15C6.475 15 5.50625 14.8031 4.59375 14.4094C3.68125 14.0156 2.88437 13.4781 2.20312 12.7969C1.52187 12.1156 0.984375 11.3187 0.590625 10.4062C0.196875 9.49375 0 8.525 0 7.5C0 6.4625 0.196875 5.4875 0.590625 4.575C0.984375 3.6625 1.52187 2.86875 2.20312 2.19375C2.88437 1.51875 3.68125 0.984375 4.59375 0.590625C5.50625 0.196875 6.475 0 7.5 0C8.5375 0 9.5125 0.196875 10.425 0.590625C11.3375 0.984375 12.1312 1.51875 12.8062 2.19375C13.4812 2.86875 14.0156 3.6625 14.4094 4.575C14.8031 5.4875 15 6.4625 15 7.5C15 8.525 14.8031 9.49375 14.4094 10.4062C14.0156 11.3187 13.4812 12.1156 12.8062 12.7969C12.1312 13.4781 11.3375 14.0156 10.425 14.4094C9.5125 14.8031 8.5375 15 7.5 15Z" fill="#00C1A2" />
                </svg>
              </div>}
            </div>
            <div className='flex justify-center'>Dark</div>
          </div>
          {/* auto */}
          <div onClick={() => { handleTheme('auto') }} className='cursor-pointer'>
            <div className={theme === 'auto' ? 'outline-red-600 border-green1 border-solid border-[3px] rounded-[12px] relative' : ''} >
              <svg width="201" height="143" viewBox="0 0 201 143" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.0751953" width="185.018" height="142.941" rx="9.41177" fill="white" />
                <path d="M9.41177 1.5H68.7729V141.5H9.41176C4.48993 141.5 0.5 137.51 0.5 132.588V10.4118C0.5 5.48993 4.48993 1.5 9.41177 1.5Z" fill="#F3F3F3" stroke="#D9D9D9" />
                <circle cx="14.9601" cy="21.3808" r="5.29412" fill="#ADADB0" />
                <rect x="26.7246" y="18.1455" width="37.6471" height="6.47059" rx="3.23529" fill="#D0D0D2" />
                <rect x="9.66602" y="41.969" width="54.7059" height="5.29412" rx="2.64706" fill="#D0D0D2" />
                <rect x="9.66602" y="51.3806" width="40" height="5.29412" rx="2.64706" fill="#D0D0D2" />
                <rect x="9.66602" y="71.969" width="40" height="5.29412" rx="2.64706" fill="#D0D0D2" />
                <rect x="9.66602" y="81.3806" width="54.7059" height="5.29412" rx="2.64706" fill="#D0D0D2" />
                <rect x="9.66602" y="90.7925" width="54.7059" height="5.29412" rx="2.64706" fill="#D0D0D2" />
                <rect x="9.66602" y="100.204" width="40" height="5.29412" rx="2.64706" fill="#D0D0D2" />
                <circle cx="92.5691" cy="22.353" r="7.05882" fill="#ADADB0" />
                <rect x="85.5103" y="34.7058" width="49.4118" height="6.47059" rx="3.23529" fill="#D0D0D2" />
                <circle cx="88.4514" cy="53.5293" r="2.94118" fill="#ADADB0" />
                <rect x="95.5103" y="50.8823" width="72.9412" height="5.29412" rx="2.64706" fill="#D0D0D2" />
                <circle cx="88.4514" cy="62.9412" r="2.94118" fill="#ADADB0" />
                <rect x="95.5103" y="60.5881" width="79.4118" height="5.29412" rx="2.64706" fill="#D0D0D2" />
                <circle cx="88.4514" cy="72.353" r="2.94118" fill="#ADADB0" />
                <rect x="95.5103" y="69.4119" width="79.4118" height="5.29412" rx="2.64706" fill="#D0D0D2" />
                <circle cx="88.4514" cy="81.7647" r="2.94118" fill="#ADADB0" />
                <rect x="95.5103" y="79.1177" width="72.9412" height="5.29412" rx="2.64706" fill="#D0D0D2" />
                <circle cx="88.4514" cy="97.0589" r="2.94118" fill="#ADADB0" />
                <rect x="95.5103" y="94.4119" width="72.9412" height="5.29412" rx="2.64706" fill="#D0D0D2" />
                <circle cx="88.4514" cy="106.47" r="2.94118" fill="#ADADB0" />
                <rect x="95.5103" y="104.118" width="79.4118" height="5.29412" rx="2.64706" fill="#D0D0D2" />
                <circle cx="88.4514" cy="115.882" r="2.94118" fill="#ADADB0" />
                <rect x="95.5103" y="112.941" width="79.4118" height="5.29412" rx="2.64706" fill="#D0D0D2" />
                <circle cx="88.4514" cy="125.294" r="2.94118" fill="#ADADB0" />
                <rect x="95.5103" y="122.647" width="72.9412" height="5.29412" rx="2.64706" fill="#D0D0D2" />
                <rect x="51" width="149" height="143" rx="9.41177" fill="#1F2123" />
                <path d="M51.0752 9.41174C51.0752 4.21377 55.289 0 60.487 0H104.209V142.941H60.487C55.289 142.941 51.0752 138.727 51.0752 133.529V9.41174Z" fill="#2C2C2E" />
                <circle cx="63.7829" cy="20.5883" r="5.29412" fill="#6C6E6F" />
                <rect x="75.5474" y="17.0884" width="23" height="7" rx="3.5" fill="#4B4A4D" />
                <rect x="58.4888" y="41.1765" width="40" height="5" rx="2.5" fill="#4B4A4D" />
                <rect x="58.4888" y="50.2942" width="35" height="6" rx="3" fill="#4B4A4D" />
                <rect x="58.4888" y="71.5884" width="35" height="5" rx="2.5" fill="#4B4A4D" />
                <rect x="58.4888" y="80.7061" width="40" height="5" rx="2.5" fill="#4B4A4D" />
                <rect x="58.4888" y="89.8237" width="40" height="6" rx="3" fill="#4B4A4D" />
                <rect x="58.4888" y="99.9414" width="35" height="5" rx="2.5" fill="#4B4A4D" />
                <circle cx="126.18" cy="22.353" r="7.05882" fill="#6C6E6F" />
                <rect x="119.122" y="34.7061" width="36" height="6.47059" rx="3.23529" fill="#494B4D" />
                <circle cx="122.063" cy="53.5296" r="2.94118" fill="#3C3E40" />
                <rect x="129.122" y="51.0295" width="48" height="5" rx="2.5" fill="#494B4D" />
                <circle cx="122.063" cy="62.9414" r="2.94118" fill="#3C3E40" />
                <rect x="129.122" y="60.5884" width="55" height="5.29412" rx="2.64706" fill="#494B4D" />
                <circle cx="122.063" cy="72.353" r="2.94118" fill="#3C3E40" />
                <rect x="129.122" y="69.4119" width="55" height="5.29412" rx="2.64706" fill="#494B4D" />
                <circle cx="122.063" cy="81.7649" r="2.94118" fill="#3C3E40" />
                <rect x="129.122" y="79.2649" width="47" height="5" rx="2.5" fill="#494B4D" />
                <circle cx="122.063" cy="97.0589" r="2.94118" fill="#3C3E40" />
                <rect x="129.122" y="94.4119" width="55" height="5.29412" rx="2.64706" fill="#494B4D" />
                <circle cx="122.063" cy="106.471" r="2.94118" fill="#3C3E40" />
                <rect x="129.122" y="104.118" width="47" height="5.29412" rx="2.64706" fill="#494B4D" />
                <circle cx="122.063" cy="115.882" r="2.94118" fill="#3C3E40" />
                <rect x="129.122" y="112.941" width="55" height="5.29412" rx="2.64706" fill="#494B4D" />
                <circle cx="122.063" cy="125.294" r="2.94118" fill="#3C3E40" />
                <rect x="129.122" y="122.794" width="44" height="5" rx="2.5" fill="#494B4D" />
              </svg>
              {theme === 'auto' && <div className='absolute bottom-2 right-2'>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.39375 10.9125L11.7 5.60625L10.8375 4.7625L6.39375 9.20625L4.14375 6.95625L3.3 7.8L6.39375 10.9125ZM7.5 15C6.475 15 5.50625 14.8031 4.59375 14.4094C3.68125 14.0156 2.88437 13.4781 2.20312 12.7969C1.52187 12.1156 0.984375 11.3187 0.590625 10.4062C0.196875 9.49375 0 8.525 0 7.5C0 6.4625 0.196875 5.4875 0.590625 4.575C0.984375 3.6625 1.52187 2.86875 2.20312 2.19375C2.88437 1.51875 3.68125 0.984375 4.59375 0.590625C5.50625 0.196875 6.475 0 7.5 0C8.5375 0 9.5125 0.196875 10.425 0.590625C11.3375 0.984375 12.1312 1.51875 12.8062 2.19375C13.4812 2.86875 14.0156 3.6625 14.4094 4.575C14.8031 5.4875 15 6.4625 15 7.5C15 8.525 14.8031 9.49375 14.4094 10.4062C14.0156 11.3187 13.4812 12.1156 12.8062 12.7969C12.1312 13.4781 11.3375 14.0156 10.425 14.4094C9.5125 14.8031 8.5375 15 7.5 15Z" fill="#00C1A2" />
                </svg>
              </div>}
            </div>
            <div className='flex justify-center'>Auto</div>
          </div>

        </div >
      </div >
    </Layout >
  )
}
export default Profile
