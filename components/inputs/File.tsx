import React from "react";
import { LabelHTMLAttributes } from "react";

interface Props {
  label?: string;
  containerClassName?: string;
  labelProps?: LabelHTMLAttributes<HTMLElement>;
}

const File = React.forwardRef<HTMLInputElement, Props>(
  ({ label, containerClassName, labelProps, ...props }, ref) => {
    return (
      <div className={`flex flex-col ${containerClassName}`}>
        <label className="text-xl mb-3 text-primary" {...labelProps}>
          {label}
        </label>
        <input ref={ref} type="file" {...props} />
      </div>
    );
  }
);

File.displayName = "File";

export default File;
