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
      <div>
        <h1>Dashboard</h1>
        <p>Number of users</p>
        <h1>Dashboard</h1>
        <p>Number of users</p><h1>Dashboard</h1>
        <p>Number of users</p><h1>Dashboard</h1>
        <p>Number of users</p><h1>Dashboard</h1>
        <p>Number of users</p><h1>Dashboard</h1>
        <p>Number of users</p><h1>Dashboard</h1>
        <p>Number of users</p><h1>Dashboard</h1>
        <p>Number of users</p><h1>Dashboard</h1>
        <p>Number of users</p><h1>Dashboard</h1>
        <p>Number of users</p><h1>Dashboard</h1>
        <p>Number of users</p><h1>Dashboard</h1>
        <p>Number of users</p><h1>Dashboard</h1>
        <p>Number of users</p><h1>Dashboard</h1>
        <p>Number of users</p><h1>Dashboard</h1>
        <p>Number of users</p><h1>Dashboard</h1>
        <p>Number of users</p><h1>Dashboard</h1>
        <p>Number of users</p><h1>Dashboard</h1>
        <p>Number of users</p><h1>Dashboard</h1>
        <p>Number of users</p><h1>Dashboard</h1>
        <p>Number of users</p><h1>Dashboard</h1>
        <p>Number of users</p><h1>Dashboard</h1>
        <p>Number of users</p>
      </div>
    </Layout>
  );
};

export default Dashboard;
