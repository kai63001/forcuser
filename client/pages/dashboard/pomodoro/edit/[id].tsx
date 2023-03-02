import UploadWallpaper from "@/components/editPomodoro/uploadWallpaper";
import useAuth from "@/components/libs/useAuth";
import PomodoroV1 from "@/components/pomodoro/pomodoroV1";
import axios from "@/lib/axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PomodoroV1State } from "@/components/pomodoro/type/pomodoroV1";
import MusicPlayer from "@/components/editPomodoro/musicPlayer";
import { useSession } from "next-auth/react";
import SaveWidget from "@/components/editPomodoro/saveWidget";
const PomodoroEditPage = (props: any) => {
  const { data: session }: any = useSession();

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

  //function check owner
  const checkOwner = async (data: any) => {
    // console.log(data)
    // console.log(session)
    if(!session){
      return
    }
    //decode jwt
    const token = await session.token;
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const decodedData = JSON.parse(window.atob(base64));
    // console.log(decodedData._id,data.userId);
    if (data.userId != decodedData._id) {
      router.push("/dashboard");
    }
  };

  // 5 = image

  useEffect(() => {
    getDataFromId();
  }, []);

  const getDataFromId = async () => {
    const data = await axios.get(`/pomodoro/get/${props.id}`);
    console.log("getData", data);
    checkOwner(data.data.data);
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
          id="music player"
          onClick={() => openToggle(4)}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.81748 5.04657C7.56642 4.87919 7.24361 4.86359 6.97757 5.00597C6.71153 5.14835 6.54545 5.4256 6.54545 5.72734V12.2728C6.54545 12.5745 6.71153 12.8518 6.97757 12.9942C7.24361 13.1365 7.56642 13.1209 7.81748 12.9536L12.7266 9.68083C12.9542 9.52909 13.0909 9.27362 13.0909 9.00006C13.0909 8.7265 12.9542 8.47104 12.7266 8.31929L7.81748 5.04657ZM10.7977 9.00006L8.18182 10.744V7.25612L10.7977 9.00006Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0ZM1.63636 9C1.63636 4.93318 4.93318 1.63636 9 1.63636C13.0668 1.63636 16.3636 4.93318 16.3636 9C16.3636 13.0668 13.0668 16.3636 9 16.3636C4.93318 16.3636 1.63636 13.0668 1.63636 9Z"
              fill="white"
            />
          </svg>
        </div>
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
      </div>
      <div className="w-full">
        <PomodoroV1 template={template} />
      </div>
      <div id="toggle">
        {toggleId == 5 && (
          <UploadWallpaper setTemplate={setTemplate} template={template} />
        )}
        {toggleId == 4 && (
          <MusicPlayer setTemplate={setTemplate} template={template} />
        )}
      </div>
      <SaveWidget template={template} />
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
