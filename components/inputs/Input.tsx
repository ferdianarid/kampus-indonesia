import React from "react";

interface Props {
  label?: string;
  containerProps?: any;
  labelProps?: string;
  errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ label, containerProps, labelProps, errorMessage, ...props }, ref) => {
    return (
      <div className="flex flex-col relative" {...containerProps}>
        <label className="text-xl mb-2 text-primary" {...labelProps}>
          {label}
        </label>
        <input
          ref={ref}
          type="text"
          className={`px-2 py-1 border-2 focus:outline-none focus:border-primary ${
            errorMessage && "focus:border-red-500 border-red-400"
          }`}
          {...props}
        />
        {errorMessage && (
          <span className="absolute -mb-6 text-red-400 bottom-0">
            {errorMessage}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
