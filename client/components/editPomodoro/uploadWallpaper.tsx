import Image from "next/image";

const UploadWallpaper = () => {
  //mock wallpaper data
  const wallpaperData = [
    {
      id: 1,
      url: "https://images2.alphacoders.com/130/1301855.jpg",
      type: 0,
    },
    {
      id: 2,
      url: "https://images2.alphacoders.com/130/1301855.jpg",
      type: 0,
    },
    {
      id: 3,
      url: "https://images2.alphacoders.com/130/1301855.jpg",
      type: 0,
    },
    {
      id: 4,
      url: "https://images2.alphacoders.com/130/1301855.jpg",
      type: 0,
    },
    {
      id: 5,
      url: "https://images2.alphacoders.com/130/1301855.jpg",
      type: 0,
    },
    {
        id: 5,
        url: "https://images2.alphacoders.com/130/1301855.jpg",
        type: 0,
      },{
        id: 5,
        url: "https://images2.alphacoders.com/130/1301855.jpg",
        type: 0,
      },{
        id: 5,
        url: "https://images2.alphacoders.com/130/1301855.jpg",
        type: 0,
      },{
        id: 5,
        url: "https://images2.alphacoders.com/130/1301855.jpg",
        type: 0,
      },{
      id: 5,
      url: "https://images2.alphacoders.com/130/1301855.jpg",
      type: 0,
    },
  ];

  return (
    <div className="absolute z-50 text-white left-[45px] bg-[#0f0f0f] w-2/12 h-screen px-5 py-4 top-0 overflow-y-scroll">
      <h2 className="text-2xl">Background</h2>
      <hr className="bg-gray-500 border-gray-500 my-2" />
      <h3>Custom Image</h3>
      <label htmlFor="uploadCustomImage" className="cursor-pointer">
        <div className="bg-purple-500 text-white w-full py-3 flex mt-4 items-center text-center rounded-md">
          <div className="m-auto">Upload Image</div>
        </div>
      </label>
      {/* png,jpg */}
      <input
        type="file"
        className="hidden"
        id="uploadCustomImage"
        accept="image/png, image/jpeg"
      />

      <h3 className="my-3">Recommended Wallpaper</h3>
      {/* image grid 2 */}
      <div className="flex flex-col space-y-5">
        {wallpaperData.map((wallpaper) => (
          <div key={wallpaper.id} className="rounded-md">
            <Image
              alt="wallpaper"
              src={wallpaper.url}
              width={1000}
              height={1000}
              className="rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default UploadWallpaper;
