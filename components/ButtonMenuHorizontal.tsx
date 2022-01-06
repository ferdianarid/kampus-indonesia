import Image from "next/image";

const ButtonMenuHorizontal = () => {
  return (
    <button className="w-[40px] h-[40px] flex items-center justify-center bg-gray-200 text-white py-1 px-1 rounded-full">
      <Image
        src="/icons/more-horizontal.svg"
        alt="Icon menu"
        width={"24px"}
        height={"24px"}
      />
    </button>
  );
};

export default ButtonMenuHorizontal;
