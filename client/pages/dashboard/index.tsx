import Layout from "@/components/dashboard/Layout";
import useAuth from "@/components/libs/useAuth";

const Dashboard = () => {
  const isAuthenticated = useAuth(true);
  //   console.log(isAuthenticated);
  if (isAuthenticated == false) {
    return <div></div>;
  }

  return (
    <Layout title="Dashboard">
      <div className="   h-full items-cemter bg-gradient-to-r from-blue-800 to-cyan-400  rounded-md space-y-8 pb-10 p-10  mr-5">
        <div className=" text-center ">
          <h1 className="text-4xl text-gray-500  dark:text-slate-50">
            Pomodoro as your wish.
          </h1>
          <h3 className="mt-4 text-gray-500 dark:text-slate-50  ">
            Give yourself the feedom to customize your Pomodoro in a unique way.
          </h3>
        </div>
      </div>
      <div className="pt-10 -flow-col grid grid-cols-2 ">
        <h1 className=" text-2xl  ">New Arrival Templates...</h1>

        <div className="flex justify-end">
          {" "}
          <button
            type="button"
            className="text-black  hover:text-blue-700  font-medium rounded-lg text-sm p-2.5 text-center inline-flex mr-2 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </button>
          <button
            type="button"
            className="text-black  hover:text-blue-700  font-medium rounded-lg text-sm p-2.5 text-center inline-flex  mr-5 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex flex-cols-5 pt-5  space-x-4 ">
        <button className=" bg-slate-200 hover:border-blue-500  hover:bg-slate-300 hover:text-slate-500 group w-full flex flex-col items-center justify-center rounded-md text-slate-400 py-20 ">
          template{" "}
        </button>
        <button className="bg-slate-200 hover:border-blue-500  hover:bg-slate-300 hover:text-slate-500 group w-full flex flex-col items-center justify-center rounded-md text-slate-400 py-20  ">
          template{" "}
        </button>
        <button className="bg-slate-200 hover:border-blue-500  hover:bg-slate-300 hover:text-slate-500 group w-full flex flex-col items-center justify-center rounded-md text-slate-400 py-20 ">
          template{" "}
        </button>
        <button className="bg-slate-200 hover:border-blue-500  hover:bg-slate-300 hover:text-slate-500 group w-full flex flex-col items-center justify-center rounded-md text-slate-400 py-20  ">
          template{" "}
        </button>
        <button className="bg-slate-200 hover:border-blue-500  hover:bg-slate-300 hover:text-slate-500 group w-full flex flex-col items-center justify-center rounded-md text-slate-400 py-20  ">
          template{" "}
        </button>
      </div>
      <h1 className=" pt-10 text-2xl">Recents design...</h1>

      <div className="grid grid-cols-5 pt-5 ">
        <button className="bg-slate-200 hover:border-blue-500  hover:bg-slate-300 hover:text-slate-500 group w-full flex flex-col items-center justify-center rounded-md text-slate-400 py-10  ">
          <svg
            className="group-hover:text-slate-500 mb-10 text-slate-400"
            width="20"
            height="30"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
          </svg>
          Create template{" "}
        </button>
      </div>
    </Layout>
  );
};

export default Dashboard;
