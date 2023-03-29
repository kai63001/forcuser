import Layout from "@/components/dashboard/Layout";
import Loading from "@/components/libs/Loading";
import UseAuth from "@/components/libs/useAuth";
import dynamic from "next/dynamic";
import Image from "next/image";

const MyFocus = dynamic(() => import("@/components/dashboard/home/myFocus"));

const Dashboard = () => {
  const isAuthenticated = UseAuth(true);
  if (isAuthenticated == false) {
    return <Loading />;
  }

  return (
    <Layout title="Dashboard">
      <div className="h-full items-cemter rounded-md space-y-8 py-48 p-10 mr-5 relative mb-14">
        <div className="text-center absolute z-10 w-full">
          <h1 className="text-6xl text-gray-500  dark:text-slate-50">
            Pomodoro as your wish.
          </h1>
          <h3 className="mt-4 text-gray-500 dark:text-slate-50  ">
            Give yourself the freedom to customize your Pomodoro in a unique
            way.
          </h3>
        </div>
        <Image
          src="https://i.pinimg.com/originals/ef/3b/42/ef3b42ceb18014af07c46182bacf1f0b.gif"
          alt="Picture of the author"
          onDragStart={(e) => e.preventDefault()}
          fill
          className="rounded-md w-full h-full object-cover"
        />
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
