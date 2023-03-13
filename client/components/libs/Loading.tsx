import Image from "next/image";
import { useEffect, useState } from "react";

const Loading = () => {
  const [image, setImage] = useState(1);
  useEffect(() => {
    //random image 1-5
    const random = Math.floor(Math.random() * 5) + 1;
    setImage(random);
  }, []);

  return (
    <div className="w-screen h-screen bg-black">
      {/* middle screen */}
      <div className="flex justify-center items-center h-full">
        <div className="flex flex-col items-center space-y-5 text-white">
          <Image
            src={`/loading/imager/${image}.png`}
            alt="Picture of the author"
            className="animate-bounce"
            width={100}
            height={100}
          />
        </div>
      </div>
    </div>
  );
};

export default Loading;
