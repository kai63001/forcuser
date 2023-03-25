import Layout from "@/components/Layout";
import Header from "@/components/Header";
type LayoutInterface = {
  title?: string | undefined;
  des?: string | undefined;
  image?: string | undefined;
  children?: any | undefined;
};
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const ModalCreatePomodoro = dynamic(() => import("./modal/createPomodoro"));

const DashboardLayout = (props: LayoutInterface) => {
  //session from next
  const { data: session }: any = useSession();

  const [openModalCreate, setOpenModalCreate] = useState(false);

  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdown: any = useRef(null);
  const userImageDropdown: any = useRef(null);

  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        dropdown.current &&
        !dropdown.current.contains(event.target) &&
        userImageDropdown.current &&
        !userImageDropdown.current.contains(event.target)
      ) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdown]);

  const listNavbar = [
    {
      name: "Home",
      link: "/dashboard",
      icon: (
        <svg
          aria-hidden="true"
          className={`flex-shrink-0 w-6 h-6 ${
            router.asPath == "/dashboard" ? "text-white" : "text-gray-500"
          }  transition duration-75`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
        </svg>
      ),
    },
    {
      name: "Users",
      link: "/dashboard/users",
      icon: (
        <svg
          aria-hidden="true"
          className={`flex-shrink-0 w-6 h-6 ${
            router.asPath == "/dashboard/users" ? "text-white" : "text-gray-500"
          }  transition duration-75`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
        </svg>
      ),
    },
  ];
  return (
    <>
      <Header title={props.title} des={props.des} image={props.image} />
      <div className="flex flex-item-fluid flex-nowrap">
        {openModalCreate && (
          <ModalCreatePomodoro setOpenModalCreate={setOpenModalCreate} />
        )}

        <aside className="" aria-label="Sidebar">
          <div className="py-4 overflow-y-auto w-64 h-full bg-white fixed z-10 border-r-2">
            <div className="ml-5 text-2xl franger mb-4">Focusify</div>
            <ul className="space-y-2 px-5 mt-10">
              {listNavbar.map((item, index) => {
                return (
                  <li key={index}>
                    <a
                      href="#"
                      className={`flex items-center pl-5 py-3 text-base font-normal rounded-md ${
                        router.asPath == item.link
                          ? "text-white bg-purple-600"
                          : "text-gray-500"
                      }`}
                    >
                      {item.icon}
                      <span className="ml-3">{item.name}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
        <main className="w-full">
          <div className="bg-white h-16 w-full fixed border-b-2 z-20">
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
                  className="bg-purple-600 text-white px-5 py-2 rounded-md"
                  onClick={() => setOpenModalCreate(true)}
                >
                  Create a Focus
                </button>
                {/* avatar */}
                <div
                  className="flex items-center cursor-pointer bg-purple-500 rounded-full"
                  ref={userImageDropdown}
                  onClick={() => setOpenDropdown((b) => !b)}
                >
                  <Image
                    src={session?.user?.image || "/icon/man.png"}
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
                    className="absolute top-14 right-2 bg-white px-3 py-2 shadow-md rounded-lg w-40 flex flex-col space-y-1"
                  >
                    <div className="cursor-pointer py-1 hover:bg-purple-300 hover:text-purple-600 px-3 rounded-md">
                      Profile
                    </div>
                    <div className="cursor-pointer py-1 hover:bg-purple-300 hover:text-purple-600 px-3 rounded-md">
                      Settings
                    </div>
                    <div className="cursor-pointer py-1 hover:bg-purple-300 hover:text-purple-600 px-3 rounded-md">
                      Subscription
                    </div>
                    <hr />
                    <div
                      className="cursor-pointer py-1 hover:bg-purple-300 hover:text-purple-600 px-3 rounded-md"
                      onClick={() =>
                        signOut({
                          callbackUrl: "/auth/login",
                        })
                      }
                    >
                      Sign out
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="ml-72 mt-24">{props.children}</div>
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
