import { useRouter } from "next/router";

const PomodoroEditPage = () => {
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