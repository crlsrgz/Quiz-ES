import React, { useEffect, useState } from "react";
import names from "../data/names";
import Name from "../components/name.component";

export default function SectionText(props) {
  const [answer, setAnswer] = useState("0");
  const [disabledButton, setDisabledButton] = useState(``);
  useEffect(() => {
    setAnswer("1");
  }, []);

  function checkAnswer(e) {
    if (e.target.id === answer) {
      e.target.classList.add("bg-red-900");

      disableButtonsAfterRightAnswer();
    } else {
      e.target.classList.add("bg-blue-900");
      e.target.classList.add("disabled");
      e.target.classList.add("cursor-default");
    }
  }

  function disableButtonsAfterRightAnswer(e) {
    setDisabledButton("bg-blue-900 disabled cursor-default");
  }
  return (
    <div
      className={`section-container m-12 mx-auto ${props.classes} w-4/5 flex-col justify-center gap-8`}
    >
      <div className="mx-auto">
        <h1 className="mt-8 text-left font-sans font-semibold text-blue-50">
          &quot;Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Blanditiis adipisci tenetur sit fugit, labore commodi hic? Modi, sunt
          beatae. Minus.&quot;
        </h1>
      </div>
      <div className="mx-auto mt-6 flex w-11/12 flex-col gap-4">
        {names.map((name, index) => {
          return (
            <Name
              name={name}
              key={index}
              id={index}
              answerClasses={index.toString() !== answer ? disabledButton : ""}
              checkAnswer={checkAnswer}
            />
          );
        })}
      </div>
    </div>
  );
}
