import Header from '@/components/HeaderIndex'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import type { FC } from 'react'
import dynamic from 'next/dynamic'

interface LayoutInterface {
  title?: string | undefined
  des?: string | undefined
  image?: string | undefined
  children?: any | undefined
}

const ModalCreatePomodoro = dynamic(
  async () => await import('../../components/dashboard/modal/createPomodoro')
)

const ProfileLayout: FC<LayoutInterface> = (props) => {
  const { data: session }: any = useSession()

  const [openModalCreate, setOpenModalCreate] = useState(false)

  const [openDropdown, setOpenDropdown] = useState(false)
  const dropdown: any = useRef(null)
  const userImageDropdown: any = useRef(null)

  const router = useRouter()

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        dropdown.current &&
        !dropdown.current.contains(event.target) &&
        userImageDropdown.current &&
        !userImageDropdown.current.contains(event.target)
      ) {
        setOpenDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdown])

  const logout = () => {
    signOut({ callbackUrl: '/auth/login', redirect: false }).catch((err) => {
      console.log(err)
    })
  }

  const listNavbar = [
    {
      name: 'Your account',
      link: '/profile',
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.8 15.6731C4.79872 14.9846 5.7923 14.451 6.78075 14.0721C7.76922 13.6933 8.84229 13.5038 9.99998 13.5038C11.1577 13.5038 12.2333 13.6933 13.2269 14.0721C14.2205 14.451 15.2166 14.9846 16.2154 15.6731C16.9423 14.8308 17.4823 13.9414 17.8355 13.0049C18.1887 12.0685 18.3654 11.0668 18.3654 9.99998C18.3654 7.64101 17.5609 5.65703 15.9519 4.04805C14.3429 2.43908 12.3589 1.6346 9.99998 1.6346C7.64101 1.6346 5.65703 2.43908 4.04805 4.04805C2.43908 5.65703 1.6346 7.64101 1.6346 9.99998C1.6346 11.0668 1.81377 12.0685 2.1721 13.0049C2.53043 13.9414 3.07307 14.8308 3.8 15.6731ZM9.99455 10.5673C9.0956 10.5673 8.3394 10.2587 7.72595 9.64165C7.11248 9.02458 6.80575 8.26658 6.80575 7.36763C6.80575 6.46869 7.11429 5.71249 7.73138 5.09903C8.34844 4.48558 9.10645 4.17885 10.0054 4.17885C10.9044 4.17885 11.6606 4.48738 12.274 5.10445C12.8875 5.72152 13.1942 6.47953 13.1942 7.37848C13.1942 8.27743 12.8857 9.03362 12.2686 9.64707C11.6515 10.2605 10.8935 10.5673 9.99455 10.5673ZM10.0117 19.5C8.69491 19.5 7.45956 19.2519 6.30563 18.7557C5.15171 18.2596 4.1437 17.5798 3.2816 16.7163C2.41952 15.8528 1.7404 14.8468 1.24425 13.6981C0.748083 12.5495 0.5 11.3161 0.5 9.99813C0.5 8.68013 0.748083 7.44742 1.24425 6.3C1.7404 5.15257 2.4202 4.14712 3.28365 3.28365C4.14712 2.4202 5.15318 1.7404 6.30183 1.24425C7.45049 0.748083 8.68383 0.5 10.0018 0.5C11.3198 0.5 12.5525 0.748083 13.7 1.24425C14.8474 1.7404 15.8528 2.4202 16.7163 3.28365C17.5798 4.14712 18.2596 5.15283 18.7557 6.3008C19.2519 7.44877 19.5 8.67793 19.5 9.98828C19.5 11.305 19.2519 12.5404 18.7557 13.6943C18.2596 14.8482 17.5798 15.8563 16.7163 16.7184C15.8528 17.5804 14.8471 18.2596 13.6992 18.7557C12.5512 19.2519 11.322 19.5 10.0117 19.5ZM9.99998 18.3654C10.9295 18.3654 11.8461 18.2176 12.75 17.9221C13.6538 17.6266 14.5051 17.1487 15.3038 16.4884C14.5051 15.9012 13.6593 15.4461 12.7663 15.123C11.8734 14.8 10.9513 14.6384 9.99998 14.6384C9.04869 14.6384 8.12498 14.7984 7.22883 15.1182C6.33266 15.4381 5.49163 15.8948 4.70575 16.4884C5.49805 17.1487 6.34613 17.6266 7.24998 17.9221C8.15383 18.2176 9.07049 18.3654 9.99998 18.3654ZM10.0013 9.43268C10.5991 9.43268 11.0916 9.23864 11.4788 8.85058C11.866 8.46249 12.0596 7.96954 12.0596 7.37173C12.0596 6.77389 11.8656 6.28138 11.4775 5.8942C11.0894 5.50702 10.5965 5.31343 9.99863 5.31343C9.40081 5.31343 8.90831 5.50747 8.52113 5.89555C8.13394 6.28362 7.94035 6.77657 7.94035 7.3744C7.94035 7.97222 8.13439 8.46472 8.52248 8.8519C8.91054 9.23908 9.40349 9.43268 10.0013 9.43268Z"
            fill={router.asPath === '/profile' ? 'white' : 'grey'}
          />
        </svg>
      )
    },
    {
      name: 'Login & security',
      link: '/profile/security',
      icon: (
        <svg
          width="16"
          height="20"
          viewBox="0 0 16 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.94232 19.4999C1.54906 19.4999 1.21035 19.3578 0.9262 19.0737C0.642066 18.7896 0.5 18.4508 0.5 18.0576V8.0538C0.5 7.65557 0.642066 7.31563 0.9262 7.03398C1.21035 6.75233 1.54906 6.6115 1.94232 6.6115H3.6827V4.31727C3.6827 3.11911 4.10302 2.10003 4.94367 1.26003C5.78432 0.420008 6.80419 0 8.00327 0C9.20234 0 10.2211 0.420008 11.0596 1.26003C11.898 2.10003 12.3172 3.11911 12.3172 4.31727V6.6115H14.0576C14.4509 6.6115 14.7896 6.75233 15.0737 7.03398C15.3579 7.31563 15.5 7.65557 15.5 8.0538V18.0576C15.5 18.4508 15.3579 18.7896 15.0737 19.0737C14.7896 19.3578 14.4509 19.4999 14.0576 19.4999H1.94232ZM1.94232 18.3653H14.0576C14.1474 18.3653 14.2211 18.3365 14.2788 18.2788C14.3365 18.2211 14.3654 18.1473 14.3654 18.0576V8.0538C14.3654 7.96405 14.3365 7.89032 14.2788 7.83262C14.2211 7.77492 14.1474 7.74608 14.0576 7.74608H1.94232C1.85257 7.74608 1.77885 7.77492 1.72115 7.83262C1.66345 7.89032 1.6346 7.96405 1.6346 8.0538V18.0576C1.6346 18.1473 1.66345 18.2211 1.72115 18.2788C1.77885 18.3365 1.85257 18.3653 1.94232 18.3653ZM8.00417 14.7499C8.47061 14.7499 8.86888 14.5871 9.199 14.2616C9.52913 13.9361 9.6942 13.5444 9.6942 13.0865C9.6942 12.6442 9.52773 12.2461 9.1948 11.8923C8.86187 11.5384 8.46219 11.3615 7.99577 11.3615C7.52934 11.3615 7.13107 11.5384 6.80095 11.8923C6.47082 12.2461 6.30575 12.6483 6.30575 13.099C6.30575 13.5496 6.47222 13.9374 6.80515 14.2624C7.13808 14.5874 7.53776 14.7499 8.00417 14.7499ZM4.8173 6.6115H11.1827V4.31727C11.1827 3.43319 10.8736 2.68173 10.2554 2.06288C9.63723 1.44401 8.88659 1.13457 8.00348 1.13457C7.12038 1.13457 6.36857 1.44401 5.74805 2.06288C5.12755 2.68173 4.8173 3.43319 4.8173 4.31727V6.6115Z"
            fill={router.asPath === '/profile/security' ? 'white' : 'grey'}
          />
        </svg>
      )
    }
  ]
  return (
    <>
      <Header title={props.title} des={props.des} image={props.image} />
      <div className="flex flex-item-fluid flex-nowrap bg-background">
        {openModalCreate && (
          <ModalCreatePomodoro setOpenModalCreate={setOpenModalCreate} />
        )}

        <aside aria-label="Sidebar">
          <div className="py-4 overflow-y-auto w-64 h-full bg-background fixed z-10 border-r-2">
            <div className="ml-5 text-2xl franger mb-4">Focusify</div>
            <ul className="space-y-2 px-5 mt-10">
              {listNavbar.map((item, index) => {
                return (
                  <li key={index}>
                    <a
                      href={item.link}
                      className={`flex items-center pl-5 py-3 text-base font-normal rounded-md ${router.asPath === item.link
                        ? 'text-white bg-green1'
                        : 'text-gray-500'
                        }`}
                    >
                      {item.icon}
                      <span className="ml-3">{item.name}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </aside>
        <main className="w-full">
          <div className="bg-background h-16 w-full fixed border-b-2 z-20">
            <div className="flex justify-between items-center h-full">
              <div className="ml-5 text-2xl franger">Focusify</div>
              <div className="mr-5 flex space-x-7">
                <div className="flex items-center">
                  <svg
                    width="14"
                    height="16"
                    viewBox="0 0 14 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.99979 0C5.40849 0 3.88236 0.632141 2.75715 1.75736C1.63193 2.88258 0.999787 4.4087 0.999787 6V9.586L0.292787 10.293C0.152977 10.4329 0.057771 10.611 0.0192035 10.805C-0.0193641 10.9989 0.000438951 11.2 0.076109 11.3827C0.151779 11.5654 0.279918 11.7215 0.444328 11.8314C0.608738 11.9413 0.802037 12 0.999787 12H12.9998C13.1975 12 13.3908 11.9413 13.5552 11.8314C13.7197 11.7215 13.8478 11.5654 13.9235 11.3827C13.9991 11.2 14.0189 10.9989 13.9804 10.805C13.9418 10.611 13.8466 10.4329 13.7068 10.293L12.9998 9.586V6C12.9998 4.4087 12.3676 2.88258 11.2424 1.75736C10.1172 0.632141 8.59109 0 6.99979 0ZM6.99979 16C6.20414 16 5.44108 15.6839 4.87847 15.1213C4.31586 14.5587 3.99979 13.7956 3.99979 13H9.99979C9.99979 13.7956 9.68372 14.5587 9.12111 15.1213C8.5585 15.6839 7.79544 16 6.99979 16Z"
                      fill="#5B6871"
                    />
                  </svg>
                </div>
                <div className="flex items-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.48975 1.17C9.10975 -0.39 6.88975 -0.39 6.50975 1.17C6.45302 1.40442 6.34174 1.62213 6.18497 1.80541C6.02821 1.9887 5.83038 2.13238 5.60759 2.22477C5.38481 2.31716 5.14336 2.35564 4.90289 2.33709C4.66242 2.31854 4.42973 2.24347 4.22375 2.118C2.85175 1.282 1.28175 2.852 2.11775 4.224C2.65775 5.11 2.17875 6.266 1.17075 6.511C-0.39025 6.89 -0.39025 9.111 1.17075 9.489C1.40523 9.54581 1.62298 9.65719 1.80626 9.81407C1.98955 9.97096 2.13319 10.1689 2.22549 10.3918C2.31779 10.6147 2.35614 10.8563 2.33742 11.0968C2.3187 11.3373 2.24343 11.5701 2.11775 11.776C1.28175 13.148 2.85175 14.718 4.22375 13.882C4.42969 13.7563 4.6624 13.6811 4.90293 13.6623C5.14347 13.6436 5.38502 13.682 5.60793 13.7743C5.83084 13.8666 6.02879 14.0102 6.18568 14.1935C6.34256 14.3768 6.45394 14.5945 6.51075 14.829C6.88975 16.39 9.11075 16.39 9.48875 14.829C9.54575 14.5946 9.65724 14.377 9.81416 14.1939C9.97108 14.0107 10.169 13.8672 10.3918 13.7749C10.6147 13.6826 10.8561 13.6442 11.0966 13.6628C11.3371 13.6815 11.5698 13.7565 11.7758 13.882C13.1477 14.718 14.7178 13.148 13.8818 11.776C13.7563 11.57 13.6812 11.3373 13.6626 11.0969C13.644 10.8564 13.6824 10.6149 13.7747 10.3921C13.8669 10.1692 14.0105 9.97133 14.1936 9.81441C14.3768 9.65749 14.5944 9.546 14.8288 9.489C16.3898 9.11 16.3898 6.889 14.8288 6.511C14.5943 6.45419 14.3765 6.34281 14.1932 6.18593C14.01 6.02904 13.8663 5.83109 13.774 5.60818C13.6817 5.38527 13.6434 5.14372 13.6621 4.90318C13.6808 4.66265 13.7561 4.42994 13.8818 4.224C14.7178 2.852 13.1477 1.282 11.7758 2.118C11.5698 2.24368 11.3371 2.31895 11.0966 2.33767C10.856 2.35639 10.6145 2.31804 10.3916 2.22574C10.1687 2.13344 9.97071 1.9898 9.81382 1.80651C9.65694 1.62323 9.54556 1.40548 9.48875 1.171L9.48975 1.17ZM7.99975 11C8.7954 11 9.55846 10.6839 10.1211 10.1213C10.6837 9.55871 10.9998 8.79565 10.9998 8C10.9998 7.20435 10.6837 6.44129 10.1211 5.87868C9.55846 5.31607 8.7954 5 7.99975 5C7.2041 5 6.44104 5.31607 5.87843 5.87868C5.31582 6.44129 4.99975 7.20435 4.99975 8C4.99975 8.79565 5.31582 9.55871 5.87843 10.1213C6.44104 10.6839 7.2041 11 7.99975 11Z"
                      fill="#5B6871"
                    />
                  </svg>
                </div>
                <button
                  className="bg-main text-white px-5 py-2 rounded-md"
                  onClick={() => {
                    setOpenModalCreate(true)
                  }}
                >
                  Create a Focus
                </button>
                {/* avatar */}
                <div
                  className="flex items-center cursor-pointer bg-main rounded-full"
                  ref={userImageDropdown}
                  onClick={() => {
                    setOpenDropdown((b) => !b)
                  }}
                >
                  <Image
                    unoptimized
                    src={session?.user?.image || '/icon/man.png'}
                    alt="Picture of the author"
                    width={40}
                    height={40}
                    className="object-cover rounded-full"
                  />
                </div>
                {/* dropdown */}
                {openDropdown && (
                  <div
                    ref={dropdown}
                    className="absolute top-14 right-2 bg-background px-3 py-2 shadow-md rounded-lg w-40 flex flex-col space-y-1"
                  >
                    <div
                      onClick={() => (window.location.href = '/profile')}
                      className="cursor-pointer py-1 hover:bg-main hover:text-white px-3 rounded-md"
                    >
                      Profile
                    </div>
                    <div className="cursor-pointer py-1 hover:bg-main hover:text-white px-3 rounded-md">
                      Settings
                    </div>
                    <div className="cursor-pointer py-1 hover:bg-main hover:text-white px-3 rounded-md">
                      Subscription
                    </div>
                    <hr />
                    <div
                      className="cursor-pointer py-1 hover:bg-main hover:text-white px-3 rounded-md"
                      onClick={logout}
                    >
                      Sign out
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="ml-72 mt-24 bg-background">{props.children}</div>
        </main>
      </div>
    </>
  )
}
export default ProfileLayout
