const MyCheckbox = ({ name, label, value, onChange, isChecked }) => {
  return (
    <div className="flex items-center">
      <style jsx>
        {`
          input:checked + svg {
            display: block;
          }
        `}
      </style>
      <label className="flex justify-start items-start">
        <div className="bg-white border-2 rounded border-gray-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-primary">
          <input
            id="selectAll"
            name={name}
            // checked={isChecked}
            onChange={onChange}
            value={value}
            type="checkbox"
            className="opacity-0 absolute"
          />
          <svg
            className="fill-current hidden w-4 h-4 text-primary pointer-events-none"
            viewBox="0 0 20 20"
          >
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
        </div>
      </label>
      <label htmlFor="selectAll" className="text-lg ml-2 select-none">
        {label}
      </label>
    </div>
  );
};

export default MyCheckbox;
