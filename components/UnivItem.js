import MyCheckbox from "./MyCheckbox";

const UnivItem = ({ id, img, name, address, isChecked, onChangeCheck }) => {
    return (
        <>
            <div className="flex items-center p-4 border-t-2 border-b-2 border-gray-300">
                <MyCheckbox
                    name={id}
                    isChecked={isChecked}
                    onChange={onChangeCheck}
                />
                <img className="ml-11" src={img} />
                <div className="ml-8 flex-grow">
                    <h3 className="font-bold">{name}</h3>
                    <h6>{address}</h6>
                </div>
                <div className="flex items-center">
                    <button className="bg-primary text-white py-2 px-5 rounded-2xl mr-2">
                        Edit
                    </button>
                    <button className="bg-gray-200 text-white py-2 px-2 rounded-full">
                        <img src="/icons/more-horizontal.svg" width="24px" />
                    </button>
                </div>
            </div>
        </>
    );
};

export default UnivItem;
