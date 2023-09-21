import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

  useEffect(() => {
    setAnswer(quoteData.answer.toString());
  }, [quoteData]);
  /* ::::::::: Connection END ::::::::: */
  /* ::::::::: Buttons states ::::::::: */
  const classesInitialState = `null cursor-pointer text-zinc-100 hover:border-zinc-300 hover:bg-zinc-300 hover:text-zinc-700 `;
  const classesRightAnswer = `right cursor-not-allowed text-zinc-100 bg-red-500`;
  const classesWrongAnswer = `wrong cursor-not-allowed text-zinc-500 border-zinc-500`;

  const [nextButtonDisplay, setNextButtonDisplay] = useState("hidden");

  const buttonInitialArray = [];
  useEffect(() => {
    for (let i = 0; i < arrayAlreadyClickedLength; i++) {
      if (quoteData.answer !== i && arrayAlreadyClicked[i] === true) {
        buttonInitialArray[i] = classesWrongAnswer;
        console.log("first");
      } else if (quoteData.answer === i && arrayAlreadyClicked[i] === true) {
        buttonInitialArray[i] = classesRightAnswer;
        setNextButtonDisplay("");
        console.log("second");
      } else if (!arrayAlreadyClicked[i]) {
        buttonInitialArray[i] = classesInitialState;
        console.log("third");
      } else {
        setNextButtonDisplay("hidden");
      }
    }
  }, []);

  const [buttonState, setButtonState] = useState(buttonInitialArray);

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
      const tempArray = [...buttonState];
      for (let i = 0; i < arrayAlreadyClickedLength; i++) {
        if (i !== answer) {
          tempArray[i] = classesWrongAnswer;
        }
      }
      tempArray[answer] = classesRightAnswer;

      setButtonState(tempArray);
      setNextButtonDisplay("");
      for (let i = 0; i < arrayAlreadyClickedLength; i++) {
        arrayAlreadyClicked[i] = true;
      }

      localStorage.setItem(
        "user",
        JSON.stringify({ answered: arrayAlreadyClicked }),
      );
    } else {
      arrayAlreadyClicked[e.target.id] = true;

      const tempArray = [...buttonState];
      tempArray[e.target.id] = classesWrongAnswer;
      setButtonState(tempArray);

      localStorage.setItem(
        "user",
        JSON.stringify({ answered: arrayAlreadyClicked }),
      );
    }
    console.log(arrayAlreadyClicked);
  }

  return (
    <div
      className={`section-container m-12 mx-auto ${props.classes} w-4/5 flex-col justify-center gap-8`}
    >
      <div className="mx-auto">
        <h1
          className={`mt-16 text-left font-besley ${quoteTextSize} font-semibold text-blue-50`}
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
              classesLocalStorage={buttonState[index]}
              checkAnswer={checkAnswer}
            />
          );
        })}
      </div>
      <div>
        <Link to="/score/">
          <ButtonNext visible={nextButtonDisplay} />
        </Link>
      </div>
    </div>
  );
}
