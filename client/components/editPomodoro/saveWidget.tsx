import { PomodoroV1Props } from "@/components/pomodoro/type/pomodoroV1";

const SaveWidget = (props: PomodoroV1Props) => {
  return (
    <div className="absolute bottom-2 w-full flex">
      <div className="m-auto">
        <div className="bg-black rounded-md px-2 py-2 text-white flex items-center">
          <button className="bg-purple-500 px-2 py-1 rounded-md">SAVE</button>
        </div>
      </div>
    </div>
  );
};

export default SaveWidget;
