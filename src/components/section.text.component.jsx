import React, { useEffect, useState } from "react";
// import names from "../data/names";
import Name from "../components/name.component";
// import Connection from "../connections/connection";

export default function SectionText(props) {
  /* ::::::::: Connection ::::::::: */
  // let quoteData = Connection();

  /*:: Temporary data ::*/
  // eslint-disable-next-line react-hooks/exhaustive-deps
  let quoteData = {
    quote: "Enséñame el rostro de tu madre y te diré quien eres.",
    answer: 0,
    authors: ["Henri Mondor", "Joseph Unger", "Simone Signoret", "Jack Gould"],
  };
  /*:: Temporary data ::*/

  const newNames = quoteData.authors;
  const [answer, setAnswer] = useState(quoteData.authors.toString());
  const [disabledButton, setDisabledButton] = useState(``);
  useEffect(() => {
    setAnswer(quoteData.answer.toString());
  }, [quoteData]);
  /* ::::::::: Connection END ::::::::: */

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

  function disableButtonsAfterRightAnswer() {
    setDisabledButton("bg-blue-900 disabled cursor-default");
  }
  return (
    <div
      className={`section-container m-12 mx-auto ${props.classes} w-4/5 flex-col justify-center gap-8`}
    >
      <div className="mx-auto">
        <h1 className="mt-8 text-left font-sans font-semibold text-blue-50">
          {quoteData.quote}
          {/* &quot;Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Blanditiis adipisci tenetur sit fugit, labore commodi hic? Modi, sunt
          beatae. Minus.&quot; */}
        </h1>
      </div>
      <div className="mx-auto mt-6 flex w-11/12 flex-col gap-4">
        {newNames.map((name, index) => {
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
