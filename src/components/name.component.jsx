import React from "react";
export default function Name(props) {
  return (
    <div className="block w-full cursor-pointer rounded-full border-2  border-slate-50 bg-slate-900 text-slate-50 hover:border-slate-50 hover:bg-slate-800 hover:text-slate-50  sm:mt-4">
      <h3 key={props.index} className="m-0 mt-2 h-12  p-0 text-center">
        {props.name}
      </h3>
    </div>
  );
}
