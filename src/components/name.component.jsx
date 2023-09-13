import React from "react";
export default function Name(props) {
  // function checkAnswer(e) {
  //   console.log(e.target);
  // }
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={`flex  h-12 w-full cursor-pointer flex-col justify-center rounded-full  border-2 border-slate-50 bg-slate-800 
        text-slate-50 hover:border-slate-50 hover:bg-slate-700 hover:text-slate-50 active:bg-slate-700
        
        sm:mt-2
        ${props.answerClasess}
      `}
      onClick={props.checkAnswer}
      id={props.id}
      key={props.index}
    >
      <h3 id={props.id} className="m-0  p-0 text-center">
        {props.name}
      </h3>
    </div>
  );
}
