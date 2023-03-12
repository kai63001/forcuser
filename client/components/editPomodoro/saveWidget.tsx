import { PomodoroV1Props } from "@/components/pomodoro/type/pomodoroV1";
import axios from "@/lib/axios";

const SaveWidget = (props: PomodoroV1Props) => {
  const save = async () => {
    console.log(props);
    const data = await axios.post(`/pomodoro/edit/${props.id}`, props.template);
    console.log(data);
  };

  return (
    <div className="absolute bottom-2 w-full flex z-50">
      <div className="m-auto">
        <div className="bg-black bg-opacity-50 rounded-md px-2 py-2 text-white flex items-center space-x-2">
          <button className="bg-gray-500 px-2 py-1 rounded-md" >
            Share
          </button>
          <button className="bg-purple-500 px-5 py-1 rounded-md" onClick={save}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveWidget;
