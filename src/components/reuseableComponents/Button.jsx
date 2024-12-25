import React from "react";

export default function Button({
  children,
  bgColor = "bg-black",
  textColor = "text-white",
  padding = "px-4 py-1",
  myClass = "",
  ...props
}) {
  return (
    <button
      className={`${bgColor} ${textColor} ${myClass} rounded-lg transition-all duration-300 ${padding}`}
      {...props}
    >
      {children}
    </button>
  );
}
