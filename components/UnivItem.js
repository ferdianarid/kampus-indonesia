/* eslint-disable indent */
import propTypes from 'prop-types'

const UnivItem = ({ img, name, address }) => {
    return (
        <>
            <style jsx>{`
                input:checked+svg {
                    display: block;
                }
            `}
            </style>
            <div className="flex items-center p-4 border-t-2 border-b-2 border-gray-300" >
                <label className="flex justify-start items-start">
                    <div className="bg-white border-2 rounded border-gray-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-primary">
                        <input type="checkbox" className="opacity-0 absolute" />
                        <svg className="fill-current hidden w-4 h-4 text-primary pointer-events-none" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z" /></svg>
                    </div>
                </label>
                <img className="ml-11" src={img} />
                <div className="ml-8 flex-grow">
                    <h3 className="font-bold">{name}</h3>
                    <h6>{address}</h6>
                </div>
                <div className="flex items-center">
                    <button className="bg-primary text-white py-2 px-5 rounded-2xl mr-2">Edit</button>
                    <button className="bg-gray-200 text-white py-2 px-2 rounded-full">
                        <img src="/icons/more-horizontal.svg" width="24px" />
                    </button>
                </div>
            </div>
        </>
    )
}

export default UnivItem
