import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/store";
import { setTemplate } from "@/store/templateSlice";
import { PomodoroV1State } from "../../type/pomodoroV1";
import Draggable from "react-draggable";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable as DraggableTodo,
} from "react-beautiful-dnd";

import TodoWidget from "./Todo";
import { useRouter } from "next/router";

const hashString = (str: any) => {
  let hash = 0,
    i,
    chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

const ToDoListV1 = () => {
  const router = useRouter();

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

  const [todoList, setTodoList] = useState([
    {
      id: "task-1",
      content: "Take out the garbage",
    },
    {
      id: "task-2",
      content: "Watch my favorite show",
    },

    {
      id: "task-3",
      content: "Charge my phone",
    },
  ]);

  const tasks = useMemo(() => {
    return todoList.map((task) => {
      return {
        id: hashString(task),
        content: task,
      };
    });
  }, [todoList]);

  const reorderTasks = (tasks: any, startIndex: any, endIndex: any) => {
    const result = [...tasks];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const getItemStyle = (
    isDragging: any,
    draggableStyle: any,
    transform: any
  ) => {
    return {
      // change background colour if dragging
      // background: isDragging ? "red" : "black",
      //style follow mouse
      ...draggableStyle,
      transform,
    };
  };

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorderTasks(
      todoList,
      result.source.index,
      result.destination.index
    );

    setTodoList(items);
  };
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleStart = () => {
    setIsDragging(true);
  };

  const handleStop = (e: any, data: any) => {
    setPosition({ x: data.x, y: data.y });
    setIsDragging(false);
    dispatch(
      setTemplate({
        ...template,
        todolist: {
          ...template.todolist,
          position: { x: data.x, y: data.y },
        },
      })
    );
  };

  const checkIsEdit = () => {
    if (router.pathname.includes("edit")) {
      setIsEdit(true);
      return true;
    }

    setIsEdit(false);
    return false;
  };

  useEffect(() => {
    checkIsEdit();
    setMaxHeight(window.innerHeight - thisWidget.current.clientHeight);
    setMaxWidth(window.innerWidth - thisWidget.current.clientWidth);

    try {
      if (
        template.todolist &&
        template.todolist.position.x !== -1 &&
        template.todolist.position.y !== -1
      ) {
        setPosition({
          x:
            (template?.todolist.position.x /
              (template?.global?.position.x - thisWidget.current.clientWidth)) *
            (window.innerWidth - thisWidget.current.clientWidth),
          y:
            (template?.todolist.position.y /
              (template?.global?.position.y - thisWidget.current.clientHeight)) *
            (window.innerHeight - thisWidget.current.clientHeight),
        });
        ``;
        // I GOT IT
        // (positionWidget /
        //       (oldScreenWidth - widgetWidth)) *
        //     (newScreenWidth - widgetWidth)
      } else {
        console.log("no position")
        setPosition({
          x: 15,
          y: 15,
        });
      }
    } catch (error) {
      console.error(error);
      setPosition({
        x: 15,
          y: 15,
      });
    }
    //init

    //get center position
  }, []);

  return (
    // todotList
    <Draggable
      onStart={handleStart}
      disabled={!isEdit}
      nodeRef={thisWidget}
      onStop={handleStop}
      position={position}
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
        className={`absolute z-40 text-white rounded-md ${
          isDragging ? "bg-black bg-opacity-50" : "bg-black bg-opacity-90"
        } resize overflow-hidden min-w-[370px] min-h-[200px]`}
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
        <div className="">
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between">
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="w-full"
                    >
                      {tasks.map((task, index) => (
                        <DraggableTodo
                          key={task.content.id}
                          draggableId={task.content.id}
                          index={index}
                        >
                          {(provided: any, snapshot: any) => {
                            let transform =
                              provided.draggableProps.style.transform;
                            if (snapshot.isDragging) {
                              let regex = new RegExp(
                                "translate\\((.*?)px, (.*?)px\\)"
                              );
                              let parentValues = regex.exec(
                                thisWidget.current.style.transform || ""
                              );
                              let childValues = regex.exec(
                                provided.draggableProps.style.transform || ""
                              );
                              //fix bug when drag out of parent
                              if (childValues != null && parentValues != null) {
                                let x =
                                  parseInt(childValues[1]) -
                                  parseInt(parentValues[1]);
                                let y =
                                  parseInt(childValues[2]) -
                                  parseInt(parentValues[2]);
                                transform = `translate(${x}px, ${y}px)`;
                              }
                            }
                            return (
                              <div
                                className="flex flex-col w-full"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style,
                                  transform
                                )}
                              >
                                <TodoWidget todo={task.content.content} />
                              </div>
                            );
                          }}
                        </DraggableTodo>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default ToDoListV1;
