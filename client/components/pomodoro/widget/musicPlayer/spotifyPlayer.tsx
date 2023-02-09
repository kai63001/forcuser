import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const SpotifyPlayer = () => {
  const iframeRef: any = useRef(null);
  const [player, setPlayer]: any = useState(null);
  const [currentTrack, setCurrentTrack] = useState({});

  return (
    <div
      id="leftBottom"
      className="absolute z-20 left-0 bottom-0 text-black mr-10 mb-10"
    >
      <div className="w-50 bg-[#282828] text-white bg-opacity-90 pl-2 py-2 pr-5 rounded-r-md flex space-x-5">
        <div className="rounded-md w-[70px] h-[70px] relative">
          <Image
            src="https://yt3.googleusercontent.com/ytc/AL5GRJWis3QuBATheMfFwgp49xMcOdM0xuNGm1CqM4Gb=s88-c-k-c0x00ffffff-no-rj"
            alt="Music Logo"
            fill
            className="rounded-md"
            style={{ objectFit: "cover" }}
            unoptimized={true}
          />
          {/* center absolute */}
          <div
            // onClick={() => play()}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <svg width="50" height="50" className="-mt-2 cursor-pointer">
              <polygon points="15,20 35,30 15,40" fill="#ffffff" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <p className="font-bold">매일 공부하고 집중할 음악이 필요해</p>
            <p className="text-sm">Lofi 코딩</p>
          </div>
          {/* progress */}
          <div className="flex items-center">
            <div className="w-1/2 h-1 bg-white rounded-md mt-2">
              <div className="w-1/2 h-full bg-green-400 rounded-md"></div>
            </div>
            <p className="text-[12px] ml-1 mt-2">-19:28</p>
          </div>
        </div>
      </div>
      <iframe
        src="https://open.spotify.com/embed/playlist/4Zjli1P13J5mmSCD5iKAXK"
        ref={iframeRef}
        width="100%"
        height="352"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default SpotifyPlayer;
