import React, { ReactNode } from "react";

interface Props {
  label?: string;
  labelProps?: any;
  errorMessage?: ReactNode;
}

const TextArea = React.forwardRef<any, Props>(
  ({ label, labelProps, errorMessage, children, ...props }, ref) => {
    return (
      <div className="flex flex-col mt-5 mb-7 relative">
        <label className="text-xl mb-2" {...labelProps}>
          {label}
        </label>
        <textarea
          ref={ref}
          className={`w-full px-2 py-2 border focus:border-primary ${
            errorMessage && "focus:border-red-500 border-red-400"
          }`}
          {...props}
        >
          {children}
        </textarea>
        {errorMessage && (
          <span className="absolute -mb-5 text-red-400 bottom-0">
            {errorMessage}
          </span>
        )}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;
