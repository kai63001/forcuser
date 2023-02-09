import { useEffect, useState } from "react";

const PomodoroWidget = () => {
  const [listPomodoroTab, setListPomodoroTab] = useState([
    { name: "POMODORO", time: 25 * 60 },
    { name: "SHORT BREAK", time: 5 * 60 },
    { name: "LONG BREAK", time: 15 * 60 },
  ]);
  const [tabSelectPomodoro, setTabSelectPomodoro] = useState(0);
  const [timer, setTimer] = useState(25 * 60);
  const [intervalId, setIntervalId]: any = useState(null);

  const [isStart, setIsStart] = useState(false);

  const tabSelect = (index: number) => {
    setIsStart(false);
    if (intervalId) clearInterval(intervalId);
    setTabSelectPomodoro(index);
    setTimer(listPomodoroTab[index].time);
  };

  const startTimer = () => {
    //create countdown timer using setInterval start and pause
    setIsStart(true);
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    setIntervalId(interval);
    return () => clearInterval(interval);
  };

  const pauseTimer = () => {
    setIsStart(false);
    clearInterval(intervalId);
  };

  const timerShow = () => {
    const minute = Math.floor(timer / 60);
    const second = timer % 60;
    return `${minute < 10 ? "0" + minute : minute}:${
      second < 10 ? "0" + second : second
    }`;
  };

  const resetTimer = () => {
    setTimer(listPomodoroTab[tabSelectPomodoro].time);
    setIsStart(false);
    if (intervalId) clearInterval(intervalId);
  };

  useEffect(() => {
    // stop timer when time is 0
    if(timer <= 0){
        clearInterval(intervalId);
        setIsStart(false);
    }
  }, [timer]);

  return (
    <div className="absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="flex flex-col items-center">
        <div className="flex space-x-5">
          {listPomodoroTab.map((item, index) => {
            return (
              <button
                key={index}
                onClick={() => tabSelect(index)}
                className={`text-white border-[3px] border-white rounded-full px-5 py-2 franger hover:bg-white hover:text-black duration-150 ${
                  tabSelectPomodoro === index ? "bg-white text-black" : ""
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>
        <div className="text-9xl franger text-white my-6">{timerShow()}</div>
        <p className="text-xl franger text-white">
          &quot; Time management method where you work &quot;
        </p>
        <div className="flex items-center space-x-5 my-4">
          {isStart ? (
            <button
              onClick={() => pauseTimer()}
              className="text-black bg-white border-white border-[3px] rounded-full px-10 py-2 franger"
            >
              PAUSE
            </button>
          ) : (
            <button
              onClick={() => startTimer()}
              className="text-black bg-white border-white border-[3px] rounded-full px-10 py-2 franger"
            >
              START
            </button>
          )}

          <div onClick={() => resetTimer()} className="cursor-pointer">
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
  );
};

export default PomodoroWidget;
