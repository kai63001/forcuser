import Image from "next/image";

const PomodoroV1 = () => {
  const preventDragHandler = (e: any) => {
    e.preventDefault();
  };
  return (
    <div className="h-screen w-full">
      <div className="relative h-full block" onDragStart={preventDragHandler}>
        {/* setting */}
        <div
          id="setting"
          className="absolute z-20 right-0 text-white mr-10 mt-10 cursor-pointer"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.9332 27.3334L10.2665 23.1334C9.84428 22.9779 9.39984 22.7667 8.93317 22.5001C8.4665 22.2334 8.05539 21.9556 7.69984 21.6667L3.7665 23.4667L0.666504 18.0001L4.2665 15.3667C4.22206 15.1667 4.19428 14.939 4.18317 14.6834C4.17206 14.4279 4.1665 14.2001 4.1665 14.0001C4.1665 13.8001 4.17206 13.5723 4.18317 13.3167C4.19428 13.0612 4.22206 12.8334 4.2665 12.6334L0.666504 10.0001L3.7665 4.53341L7.69984 6.33341C8.05539 6.04453 8.4665 5.76675 8.93317 5.50008C9.39984 5.23341 9.84428 5.03341 10.2665 4.90008L10.9332 0.666748H17.0665L17.7332 4.86675C18.1554 5.0223 18.6054 5.22786 19.0832 5.48341C19.5609 5.73897 19.9665 6.0223 20.2998 6.33341L24.2332 4.53341L27.3332 10.0001L23.7332 12.5667C23.7776 12.789 23.8054 13.0279 23.8165 13.2834C23.8276 13.539 23.8332 13.7779 23.8332 14.0001C23.8332 14.2223 23.8276 14.4556 23.8165 14.7001C23.8054 14.9445 23.7776 15.1779 23.7332 15.4001L27.3332 18.0001L24.2332 23.4667L20.2998 21.6667C19.9443 21.9556 19.5387 22.239 19.0832 22.5167C18.6276 22.7945 18.1776 23.0001 17.7332 23.1334L17.0665 27.3334H10.9332ZM13.9998 18.3334C15.1998 18.3334 16.2221 17.9112 17.0665 17.0667C17.9109 16.2223 18.3332 15.2001 18.3332 14.0001C18.3332 12.8001 17.9109 11.7779 17.0665 10.9334C16.2221 10.089 15.1998 9.66675 13.9998 9.66675C12.7998 9.66675 11.7776 10.089 10.9332 10.9334C10.0887 11.7779 9.6665 12.8001 9.6665 14.0001C9.6665 15.2001 10.0887 16.2223 10.9332 17.0667C11.7776 17.9112 12.7998 18.3334 13.9998 18.3334ZM13.9998 16.3334C13.3554 16.3334 12.8054 16.1056 12.3498 15.6501C11.8943 15.1945 11.6665 14.6445 11.6665 14.0001C11.6665 13.3556 11.8943 12.8056 12.3498 12.3501C12.8054 11.8945 13.3554 11.6667 13.9998 11.6667C14.6443 11.6667 15.1943 11.8945 15.6498 12.3501C16.1054 12.8056 16.3332 13.3556 16.3332 14.0001C16.3332 14.6445 16.1054 15.1945 15.6498 15.6501C15.1943 16.1056 14.6443 16.3334 13.9998 16.3334ZM12.5332 25.3334H15.4665L15.9332 21.6001C16.6665 21.4223 17.3609 21.1445 18.0165 20.7667C18.6721 20.389 19.2665 19.9334 19.7998 19.4001L23.3332 20.9334L24.6665 18.5334L21.5332 16.2334C21.6221 15.8556 21.6943 15.4834 21.7498 15.1167C21.8054 14.7501 21.8332 14.3779 21.8332 14.0001C21.8332 13.6223 21.8109 13.2501 21.7665 12.8834C21.7221 12.5167 21.6443 12.1445 21.5332 11.7667L24.6665 9.46675L23.3332 7.06675L19.7998 8.60008C19.2887 8.0223 18.7109 7.53897 18.0665 7.15008C17.4221 6.76119 16.7109 6.51119 15.9332 6.40008L15.4665 2.66675H12.5332L12.0665 6.40008C11.3109 6.55564 10.6054 6.8223 9.94984 7.20008C9.29428 7.57786 8.71095 8.04453 8.19984 8.60008L4.6665 7.06675L3.33317 9.46675L6.4665 11.7667C6.37761 12.1445 6.30539 12.5167 6.24984 12.8834C6.19428 13.2501 6.1665 13.6223 6.1665 14.0001C6.1665 14.3779 6.19428 14.7501 6.24984 15.1167C6.30539 15.4834 6.37761 15.8556 6.4665 16.2334L3.33317 18.5334L4.6665 20.9334L8.19984 19.4001C8.73317 19.9334 9.32761 20.389 9.98317 20.7667C10.6387 21.1445 11.3332 21.4223 12.0665 21.6001L12.5332 25.3334Z"
              fill="white"
            />
          </svg>
        </div>
        {/* fullscreen */}
        <div
          id="fullscreen"
          className="absolute z-20 right-0 bottom-0 text-white mr-10 mb-10 cursor-pointer"
        >
          <svg
            width="25"
            height="25"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 14V9.175H1.5V12.5H4.825V14H0ZM0 4.825V0H4.825V1.5H1.5V4.825H0ZM9.175 14V12.5H12.5V9.175H14V14H9.175ZM12.5 4.825V1.5H9.175V0H14V4.825H12.5Z"
              fill="white"
            />
          </svg>
        </div>
        {/* left bottom */}
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
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
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
        </div>
        {/* position absolute middle of center */}
        <div className="absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col items-center">
            <div className="flex space-x-5">
              <button className="text-black bg-white border-white border-[3px] rounded-full px-5 py-2 franger">
                POMODORO
              </button>
              <button className="text-white border-[3px] border-white rounded-full px-5 py-2 franger hover:bg-white hover:text-black duration-150">
                SHORT BREAK
              </button>
              <button className="text-white border-[3px] border-white rounded-full px-5 py-2 franger hover:bg-white hover:text-black duration-150">
                LONG BREAK
              </button>
            </div>
            <div className="text-9xl franger text-white my-6">25:00</div>
            <p className="text-xl franger text-white">
              &quot; Time management method where you work &quot;
            </p>
            <div className="flex items-center space-x-5 my-4">
              <button className="text-black bg-white border-white border-[3px] rounded-full px-10 py-2 franger">
                START
              </button>
              <div className="cursor-pointer">
                <svg
                  width="43"
                  height="37"
                  viewBox="0 0 43 37"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.0832674 18.5C0.0832674 21.0521 0.559658 23.4425 1.51244 25.6714C2.46521 27.9002 3.77528 29.8483 5.44264 31.5156C7.11 33.183 9.05809 34.4931 11.2869 35.4458C13.5157 36.3986 15.9062 36.875 18.4583 36.875L18.4583 33.8125C14.2048 33.8125 10.5893 32.3238 7.61191 29.3464C4.63448 26.3689 3.14577 22.7535 3.14577 18.5C3.14577 14.2465 4.63448 10.6311 7.61191 7.65364C10.5893 4.67621 14.2048 3.1875 18.4583 3.1875C22.7117 3.1875 26.3272 4.63368 29.3046 7.52604C32.2821 10.4184 33.7708 13.9913 33.7708 18.2448L33.7708 19.4187L30.0447 15.6927L27.901 17.7854L35.4041 25.2885L42.9072 17.7854L40.8145 15.6927L36.8333 19.674L36.8333 18.5C36.8333 15.9479 36.3569 13.5575 35.4041 11.3286C34.4513 9.09982 33.1413 7.15174 31.4739 5.48437C29.8065 3.81701 27.8584 2.50695 25.6296 1.55417C23.4008 0.601391 21.0103 0.125 18.4583 0.125C15.9062 0.125 13.5157 0.60139 11.2869 1.55417C9.05809 2.50695 7.11 3.81701 5.44264 5.48437C3.77528 7.15173 2.46521 9.09982 1.51244 11.3286C0.559658 13.5575 0.0832675 15.9479 0.0832674 18.5Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        {/* make image transition black */}
        <div className="absolute z-10 top-0 left-0 w-full h-full bg-black opacity-20"></div>

        <Image
          src="/demo/demo.jpg"
          alt="Focuser Background"
          unoptimized={true}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
  );
};

export default PomodoroV1;