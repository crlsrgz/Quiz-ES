import React from "react";
export default function Name(props) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions

    <button
      className={`m-auto flex h-10 w-full flex-row items-center  justify-center rounded-full
      border-2 p-0 text-center font-alata  text-xl   transition  duration-500 md:mt-2 md:w-4/5 lg:w-3/5
        ${props.answerClasses} ${props.classesLocalStorage}
        `}
      onClick={props.checkAnswer}
      id={props.id}
      key={props.index}
      disabled={props.disabled}
    >
      {props.name}
    </button>
  );
}
