import axios from "@/lib/axios";
import HomeCard from "./card/homeCard.components";
import { useEffect, useState } from "react";

const MyFocus = () => {
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    axios.get(`/pomodoro/my`).then((res) => {
      setData(res.data.data);
    });
  }, []);

  const getData = async () => {
    const data = await axios.get(`/pomodoro/my`);
    console.log("data", data);
  };
  getData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-5 mr-5">
      {data.map((item: any, index: number) => {
        return <HomeCard key={index} image={item.image} id={item._id} />;
      })}
    </div>
  );
};

export default MyFocus;
