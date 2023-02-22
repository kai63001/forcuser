import useAuth from "@/components/libs/useAuth";
import { useRouter } from "next/router";

const PomodoroEditPage = () => {
  //check auth
  const isAuthenticated = useAuth(true);
  if (isAuthenticated == false) {
    return <div></div>;
  }

  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Pomodoro Edit Page</h1>
      <p>Pomodoro ID: {id}</p>
    </div>
  );
};

export default PomodoroEditPage;
