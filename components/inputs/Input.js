import React from "react";

const Input = React.forwardRef(
  ({ label, containerProps, labelProps, errorMessage, ...props }, ref) => {
    return (
      <div className="flex flex-col mb-7 relative" {...containerProps}>
        <label className="text-xl mb-2 text-primary" {...labelProps}>
          {label}
        </label>
        <input
          ref={ref}
          type="text"
          className={`px-2 py-2 border border-2 focus:outline-none focus:border-primary ${
            errorMessage && "focus:border-red-500 border-red-400"
          }`}
          {...props}
        />
        {errorMessage && (
          <span className="absolute -mb-5 text-red-400 bottom-0">
            {errorMessage}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
