import Loading from "@/components/libs/Loading";
import PomodoroV1 from "@/components/pomodoro/pomodoroV1";
import { PomodoroV1State } from "@/components/pomodoro/type/pomodoroV1";
import axios from "axios";
import { useEffect, useState } from "react";

const FocusMain = (props: any) => {
  // const [template, setTemplate] = useState<PomodoroV1State>({
  //   wallpaper: {
  //     type: 0,
  //     url: "",
  //   },
  // });
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   getDataFromId();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const getDataFromId = async () => {
  //   try {
  //     const data = await axios.get(`/pomodoro/get/${props.id}`);
  //     console.log("getData2", data);
  //     setTemplate(data.data.data.template);
  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error)
  //   }
  // };

  // if (loading) {
  //   return <Loading/>;
  // }


  return (
    <div className="w-full">
      <PomodoroV1 template={props.template} />
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const { id } = context.query;

  const data = await axios.get(`${process.env.NEXT_PUBLIC_API_URL_DOCKER}/pomodoro/get/${id}`);

  return {
    props: {
      id: id,
      template: data.data.data.template,
    },
  };
}

export default FocusMain;
