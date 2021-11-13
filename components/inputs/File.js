import React from "react";

const File = React.forwardRef(({ label, labelProps, ...props }, ref) => {
  return (
    <div className="flex flex-col mt-5 mb-6">
      <label className="text-xl mb-3 text-primary" {...labelProps}>
        {label}
      </label>
      <input ref={ref} type="file" {...props} />
    </div>
  );
});

File.displayName = "File";

export default File;
