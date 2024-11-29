import React, { forwardRef, useEffect, useId } from "react";
import { toast } from "react-toastify";

const Select = forwardRef(({ options = [], label, error, ...props }, ref) => {
  const id = useId();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="w-full">
      <label htmlFor={id} className="block mb-1 font-medium">
        {label}
      </label>
      <div className="flex justify-between">
        <select
          id={id}
          ref={ref}
          {...props}
          className="border rounded px-2 py-1 w-full"
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
});

export default Select;
