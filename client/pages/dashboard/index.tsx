import Layout from "@/components/dashboard/Layout";
import UseAuth from "@/components/libs/useAuth";
import dynamic from "next/dynamic";

const MyFocus = dynamic(() => import("@/components/dashboard/home/myFocus"));

const Dashboard = () => {
  const isAuthenticated = UseAuth(true);
  if (isAuthenticated == false) {
    return <div></div>;
  }

  return (
    <Layout title="Dashboard">
      <div className=" h-full items-cemter bg-gradient-to-r from-purple-900 to-red-700  rounded-md space-y-8 pb-10 p-10  mr-5">
        <div className=" text-center ">
          <h1 className="text-4xl text-gray-500  dark:text-slate-50">
            Pomodoro as your wish.
          </h1>
          <h3 className="mt-4 text-gray-500 dark:text-slate-50  ">
            Give yourself the feedom to customize your Pomodoro in a unique way.
          </h3>
        </div>
      </div>
      <div className="flex justify-between mr-5 mt-5 items-center">
        <h2 className="text-2xl franger">My Focus</h2>
      </div>
      {/* grid */}
      <MyFocus />
    </Layout>
  );
};

export default Dashboard;
