import Layout from "@/components/Layout";
import Header from "@/components/Header";
type LayoutInterface = {
  title?: string | undefined;
  des?: string | undefined;
  image?: string | undefined;
  children?: any | undefined;
};
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

const DashboardLayout = (props: LayoutInterface) => {
  const router = useRouter();
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
        <aside className="" aria-label="Sidebar">
          <div className="py-4 overflow-y-auto w-64 h-full bg-white fixed z-10 border-r-2">
            <div className="ml-5 text-2xl franger mb-4">Focuser</div>
            <ul className="space-y-2 px-5 mt-10">
              {listNavbar.map((item, index) => {
                return (
                  <li key={index}>
                    <a
                      href="#"
                      className={`flex items-center pl-5 py-3 text-base font-normal rounded-md ${
                        router.asPath == item.link
                          ? "text-white bg-purple-500"
                          : "text-gray-500"
                      }`}
                    >
                      {item.icon}
                      <span className="ml-3">{item.name}</span>
                    </a>
                  </li>
                );
              })}
              <li>
                <a
                  onClick={() => signOut({
                    callbackUrl: "/auth/login"
                  })}
                  className={`flex items-center pl-5 py-3 text-base font-normal text-gray-500`}
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </aside>
        <main className="w-full">
          <div className="bg-white h-16 w-full fixed border-b-2 z-20">
            <div className="flex justify-between items-center h-full">
              <div className="ml-5 text-2xl franger">Focuser</div>
              <div className="mr-5">
                  <button className="bg-purple-600 text-white px-5 py-2.5 rounded-md">Create a Pomodoro</button>
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
