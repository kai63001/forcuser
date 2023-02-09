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

  const getDataSpotify = async () => {
    const data = await axios.get(
      `https://open.spotify.com/oembed?url=${musicUrl}`
    );
    console.log(data.data);
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
            console.log(e);
            // @ts-ignore
            return console.log(
              `${parseInt(e.data.position / 1000, 10)} s : ${parseInt(
                e.data.duration / 1000,
                10
              )} s`
            );
          });
          document.querySelectorAll("#playMusic").forEach((episode: any) => {
            episode.addEventListener("click", () => {
              EmbedController.loadUri("spotify:track:49qEikVVPd6PgH6S2pbXjZ");
              EmbedController.play();
            });
          });
        };
        IFrameAPI.createController(element, options, callback);
      };
    };
  }, []);

  return (
    <div
      id="leftBottom"
      className="absolute z-20 left-0 bottom-0 text-white ml-10 mb-10"
    >
      {musicPlayerInfo.title}
      <div id="embed-iframe" className="border-none"></div>
      <div id="playMusic"> play</div>
    </div>
  );
};

export default SpotifyPlayer;
