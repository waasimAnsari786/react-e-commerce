import React from "react";

export default function MyTypoGraphy({ children, myClass = "" }) {
  return <p className={`${myClass}`}>{children}</p>;
}
