interface MusicPlayerProps {
  setTemplate: Function;
  template: Object;
}

const MusicPlayer = (props:MusicPlayerProps) => {
  return (
    <div className="absolute z-50 text-white left-[45px] bg-[#0f0f0f] w-80 h-screen px-5 py-4 top-0 overflow-y-scroll">
      <h2 className="text-2xl">Music Player</h2>
      <hr className="bg-gray-500 border-gray-500 my-2" />
    </div>
  );
};

export default MusicPlayer;
