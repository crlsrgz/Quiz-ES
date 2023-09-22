import React from "react";
export default function Name(props) {
  // function checkAnswer(e) {
  //   console.log(e.target);
  // }
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions

    <button
      className={`m-auto flex h-10 w-full flex-row items-center  justify-center rounded-full
      border-2 p-0 text-center font-alata  text-xl   transition  duration-500 md:mt-2 md:w-2/5
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
