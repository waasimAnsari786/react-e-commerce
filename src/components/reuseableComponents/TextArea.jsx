import React, { forwardRef, useId } from "react";

function TextArea({ myClass = "", label, ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      <label htmlFor={id}>{label}</label>
      <div className="flex items-center justify-between bg-white p-4 rounded-lg my-3 shadow-md shadow-gray-500">
        <textarea
          id={id}
          {...props}
          ref={ref}
          className={`w-full text-black ${myClass} bg-transparent outline-none focus:outline-none`}
        ></textarea>
      </div>
    </div>
  );
}

export default forwardRef(TextArea);
