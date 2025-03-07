import React from "react";

export default function Container({
  parentElemClass = "",
  childElemClass = "",
  pad = "px-3",
  children,
}) {
  return (
    <div className={parentElemClass}>
      <div className={`${childElemClass} container mx-auto ${pad}`}>
        {children}
      </div>
    </div>
  );
}
