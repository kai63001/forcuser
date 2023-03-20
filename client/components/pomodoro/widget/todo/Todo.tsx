const TodoWidget = (props: any) => {

    const handleHightArea = (e: any) => {
        let target = e.target;
        let height = target.scrollHeight == 40 ? 20 : target.scrollHeight;
        target.style.height = height + "px";

        console.log("height: ", height);

    };

    
  return (
    <div className="pl-6 py-1.5 w-full flex hover:bg-gray-500 group text-sm pr-2">
      {/* todo */}
      <div className="w-full flex items-start">
        <input
          type="checkbox"
          className="w-4 h-4 ease-soft rounded-sm mt-1 bg-transparent text-base rounded-1.4 checked:bg-gradient-to-tl checked:from-purple-900 checked:to-purple-800 after:text-xxs after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 relative float-left cursor-pointer appearance-none border border-solid border-slate-150 bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100"
        />
        <textarea
          className="w-full pt-0 bg-transparent text-white placeholder-gray-400 focus:outline-none resize-none pl-2 overflow-hidden h-[20px]"
          onChange={handleHightArea}
          onLoad={handleHightArea}
        >{props.todo}</textarea>
      </div>
      {/* todo */}
      <div className="flex items-center justify-center w-6 h-6 ml-2 text-gray-400 group-hover:text-white opacity-0 group-hover:opacity-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 cursor-pointer hover:bg-red-400 rounded-sm"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
    </div>
  );
};
export default TodoWidget;
