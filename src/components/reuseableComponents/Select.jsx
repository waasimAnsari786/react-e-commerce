import React, { forwardRef, useEffect, useId } from "react";
import { toast } from "react-toastify";

const Select = ({ options = [], label, props, error }, ref) => {
  const id = useId();
  useEffect(() => {
    error && toast.error(error);
  }, [error]);
  return (
    <div className="w-full">
      <label htmlFor={id}>{label}</label>
      <div className="flex justify-between">
        <select id={id} ref={ref} {...props}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default forwardRef(Select);
