import HomeCard from "./card/homeCard.components";

const MyFocus = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-5 mr-5">
      <HomeCard />
      <HomeCard />
      <HomeCard />
      <HomeCard />
      <HomeCard />
    </div>
  );
};

export default MyFocus;
