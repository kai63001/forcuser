import useAuth from "@/components/libs/useAuth";

const Dashboard = () => {
  const isAuthenticated = useAuth(true);
  console.log(isAuthenticated);
  if (isAuthenticated == false) {
    return <div></div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Number of users</p>
    </div>
  );
};

export default Dashboard;
