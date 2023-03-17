import Loading from "@/components/libs/Loading";
import PomodoroV1 from "@/components/pomodoro/pomodoroV1";
import { PomodoroV1State } from "@/components/pomodoro/type/pomodoroV1";
import axios from "axios";
import { useEffect, useState } from "react";
import { setTemplate } from "@/store/templateSlice";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/store";

const FocusMain = (props: any) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTemplate(props.template));
  }, [dispatch, props.template]);

  return (
    <div className="w-full">
      <PomodoroV1 />
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const { id } = context.query;

  const data = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL_DOCKER}/pomodoro/get/${id}`
  );

  return {
    props: {
      id: id,
      template: data.data.data.template,
    },
  };
}

export default FocusMain;
