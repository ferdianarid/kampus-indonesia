import MyCheckbox from "./MyCheckbox";
import Image from "next/image";

const UnivItem = ({ id, img, name, address, isChecked, onChangeCheck }) => {
  return (
    <>
      <div className="flex items-center p-4 border-t-2 border-b-2 border-gray-300">
        <MyCheckbox name={id} isChecked={isChecked} onChange={onChangeCheck} />
        <Image
          className="ml-11"
          width={87}
          height={64}
          objectFit="contain"
          alt="Image Univ"
          src={img}
        />
        <div className="ml-8 flex-grow">
          <h3 className="font-bold">{name}</h3>
          <h6>{address}</h6>
        </div>
        <div className="flex items-center">
          <button className="bg-primary text-white py-2 px-5 rounded-2xl mr-2">
            Edit
          </button>
          <button className="w-[40px] h-[40px] flex items-center justify-center bg-gray-200 text-white rounded-full">
            <Image
              src="/icons/more-horizontal.svg"
              alt="Icon more"
              width={"24px"}
              height={"24px"}
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default UnivItem;
