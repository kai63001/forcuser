import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/store";
import { setTemplate } from "@/store/templateSlice";
import { PomodoroV1State } from "../../type/pomodoroV1";
import Draggable from "react-draggable";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const ToDoListV1 = () => {
  const template: PomodoroV1State = useSelector(
    (state: RootState) => state.templateSlice
  );
  const dispatch = useDispatch();

  const [isDragging, setIsDragging] = useState(false);

  const [isEdit, setIsEdit] = useState(true);

  const thisWidget: any = useRef(null);

  //function get max height and width
  const [maxHeight, setMaxHeight] = useState(0);
  const [maxWidth, setMaxWidth] = useState(0);
  useEffect(() => {
    setMaxHeight(window.innerHeight - thisWidget.current.clientHeight);
    setMaxWidth(window.innerWidth - thisWidget.current.clientWidth);
  }, []);

  //resizer
  const resizer = useCallback(() => {
    setMaxHeight(window.innerHeight - thisWidget.current.clientHeight);
    setMaxWidth(window.innerWidth - thisWidget.current.clientWidth);
  }, []);

  return (
    // todotList
    <Draggable
      disabled={!isEdit}
      nodeRef={thisWidget}
      handle="#head"
      bounds={{
        top: 0,
        left: 0,
        right: maxWidth,
        bottom: maxHeight,
      }}
    >
      <div
        ref={thisWidget}
        onMouseUpCapture={resizer}
        className={`absolute z-40 text-white rounded-md bg-black bg-opacity-90 resize overflow-auto min-w-[370px] min-h-[200px]`}
      >
        <div
          id="head"
          className={`px-6 py-3  border-b border-gray-500 ${
            isEdit &&
            (isDragging
              ? "cursor-grabbing opacity-80"
              : "cursor-grab opacity-100")
          } `}
        >
          My Tasks
        </div>
        <div className="p-6">
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between">
              <div className="flex items-center mr-4 space-x-2">
                <input
                  id="red-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 rounded-sm ease-soft text-base checked:bg-gradient-to-tl checked:bg-red-400 duration-250 relative cursor-pointer appearance-none border border-solid border-slate-150 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100"
                />
                <div>asdasd</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default ToDoListV1;
