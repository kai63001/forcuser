import Layout from "@/components/Layout";
import Header from "@/components/Header";
type LayoutInterface = {
  title?: string | undefined;
  des?: string | undefined;
  image?: string | undefined;
  children?: any | undefined;
};
const DashboardLayout = (props: LayoutInterface) => {
  return (
    <>
      <Header title={props.title} des={props.des} image={props.image} />
      <div className="flex flex-item-fluid flex-nowrap">
        <aside className="w-72 h-screen" aria-label="Sidebar">
          <div className="py-4 overflow-y-auto h-full bg-white">
            <div className="ml-5 text-2xl franger mb-10">Focuser</div>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="flex items-center pl-5 py-3 text-base font-normal text-gray-500"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                  </svg>
                  <span className="ml-3">Dashboard</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center pl-5 py-3 text-base font-normal text-blue-500 bg-blue-200"
                >
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6 text-blue-500 transition duration-75"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                  </svg>
                  <span className="ml-3">General</span>
                </a>
              </li>
            </ul>
          </div>
        </aside>
        <main className="bg-gray-200 w-full pl-8">{props.children}</main>
      </div>
    </>
  );
};

export default DashboardLayout;
