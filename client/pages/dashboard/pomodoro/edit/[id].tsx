import UploadWallpaper from "@/components/editPomodoro/uploadWallpaper";
import useAuth from "@/components/libs/useAuth";
import PomodoroV1 from "@/components/pomodoro/pomodoroV1";
import axios from "@/lib/axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PomodoroV1State } from "@/components/pomodoro/type/pomodoroV1";

const PomodoroEditPage = (props: any) => {
  const router = useRouter();
  //check auth
  const isAuthenticated = useAuth(true);

  const [toggleId, setToggleId] = useState(0);

  const [template, setTemplate] = useState<PomodoroV1State>({
    wallpaper: {
      type: 0,
      url: "",
    },
  });

  // 5 = image

  useEffect(() => {
    getDataFromId();
  }, []);

  const getDataFromId = async () => {
    const data = await axios.get(`/pomodoro/get/${props.id}`);
    console.log("getData", data);
  };

  const openToggle = (id: number) => {
    if (id == toggleId) {
      setToggleId(0);
      return;
    }
    setToggleId(id);
  };

  if (isAuthenticated == false) {
    return <div>loading</div>;
  }

  return (
    <div className="flex">
      <div className="h-screen bg-black w-12 flex flex-col items-center space-y-10 pt-5">
        <div
          className="text-white cursor-pointer px-3"
          id="upload image"
          onClick={() => openToggle(5)}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.4 1.6C1.95817 1.6 1.6 1.95817 1.6 2.4V13.6C1.6 13.943 1.81591 14.2356 2.11925 14.3493L10.6343 5.8343C10.9467 5.52188 11.4532 5.52188 11.7657 5.8343L14.4 8.46863V2.4C14.4 1.95817 14.0418 1.6 13.6 1.6H2.4ZM14.4 10.7314L11.2 7.53135L4.33134 14.4H13.6C14.0418 14.4 14.4 14.0418 14.4 13.6V10.7314ZM0 2.4C0 1.07452 1.07452 0 2.4 0H13.6C14.9255 0 16 1.07452 16 2.4V13.6C16 14.9255 14.9255 16 13.6 16H2.4C1.07452 16 0 14.9255 0 13.6V2.4ZM5.19997 4.80001C4.97905 4.80001 4.79997 4.97909 4.79997 5.20001C4.79997 5.42092 4.97905 5.60001 5.19997 5.60001C5.42088 5.60001 5.59997 5.42092 5.59997 5.20001C5.59997 4.97909 5.42088 4.80001 5.19997 4.80001ZM3.19997 5.20001C3.19997 4.09544 4.0954 3.20001 5.19997 3.20001C6.30453 3.20001 7.19997 4.09544 7.19997 5.20001C7.19997 6.30458 6.30453 7.20001 5.19997 7.20001C4.0954 7.20001 3.19997 6.30458 3.19997 5.20001Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="text-white">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.4 1.6C1.95817 1.6 1.6 1.95817 1.6 2.4V13.6C1.6 13.943 1.81591 14.2356 2.11925 14.3493L10.6343 5.8343C10.9467 5.52188 11.4532 5.52188 11.7657 5.8343L14.4 8.46863V2.4C14.4 1.95817 14.0418 1.6 13.6 1.6H2.4ZM14.4 10.7314L11.2 7.53135L4.33134 14.4H13.6C14.0418 14.4 14.4 14.0418 14.4 13.6V10.7314ZM0 2.4C0 1.07452 1.07452 0 2.4 0H13.6C14.9255 0 16 1.07452 16 2.4V13.6C16 14.9255 14.9255 16 13.6 16H2.4C1.07452 16 0 14.9255 0 13.6V2.4ZM5.19997 4.80001C4.97905 4.80001 4.79997 4.97909 4.79997 5.20001C4.79997 5.42092 4.97905 5.60001 5.19997 5.60001C5.42088 5.60001 5.59997 5.42092 5.59997 5.20001C5.59997 4.97909 5.42088 4.80001 5.19997 4.80001ZM3.19997 5.20001C3.19997 4.09544 4.0954 3.20001 5.19997 3.20001C6.30453 3.20001 7.19997 4.09544 7.19997 5.20001C7.19997 6.30458 6.30453 7.20001 5.19997 7.20001C4.0954 7.20001 3.19997 6.30458 3.19997 5.20001Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
      <div className="w-full">
        <PomodoroV1 template={template} />
      </div>
      <div id="toggle">
        {toggleId == 5 && (
          <UploadWallpaper setTemplate={setTemplate} template={template} />
        )}
      </div>
    </div>
  );
};

//get parame id
export async function getServerSideProps(context: any) {
  const { id } = context.query;
  console.log("id", id);
  return {
    props: {
      id: id,
    },
  };
}

export default PomodoroEditPage;
