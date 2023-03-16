import { PomodoroV1Props } from "@/components/pomodoro/type/pomodoroV1";
import axios from "@/lib/axios";
import Toast from "@/lib/toast";
import { useState } from "react";
import Swal from "sweetalert2";

const SaveWidget = (props: PomodoroV1Props) => {
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (saving) return;
    setSaving(true);
    try {
      console.log(props.template);
      const { data } = await axios.post(
        `/pomodoro/edit/${props.id}`,
        props.template
      );
      console.log(data);
      setSaving(false);
      Toast.fire({
        icon: "success",
        title: data.message,
      });
    } catch (error) {
      console.log(error);
      setSaving(false);
    }
    setSaving(false);
  };

  return (
    <div className="absolute bottom-2 w-full flex z-50">
      <div className="m-auto">
        <div className="bg-black bg-opacity-50 rounded-md px-2 py-2 text-white flex items-center space-x-2">
          <button className="bg-gray-500 px-2 py-1 rounded-md">Share</button>
          <button
            className="bg-purple-500 px-5 py-1 rounded-md flex items-center"
            disabled={saving}
            onClick={save}
          >
            {saving && (
              <svg
                className="animate-spin -ml-1 mr-1 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveWidget;
