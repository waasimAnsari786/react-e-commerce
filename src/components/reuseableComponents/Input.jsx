import React, { forwardRef, useEffect, useId } from "react";
import { toast } from "react-toastify";

const Input = forwardRef(
  (
    {
      type = "text",
      inpClass = "",
      label,
      icon = "",
      error,
      parentDiv = "bg-white p-4 rounded-lg my-3 shadow-input",
      ...props
    },
    ref
  ) => {
    const id = useId();
    useEffect(() => {
      error && toast.error(error);
    }, [error]);

    return (
      <div
        className={
          (type === "radio" && "flex justify-between") ||
          (type === "checkbox" &&
            "flex flex-row-reverse justify-end items-center my-2 gap-2") ||
          "w-full"
        }
      >
        <label className="text-white" htmlFor={id}>
          {label}
        </label>
        <div className={`flex items-center justify-between ${parentDiv}`}>
          <input
            type={type}
            className={`w-2/3 text-amber-800 ${inpClass} bg-transparent outline-none focus:outline-none placeholder:text-amber-800`}
            {...props}
            id={id}
            ref={ref}
          />
          {icon}
        </div>
      </div>
    );
  }
);

export default Input;
