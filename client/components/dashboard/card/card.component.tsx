import Image from "next/image";

const CardComponent = (props: any) => {
  return (
    <div className="bg-white shadow-md rounded-md relative w-full h-48">
      <Image
        src={"/screenshot/demo.png"}
        alt="Picture of the author"
        quality={100}
        width={500}
        height={100}
        className="rounded-md"

      />
    </div>
  );
};
export default CardComponent;
