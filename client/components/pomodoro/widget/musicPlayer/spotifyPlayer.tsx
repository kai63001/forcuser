import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import spotifyMusic from "./mock/spotify.json";

interface MusicPlayerInfoInterface {
  title: string;
  description: string;
  thumbnail_url: string;
}

const SpotifyPlayer = () => {
  const musicUrl = "https://open.spotify.com/playlist/4Zjli1P13J5mmSCD5iKAXK";

  const [listMusic, setListMusic]: any = useState(spotifyMusic);
  const [listMusicSelect, setListMusicSelect] = useState(0);
  const [musicPlayerInfo, setMusicPlayerInfo] =
    useState<MusicPlayerInfoInterface>({
      title: "",
      description: "",
      thumbnail_url: "",
    });

  const [musicProcress, setMusicProcress] = useState(0);

  const getDataSpotify = async () => {
    const data = await axios.get(
      `https://open.spotify.com/oembed?url=${musicUrl}`
    );
    console.log('data', data.data);
    setMusicPlayerInfo(data.data);
  };

  useEffect(() => {
    getDataSpotify();
    const script = document.createElement("script");
    script.src = "https://open.spotify.com/embed-podcast/iframe-api/v1";
    script.async = true;
    document.body.appendChild(script);
    console.log(listMusic.items[listMusicSelect].track.uri);
    script.onload = () => {
      // @ts-ignore
      window.onSpotifyIframeApiReady = (IFrameAPI: any) => {
        let element = document.getElementById("embed-iframe");
        let options = {
          width: "100%",
          height: "80",
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
              //@ts-ignore
              document.querySelector("#indexMusic").innerHTML = next.toString();
              setListMusicSelect(listMusicSelect + 1);
              EmbedController.loadUri(listMusic.items[next].track.uri);
              EmbedController.play();
              setListMusicSelect(next);
              setTimeout(() => {
                nexting = false;
              }, 4000);
            }
            console.log("percent: ", percent);
            // console.log(parseInt((e.data.position / 1000).toString(), 10));
            // return console.log(
            //   `${parseInt(e.data.position/ 1000, 10)} s : ${parseInt(
            //     e.data.duration / 1000,
            //     10
            //   )} s`
            // );
          });
          document.querySelectorAll("#playMusic").forEach((episode: any) => {
            episode.addEventListener("click", () => {
              console.log("play")
              EmbedController.loadUri(
                listMusic.items[listMusicSelect].track.uri
              );
              EmbedController.play();
            });
          });
        };
        IFrameAPI.createController(element, options, callback);
      };
    };
    console.log("musicProcress", musicProcress);
  },[]);

  return (
    <div
      id="leftBottom"
      className="absolute z-20 left-0 bottom-0 text-white ml-10 mb-10"
    >
      {/* {musicPlayerInfo.title} */}
      <div id="" className="opacity-0">
        <div id="embed-iframe" className="border-none"></div>
      </div>
      {/* <div id="playMusic"> play</div> */}
      <div className="bg-[#282828] text-white rounded-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 px-3 py-3">
            <div className="w-24 h-24 relative rounded-md" id="playMusic">
              <Image
                src={musicPlayerInfo.thumbnail_url}
                fill
                style={{ objectFit: "cover" }}
                className="rounded-md"
                unoptimized={true}
                alt={musicPlayerInfo.title}
              />
            </div>
            <div className="w-60">
              <div className="text-sm font-semibold">
                {musicPlayerInfo.title}
              </div>
              {/* playing */}
              <div className="text-xs text-gray-400 py-2">
                {listMusic.items[listMusicSelect].track.name} -{" "}
                {listMusic.items[listMusicSelect].track.artists[0].name}
                <div id="indexMusic">{listMusicSelect}</div>
              </div>
              {/* procress */}
              <div className="w-full h-1 bg-gray-400 rounded-full mt-4">
                <div
                  className={`h-full bg-[#1db954] rounded-full`}
                  style={{ width: `${musicProcress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotifyPlayer;
