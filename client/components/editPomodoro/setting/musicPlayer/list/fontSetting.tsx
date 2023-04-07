const FontSetting = () => {
  return (
    <>
      <p>Fonts Color</p>
      <div className="flex items-center space-x-2 relative">
        <label
          htmlFor="bgColor"
          className="w-10 h-10 rounded-md ring-2 ring-white border-2 border-black bg-white cursor-pointer hover:ring-2 hover:ring-gray-400 hover:border-2 duration-150"
        />
        <input
          id="bgColor"
          type="color"
          className="w-0 h-0 absolute top-8 -left-2 opacity-0"
        />
      </div>
    </>
  )
}

export default FontSetting
