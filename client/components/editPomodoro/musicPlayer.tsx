interface MusicPlayerProps {
  setTemplate: Function;
  template: Object;
}

const MusicPlayer = (props: MusicPlayerProps) => {
  return (
    <div className="absolute z-50 text-white left-[65px] bg-black bg-opacity-90 w-[450px] h-[70vh] px-5 py-4 top-1/2 -translate-y-1/2 rounded-md overflow-hidden">
      <h2 className="text-2xl">Music Player</h2>
      <hr className="bg-gray-500 border-gray-500 my-2" />
      {/* scroll here */}
      <div className="overflow-y-scroll h-[60vh] ">
        <div className="flex flex-col space-y-2">
          asdas
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
