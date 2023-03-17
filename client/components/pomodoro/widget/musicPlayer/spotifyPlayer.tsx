import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import spotifyMusic from "./mock/spotify.json";
import Draggable from "react-draggable";
import { PomodoroV1Props } from "../../type/pomodoroV1";
import { useRouter } from "next/router";

interface MusicPlayerInfoInterface {
  title: string;
  description: string;
  thumbnail_url: string;
}

const SpotifyPlayer = (props: PomodoroV1Props) => {
  //get route path
  const router = useRouter();

  const musicUrl = "https://open.spotify.com/playlist/4Zjli1P13J5mmSCD5iKAXK";

  const [listMusic, setListMusic]: any = useState(spotifyMusic);
  const [listMusicSelect, setListMusicSelect] = useState(0);
  const [musicPlayerInfo, setMusicPlayerInfo] =
    useState<MusicPlayerInfoInterface>({
      title: "",
      description: "",
      thumbnail_url: "",
    });
  const [playing, setPlaying] = useState(false);

  const [previewOrNot, setPreviewOrNot] = useState(false);

  const [musicProcress, setMusicProcress] = useState(0);

  const [isEdit, setIsEdit] = useState(false);

  const getDataSpotify = async () => {
    const data = await axios.get(
      `https://open.spotify.com/oembed?url=${musicUrl}`
    );
    setMusicPlayerInfo(data.data);
  };

  useEffect(() => {
    getDataSpotify();
    checkIsEdit();
  }, []);

  const checkIsEdit = () => {
    if (router.pathname.includes("edit")) {
      setIsEdit(true);
      return true;
    }

    setIsEdit(false);
    return false;
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://open.spotify.com/embed-podcast/iframe-api/v1";
    script.async = true;
    document.body.appendChild(script);
    script.onload = () => {
      // @ts-ignore
      window.onSpotifyIframeApiReady = (IFrameAPI: any) => {
        let element = document.getElementById("embed-iframe");
        let options = {
          width: "0",
          height: "0",
          uri: listMusic.items[listMusicSelect].track.uri,
          theme: "0",
        };
        let callback = (EmbedController: any) => {
          console.log(EmbedController);
          // EmbedController.seek(5);

          EmbedController.addListener("playback_update", (e: any) => {
            let percent = parseInt(
              (
                (parseInt((e.data.position / 1000).toString(), 10) /
                  parseInt((e.data.duration / 1000).toString(), 10)) *
                100
              ).toString()
            );
            //To listen to music more than 30 seconds please login spotify.
            if (parseInt((e.data.duration / 1000).toString(), 10) <= 35) {
              console.log("preview", e.data.duration);
              setPreviewOrNot(true);
            }
            let nexting = false;
            setMusicProcress(percent);
            if (percent >= 100 && nexting == false) {
              nexting = true;
              console.log("next", listMusicSelect);
              //@ts-ignore
              let next =
                //@ts-ignore
                parseInt(document.querySelector("#indexMusic")?.innerHTML) + 1;
              console.log(document.querySelector("#indexMusic")?.innerHTML);
              if (next >= listMusic.items.length) {
                next = 0;
              }
              //@ts-ignore
              document.querySelector("#indexMusic").innerHTML = next.toString();
              EmbedController.loadUri(listMusic.items[next].track.uri);
              EmbedController.play();
              setListMusicSelect(next);
              setTimeout(() => {
                nexting = false;
              }, 2000);
            }
            // console.log("percent: ", percent);
            // console.log(parseInt((e.data.position / 1000).toString(), 10));
            // return console.log(
            //   `${parseInt(e.data.position/ 1000, 10)} s : ${parseInt(
            //     e.data.duration / 1000,
            //     10
            //   )} s`
            // );
          });
          //? play music
          document.querySelectorAll("#playMusic").forEach((episode: any) => {
            episode.addEventListener("click", () => {
              let persenMusic =
                document.querySelector("#persenMusic")?.innerHTML;
              if (persenMusic != undefined && ~~persenMusic > 0) {
                EmbedController.togglePlay();
                setTimeout(() => {
                  let playingStatus =
                    //@ts-ignore
                    document.querySelector("#playing").innerHTML;
                  let newStatus =
                    playingStatus == "playing" ? "pause" : "playing";
                  setPlaying(newStatus == "playing" ? true : false);
                  //@ts-ignore
                  document.querySelector("#playing").innerHTML = newStatus;
                }, 500);
              } else {
                EmbedController.play();
                setPlaying(true);
                //@ts-ignore
                document.querySelector("#playing").innerHTML = "playing";
              }
              console.log("play", persenMusic);
              // EmbedController.loadUri(listMusic.items[next].track.uri);
            });
          });
          //? next music
          document.querySelectorAll("#nextMusic").forEach((episode: any) => {
            episode.addEventListener("click", () => {
              setMusicProcress(0);
              console.log("next");
              //@ts-ignore
              let next =
                //@ts-ignore
                parseInt(document.querySelector("#indexMusic")?.innerHTML) + 1;
              console.log(document.querySelector("#indexMusic")?.innerHTML);
              if (next >= listMusic.items.length) {
                next = 0;
              }
              //@ts-ignore
              document.querySelector("#indexMusic").innerHTML = next.toString();
              EmbedController.loadUri(listMusic.items[next].track.uri);
              EmbedController.play();
              setListMusicSelect(next);
              // ? playing
              setPlaying(true);
              //@ts-ignore
              document.querySelector("#playing").innerHTML = "playing";
            });
          });
          //? prev music
          document.querySelectorAll("#prevMusic").forEach((episode: any) => {
            episode.addEventListener("click", () => {
              console.log("prev");
              setMusicProcress(0);
              //@ts-ignore
              let prev =
                //@ts-ignore
                parseInt(document.querySelector("#indexMusic")?.innerHTML) - 1;
              console.log(document.querySelector("#indexMusic")?.innerHTML);
              if (prev >= 0) {
                //@ts-ignore
                document.querySelector("#indexMusic").innerHTML =
                  prev.toString();
                EmbedController.loadUri(listMusic.items[prev].track.uri);
                EmbedController.play();
                setListMusicSelect(prev);
                // ? playing
                setPlaying(true);
                //@ts-ignore
                document.querySelector("#playing").innerHTML = "playing";
              }
            });
          });
        };
        IFrameAPI.createController(element, options, callback);
      };
    };
    console.log("musicProcress", musicProcress);
  }, []);

  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleStart = () => {
    setIsDragging(true);
  };

  const handleStop = (e: any, data: any) => {
    setPosition({ x: data.x, y: data.y });
    setIsDragging(false);
    props.setTemplate?.({
      ...props.template,
      music: { ...props.template.music, position: { x: data.x, y: data.y } },
    });
    // props.setTemplate({
    //   ...props.template,
    //   music: { ...props.template.music, position: { x: data.x, y: data.y } },
    // });
  };

  const thisWidget: any = useRef(null);

  //function get max height and width
  const [maxHeight, setMaxHeight] = useState(0);
  const [maxWidth, setMaxWidth] = useState(0);
  useEffect(() => {
    setMaxHeight(window.innerHeight - thisWidget.current.clientHeight);
    setMaxWidth(window.innerWidth - thisWidget.current.clientWidth);

    //init
    if (
      props.template?.music?.position.x &&
      props.template?.music?.position.y
    ) {
      setPosition({
        x:
          (props.template?.music.position.x /
            (props.template?.global.position.x - thisWidget.current.clientWidth)) *
          (window.innerWidth - thisWidget.current.clientWidth),
        y:
          (props.template?.music.position.y /
            (props.template?.global.position.y - thisWidget.current.clientHeight)) *
          (window.innerHeight - thisWidget.current.clientHeight),
      });
    } else {
      //left bottom
      setPosition({
        x: 0 + 15,
        y: (window.innerHeight - thisWidget.current.clientHeight) - 15,
      });
    }
  }, []);

  const [isDragging, setIsDragging] = useState(false);

  return (
    <Draggable
      onStart={handleStart}
      onStop={handleStop}
      position={position}
      disabled={!isEdit}
      bounds={{
        top: 0,
        left: 0,
        right: maxWidth,
        bottom: maxHeight,
      }}
    >
      <div
        ref={thisWidget}
        id="leftBottom"
        className={`absolute z-20 text-white ${
          isDragging ? "cursor-grabbing opacity-80" : "cursor-grab opacity-100"
        }`}
      >
        {/* move hand */}
        {isEdit && <div className="w-full h-full z-50 absolute"></div>}

        {/* {musicPlayerInfo.title} */}
        <div id="" className="opacity-0">
          <div id="embed-iframe" className="border-none"></div>
        </div>
        {/* <div id="playMusic"> play</div> */}
        <div className="bg-black bg-opacity-90 text-white rounded-md w-[370px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 px-3 py-3">
              <div
                className="w-24 h-24 relative rounded-md cursor-pointer"
                id="playMusic"
              >
                {/* background black opacity */}
                <div className="absolute w-full h-full bg-black opacity-30 z-20 rounded-md"></div>
                {/* middle play icon */}
                <div className="absolute w-full h-full flex items-center justify-center z-30 group">
                  {playing ? (
                    <svg
                      fill="#000000"
                      width="300px"
                      className="w-14 h-14 fill-white opacity-10 group-hover:opacity-70"
                      height="300px"
                      viewBox="-5.5 0 32 32"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>pause</title>
                      <path d="M0 6.563v18.875c0 0.531 0.438 0.969 0.969 0.969h6.625c0.5 0 0.906-0.438 0.906-0.969v-18.875c0-0.531-0.406-0.969-0.906-0.969h-6.625c-0.531 0-0.969 0.438-0.969 0.969zM12.281 6.563v18.875c0 0.531 0.438 0.969 0.938 0.969h6.625c0.531 0 0.969-0.438 0.969-0.969v-18.875c0-0.531-0.438-0.969-0.969-0.969h-6.625c-0.5 0-0.938 0.438-0.938 0.969z"></path>
                    </svg>
                  ) : (
                    <svg
                      fill="#000000"
                      width="300px"
                      className="w-14 h-14 fill-white opacity-70"
                      height="300px"
                      viewBox="-7 0 32 32"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>play</title>
                      <path d="M0 6.688v18.906c0 0.344 0.156 0.625 0.469 0.813 0.125 0.094 0.344 0.125 0.5 0.125s0.281-0.031 0.438-0.125l16.375-9.438c0.313-0.219 0.5-0.5 0.5-0.844 0-0.313-0.188-0.594-0.5-0.813l-16.375-9.438c-0.563-0.406-1.406 0.094-1.406 0.813z"></path>
                    </svg>
                  )}
                </div>
                {musicPlayerInfo.thumbnail_url && (
                  <Image
                    src={musicPlayerInfo.thumbnail_url}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-md"
                    unoptimized={true}
                    alt={musicPlayerInfo.title}
                  />
                )}
              </div>
              <div className="w-60">
                <p className="text-sm font-semibold truncate animate-marquee">
                  {musicPlayerInfo.title}
                </p>
                {/* playing */}
                <div className="text-xs text-gray-400 mb-3 py-1">
                  <p className="truncate">
                    {listMusic.items[listMusicSelect].track.name} -{" "}
                    {listMusic.items[listMusicSelect].track.artists[0].name}
                  </p>
                  <div id="persenMusic" className="h-0 w-0 opacity-0">
                    {musicProcress}
                  </div>
                  <div id="indexMusic">{listMusicSelect}</div>
                  <div id="playing" className="h-0 w-0 opacity-0">
                    {playing ? "playing" : "puase"}
                  </div>
                </div>
                {/* procress */}
                <div className="flex justify-between items-center -mt-3">
                  <div className="" id="prevMusic">
                    <svg
                      width="300px"
                      height="300px"
                      className="fill-gray-100 h-8 w-8 relative top-2 cursor-pointer"
                      viewBox="0 0 512 512"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <title>skip-back</title>
                      <g
                        id="Page-1"
                        stroke="none"
                        strokeWidth="1"
                        fill="current"
                        fillRule="evenodd"
                      >
                        <g
                          id="add"
                          transform="translate(128.000000, 128.000000)"
                        >
                          <polygon
                            id="Path"
                            points="0 0 0 256 42.6666667 256 42.6666667 128.00512 256 256 256 0 42.6666667 127.989547 42.6666667 0"
                          ></polygon>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div className="w-full h-1 bg-gray-400 rounded-full mt-4">
                    <div
                      className={`h-full bg-[#1db954] rounded-full`}
                      style={{ width: `${musicProcress}%` }}
                    ></div>
                  </div>
                  {/* rotate 180 */}
                  <div className="rotate-180" id="nextMusic">
                    <svg
                      width="300px"
                      height="300px"
                      className="fill-gray-100 h-8 w-8 relative bottom-2 cursor-pointer"
                      viewBox="0 0 512 512"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <title>skip-next</title>
                      <g
                        id="Page-1"
                        stroke="none"
                        strokeWidth="1"
                        fill="current"
                        fillRule="evenodd"
                      >
                        <g
                          id="add"
                          transform="translate(128.000000, 128.000000)"
                        >
                          <polygon
                            id="Path"
                            points="0 0 0 256 42.6666667 256 42.6666667 128.00512 256 256 256 0 42.6666667 127.989547 42.6666667 0"
                          ></polygon>
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {previewOrNot && (
            <div className="px-3 pb-2">
              <p className="text-[12px] text-gray-400 text-center">
                To listen to music more than 30 seconds please login{" "}
                <Link
                  className="text-green-500"
                  href={`https://accounts.spotify.com/en/login`}
                  target={`_blank`}
                >
                  spotify
                </Link>
                .
              </p>
            </div>
          )}
        </div>
      </div>
    </Draggable>
  );
};

export default SpotifyPlayer;
