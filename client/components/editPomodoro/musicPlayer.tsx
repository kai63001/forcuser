import Image from "next/image";

//redux
import { setTemplate } from "@/store/templateSlice";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/store";
import { PomodoroV1State } from "../pomodoro/type/pomodoroV1";

const MusicPlayer = () => {
  const template: PomodoroV1State = useSelector(
    (state: RootState) => state.templateSlice
  );
  const dispatch = useDispatch();

  const selectMusicPlayer = (id: number) => {
    if (template?.music?.widget == id) {
      dispatch(
        setTemplate({
          ...template,
          music: {
            ...template.music,
            widget: -1,
          },
        })
      );
      return;
    }
    dispatch(
      setTemplate({
        ...template,
        music: {
          ...template.music,
          widget: id,
        },
      })
    );
  };

  return (
    <div className="absolute z-50 text-white left-[65px] bg-black bg-opacity-90 w-[450px] h-[70vh] px-5 py-4 top-1/2 -translate-y-1/2 rounded-md overflow-hidden">
      <h2 className="text-2xl">Music Player</h2>
      <hr className="bg-gray-500 border-gray-500 my-2" />
      {/* scroll here */}
      <div className="overflow-y-scroll h-[60vh] ">
        <div className="flex flex-col space-y-2">
          <div
            onClick={() => selectMusicPlayer(0)}
            className={`group cursor-pointer border-2 rounded-md ${
              template?.music?.widget == 0
                ? "bg-orange-400 border-orange-200"
                : "bg-purple-400 border-purple-200"
            } `}
          >
            <div className="rounded-md">
              <Image
                className="rounded-md"
                src="/widget/music/musicPlayer1.png"
                width={400}
                height={200}
                alt="music player 1"
              />
            </div>
            <div className="px-2 py-1 text-purple-50">Spotify Music Player</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
