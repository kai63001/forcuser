const UploadWallpaper = () => {
  return (
    <div className="absolute z-50 text-white left-[45px] bg-[#0f0f0f] w-2/12 h-screen px-5 py-4 top-0">
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
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-gray-500 h-24 rounded-md"></div>
        <div className="bg-gray-500 h-24 rounded-md"></div>
        <div className="bg-gray-500 h-24 rounded-md"></div>
        <div className="bg-gray-500 h-24 rounded-md"></div>
      </div>
    </div>
  );
};
export default UploadWallpaper;
