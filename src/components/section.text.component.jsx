import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
// import names from "../data/names";
import Name from "../components/name.component";
import ButtonNext from "./button.next.component";
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
      setRightAnswerButton(
        `bg-red-500 disabled cursor-default before:content-['-']`,
      );
      disableButtonsAfterRightAnswer();
      e.target.disabled = true;

      for (let i = 0; i < arrayAlreadyClickedLength; i++) {
        arrayAlreadyClicked[i] = true;
      }

      localStorage.setItem(
        "user",
        JSON.stringify({ answered: arrayAlreadyClicked }),
      );
    } else {
      e.target.classList.remove("text-zinc-100");
      e.target.classList.add("text-zinc-500");
      e.target.classList.add("border-zinc-500");
      e.target.classList.add("disabled");
      e.target.classList.add("cursor-default");
      e.target.disabled = true;

      arrayAlreadyClicked[e.target.id] = true;

      localStorage.setItem(
        "user",
        JSON.stringify({ answered: arrayAlreadyClicked }),
      );
    }
    e.preventDefault();
  }

  function disableButtonsAfterRightAnswer() {
    setDisabledButton("text-zinc-500 disabled cursor-default");
  }

  return (
    <div
      className={`section-container m-12 mx-auto ${props.classes} w-4/5 flex-col justify-center gap-8`}
    >
      <div className="mx-auto">
        <h1
          className={`font-besley mt-16 text-left ${quoteTextSize} font-semibold text-blue-50`}
        >
          &quot;{quoteData.quote}&quot;
        </h1>
      </div>
      <div className="mx-auto mt-8 flex w-11/12 flex-col items-center justify-center gap-4">
        {newNames.map((name, index) => {
          return (
            <Name
              name={name}
              key={index}
              id={index}
              classesLocalStorage={
                arrayAlreadyClicked[index] === true &&
                index.toString() !== answer
                  ? "text-zinc-500 border-zinc-500"
                  : arrayAlreadyClicked[index] === true &&
                    index.toString() === answer
                  ? "bg-red-500 text-zinc-100 before:content-['-']"
                  : "text-zinc-100"
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
      <div>
        <ButtonNext />
      </div>
    </div>
  );
}
