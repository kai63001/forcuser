import Toast from "@/lib/toast";
import Image from "next/image";

interface UploadWallpaperProps {
  setTemplate: Function;
  template: Object;
}

const UploadWallpaper = (props: UploadWallpaperProps) => {
  //mock wallpaper data
  const wallpaperData = [
    {
      id: 1,
      url: "https://images2.alphacoders.com/130/1301855.jpg",
      type: 0,
    },
    {
      id: 2,
      url: "https://images2.alphacoders.com/130/1300189.jpg",
      type: 0,
    },
    {
      id: 3,
      url: "https://images2.alphacoders.com/130/1301855.jpg",
      type: 0,
    },
    {
      id: 4,
      url: "https://focuserimage.s3.us-east-2.amazonaws.com/screenshot/fb90520fa4974d789a97542e505ae6d9.webp",
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
    },
  ];

  const selectWallpaper = (id: number, url: string) => {
    props.setTemplate({
      ...props.template,
      wallpaper: {
        type: 1,
        url: url,
      },
    });
  };

  const uploadImage = (e: any) => {
    const file = e.target.files[0];
    console.log(file);
    if (!validateImageType(file)) {
      Toast.fire({
        icon: "error",
        title: "Invalid image type",
      });
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      props.setTemplate({
        ...props.template,
        wallpaper: {
          type: 0,
          url: reader.result,
        },
      });
    };
    console.log("props.template", props.template);
  };

  const validateImageType = (file: any) => {
    const validTypes = ["image/png", "image/jpeg"];
    if (validTypes.indexOf(file.type) === -1) {
      return false;
    }
    return true;
  };

  return (
    <div className="absolute z-50 text-white left-[45px] bg-[#0f0f0f] w-80 h-screen px-5 py-4 top-0 overflow-y-scroll">
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
        onChange={uploadImage}
      />
      <span className="text-xs block mt-2 text-gray-400">
        Limit 10 MB {`(JPG,PNG)`}
      </span>
      <span className="text-xs block text-gray-400">
        {" "}
        GIF format, please subscribe to our service.
      </span>

      <div className="flex space-x-4">
        <h3 className="my-3 cursor-pointer border-b-2">Recommended</h3>
        <h3 className="my-3 cursor-pointer">GIFs</h3>
      </div>
      {/* image grid 2 */}
      <div className="flex flex-col space-y-5">
        {wallpaperData.map((wallpaper, index) => (
          <div
            key={index}
            className="rounded-md cursor-pointer"
            onClick={() => selectWallpaper(wallpaper.id, wallpaper.url)}
          >
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
