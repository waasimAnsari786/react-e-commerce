import React from "react";

export default function Container({
  parentElemClass = "",
  childElemClass = "",
  pad = "",
  children,
}) {
  return (
    <div className={parentElemClass}>
      <div className={`${childElemClass} container mx-auto ${pad} px-3`}>
        {children}
      </div>
    </div>
  );
}
