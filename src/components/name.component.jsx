import { Icon } from "@iconify/react";
import React from "react";
export default function Name(props) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions

    <button
      className={`m-auto flex h-10 w-full flex-row  items-center justify-center rounded-full
      border-2 p-0 text-center font-alata  text-base  transition  duration-1000 md:mt-2 md:w-4/5 lg:w-3/5
        ${props.answerClasses} ${props.classesLocalStorage}
        `}
      onClick={props.checkAnswer}
      id={props.id}
      key={props.index}
      disabled={props.disabled}
    >
      <span className=" mr-auto w-1/12 p-2">{props.iconAnswer}</span>
      {props.name}
      <span className="float-right ml-auto mr-1 w-1/12 self-end p-2">
        {"\u00A0"}
      </span>
    </button>
  );
}
