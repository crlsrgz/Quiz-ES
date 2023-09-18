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
    // quote:
    //   "Enséñame el rostro de tu madre y te diré quien eres. Enséñame el rostro de tu madre y te diré quien eres.",
    // quote:
    //   "Enséñame el rostro de tu madre y te diré quien eres. Enséñame el rostro de tu madre y te diré quien eres. Enséñame el rostro de tu madre y te diré quien eres.",
    answer: 0,
    authors: ["Henri Mondor", "Joseph Unger", "Simone Signoret", "Jack Gould"],
  };
  /*:: Temporary data ::*/

  /* ::::::::: Localstorage ::::::::: */
  let arrayAlreadyClicked;

  if (!localStorage["user"]) {
    localStorage.setItem(
      "user",
      JSON.stringify({ answered: [false, false, false, false] }),
    );
  }
  arrayAlreadyClicked = JSON.parse(localStorage["user"])["answered"];
  const arrayAlreadyClickedLength = arrayAlreadyClicked.length;

  /* ::::::::: Localstorage ::::::::: */

  const newNames = quoteData.authors;
  const [answer, setAnswer] = useState(quoteData.authors.toString());
  const [disabledButton, setDisabledButton] = useState(``);
  const [rightAnswerButton, setRightAnswerButton] = useState("");

  useEffect(() => {
    setAnswer(quoteData.answer.toString());
  }, [quoteData]);
  /* ::::::::: Connection END ::::::::: */

  const [quoteTextSize, setQuoteTextSize] = useState("text-3xl");
  const [quoteLength, setQuoteLength] = useState(quoteData["quote"].length);

  useEffect(() => {
    if (quoteLength > 110) {
      setQuoteTextSize("text-xl");
    } else if (quoteLength > 60) {
      setQuoteTextSize("text-2xl");
    } else {
      setQuoteTextSize("text-3xl");
    }
  }, [quoteData, quoteLength]);

  function checkAnswer(e) {
    if (e.target.id === answer) {
      if (e.target.disabled === true) {
        e.preventDefault();
      }
      setRightAnswerButton("bg-red-500 disabled cursor-default");
      disableButtonsAfterRightAnswer();
      e.target.disabled = true;

      for (let i = 0; i < arrayAlreadyClickedLength; i++) {
        arrayAlreadyClicked[i] = true;
      }

      localStorage.setItem(
        "user",
        JSON.stringify({ answered: arrayAlreadyClicked }),
      );

      console.log("right answe");
    } else {
      e.target.classList.add("bg-blue-900");
      e.target.classList.add("disabled");
      e.target.classList.add("cursor-default");
      e.target.disabled = true;
      console.log(e.target.disabled);
      arrayAlreadyClicked[e.target.id] = true;
      localStorage.setItem(
        "user",
        JSON.stringify({ answered: arrayAlreadyClicked }),
      );
    }
    console.log(arrayAlreadyClicked);
  }

  function disableButtonsAfterRightAnswer() {
    setDisabledButton("bg-blue-900 disabled cursor-default");
  }

  return (
    <div
      className={`section-container m-12 mx-auto ${props.classes} w-4/5 flex-col justify-center gap-8`}
    >
      <div className="mx-auto">
        <h1
          className={`mt-16 text-left font-serif ${quoteTextSize} font-semibold text-blue-50`}
        >
          &quot;{quoteData.quote}&quot;
        </h1>
      </div>
      <div className="mx-auto mt-8 flex w-11/12 flex-col gap-4">
        {newNames.map((name, index) => {
          return (
            <Name
              name={name}
              key={index}
              id={index}
              disabled={true}
              stateClasses={
                arrayAlreadyClicked[index] === true &&
                index.toString() !== answer
                  ? "bg-blue-900"
                  : arrayAlreadyClicked[index] === true &&
                    index.toString() === answer
                  ? "bg-red-500"
                  : ""
              }
              answerClasses={
                index.toString() !== answer
                  ? disabledButton
                  : index.toString() === answer
                  ? rightAnswerButton
                  : ""
              }
              checkAnswer={checkAnswer}
            />
          );
        })}
      </div>
    </div>
  );
}
