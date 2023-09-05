import React from "react";
export default function Name(props) {
  return (
    <h3
      key={props.index}
      className="m-0 mt-4 h-12 cursor-pointer p-0 text-center text-slate-700 hover:text-slate-900 sm:mt-8"
    >
      {props.name}
    </h3>
  );
}
