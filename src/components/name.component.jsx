import React from "react";
export default function Name(props) {
  // function checkAnswer(e) {
  //   console.log(e.target);
  // }
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <button
      className={`m-0  flex h-12 w-full cursor-pointer flex-col justify-center  rounded-full 
        border-2 p-0  text-center text-blue-50 transition duration-200 md:mt-2 md:w-2/5
        ${props.answerClasses} ${props.classesLocalStorage}
      `}
      onClick={props.checkAnswer}
      id={props.id}
      key={props.index}
      disabled={props.disabledButton}
    >
      {props.name}
    </button>
  );
}
