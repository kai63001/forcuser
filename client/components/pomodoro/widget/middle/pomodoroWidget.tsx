/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { PomodoroV1Props, PomodoroV1State } from "../../type/pomodoroV1";

//redux
import { setTemplate } from "@/store/templateSlice";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/store";

const PomodoroWidget = () => {
  //get route path
  const router = useRouter();
  const template: PomodoroV1State = useSelector(
    (state: RootState) => state.templateSlice
  );
  const dispatch = useDispatch();

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
    if (timer <= 0) {
      clearInterval(intervalId);
      setIsStart(false);
    }
  }, [timer, intervalId]);

  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleStart = () => {
    setIsDragging(true);
  };

  const handleStop = (e: any, data: any) => {
    setPosition({ x: data.x, y: data.y });
    setIsDragging(false);
    // props.setTemplate?.({
    //   ...props.template,
    //   pomodoro: {
    //     ...props.template.pomodoro,
    //     position: { x: data.x, y: data.y },
    //   },
    // });

    //get template from redux
    dispatch(
      setTemplate({
        ...template,
        pomodoro: {
          ...template.pomodoro,
          position: { x: data.x, y: data.y },
        },
      })
    );
    // console.log("template redux", template);
  };
  const [isEdit, setIsEdit] = useState(false);

  const checkIsEdit = () => {
    if (router.pathname.includes("edit")) {
      setIsEdit(true);
      return true;
    }

    setIsEdit(false);
    return false;
  };

  const thisWidget: any = useRef(null);

  //function get max height and width
  const [maxHeight, setMaxHeight] = useState(0);
  const [maxWidth, setMaxWidth] = useState(0);
  useEffect(() => {
    checkIsEdit();
    setMaxHeight(window.innerHeight - thisWidget.current.clientHeight);
    setMaxWidth(window.innerWidth - thisWidget.current.clientWidth);

    try {
      if (
        template.pomodoro &&
        template.pomodoro.position.x !== -1 &&
        template.pomodoro.position.y !== -1
      ) {
        setPosition({
          x:
            (template?.pomodoro.position.x /
              (template?.global?.position.x - thisWidget.current.clientWidth)) *
            (window.innerWidth - thisWidget.current.clientWidth),
          y:
            (template?.pomodoro.position.y /
              (template?.global?.position.y - thisWidget.current.clientHeight)) *
            (window.innerHeight - thisWidget.current.clientHeight),
        });
        ``;
        // I GOT IT
        // (positionWidget /
        //       (oldScreenWidth - widgetWidth)) *
        //     (newScreenWidth - widgetWidth)
      } else {
        setPosition({
          x: window.innerWidth / 2 - thisWidget.current.clientWidth / 2,
          y: window.innerHeight / 2 - thisWidget.current.clientHeight / 2,
        });
      }
    } catch (error) {
      console.error(error);
      setPosition({
        x: window.innerWidth / 2 - thisWidget.current.clientWidth / 2,
        y: window.innerHeight / 2 - thisWidget.current.clientHeight / 2,
      });
    }
    //init

    //get center position
  }, []);

  const [isDragging, setIsDragging] = useState(false);

  return (
    <Draggable
      onStart={handleStart}
      onStop={handleStop}
      position={position}
      nodeRef={thisWidget}
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
        className={`absolute z-20 text-white ${
          isEdit &&
          (isDragging
            ? "cursor-grabbing opacity-80"
            : "cursor-grab opacity-100")
        }`}
      >
        {isEdit && <div className="w-full h-full z-50 absolute"></div>}
        <div className="flex flex-col items-center">
          <div className="flex space-x-5">
            {listPomodoroTab.map((item, index) => {
              return (
                <button
                  key={index}
                  onClick={() => tabSelect(index)}
                  className={` border-[3px] border-white rounded-full px-5 py-2 franger hover:bg-white hover:text-black duration-150 ${
                    tabSelectPomodoro === index
                      ? "bg-white text-black "
                      : "text-white"
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
    </Draggable>
  );
};

export default PomodoroWidget;
