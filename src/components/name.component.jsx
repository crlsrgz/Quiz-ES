import React from "react";
export default function Name(props) {
  return (
    <div
      className="
        c flex  h-12 w-full cursor-pointer flex-col justify-center rounded-full  border-2 border-slate-50 bg-slate-800 
        text-slate-50 hover:border-slate-50 hover:bg-slate-700 hover:text-slate-50 active:bg-slate-700
        
        sm:mt-2"
    >
      <h3 key={props.index} className="m-0  p-0 text-center">
        {props.name}
      </h3>
    </div>
  );
}
