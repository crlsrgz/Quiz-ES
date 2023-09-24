import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
// import names from "../data/names";
import Name from "../components/name.component";
import ButtonNext from "./button.next.component";
// import Connection from "../connections/connection";
import MainScoreContext from "./context.MainScore";
import TriesLeftContext from "./context.triesLeft";

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

  /*:: CONTEXT TESTING ::*/

  const [mainScore, setMainScore] = useContext(MainScoreContext);
  const [triesLeft, setTriesLeft] = useContext(TriesLeftContext);

  console.log(` Main Score: ${mainScore}, Left tries: ${triesLeft}`);

  /*:: CONTEXT TESTING ::*/

  /* ::::::::: Localstorage ::::::::: */
  let arrayAlreadyClicked;

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
  const classesWrongAnswer = `wrong cursor-not-allowed text-zinc-500 border-zinc-500 disabled`;
  const [disabledButtons, setDisabledButtons] = useState([
    false,
    false,
    false,
    false,
  ]);

  const [nextButtonDisplay, setNextButtonDisplay] = useState("hidden");

  const buttonInitialArray = [];
  useEffect(() => {
    for (let i = 0; i < arrayAlreadyClickedLength; i++) {
      if (
        (quoteData.answer !== i && arrayAlreadyClicked[i] === true) ||
        triesLeft === 0
      ) {
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
    //:: Is the Right answer clicked
    if (e.target.id === answer) {
      /*:: Create a temporary array using the buttonState and corresponging classes to the wrong answers ::*/
      /*:: Add the corresponding classses to the right answer ::*/
      /*:: Set the state for the buttons ::*/
      const tempArray = [...buttonState];
      for (let i = 0; i < arrayAlreadyClickedLength; i++) {
        if (i !== answer) {
          tempArray[i] = classesWrongAnswer;
        }
      }
      tempArray[answer] = classesRightAnswer;

      setButtonState(tempArray);

      /*:: The next button should appear to go to the next part ::*/
      setNextButtonDisplay("");
      /*:: Update the score  ::*/
      setMainScore(mainScore + 1);
      /*:: LOCAL STORAGE ::*/
      /*:: Update the already clicked array, all elements to true ::*/
      /*:: Update localstorage ::*/

      for (let i = 0; i < arrayAlreadyClickedLength; i++) {
        arrayAlreadyClicked[i] = true;
      }
      localStorage.setItem(
        "user",
        JSON.stringify({
          answered: arrayAlreadyClicked,
          score: mainScore,
          tries: triesLeft,
        }),
      );

      /*:: Disable all Buttons ::*/
      setDisabledButtons([true, true, true, true]);
    } else {
      arrayAlreadyClicked[e.target.id] = true;

      const tempArray = [...buttonState];
      tempArray[e.target.id] = classesWrongAnswer;
      setButtonState(tempArray);

      let tempTries;
      triesLeft !== 0 ? (tempTries = triesLeft - 1) : (tempTries = 0);

      setTriesLeft(tempTries);

      localStorage.setItem(
        "user",
        JSON.stringify({
          answered: arrayAlreadyClicked,
          score: mainScore,
          tries: tempTries,
        }),
      );

      // Checke if Tries are 0 to end game
      if (tempTries === 0) {
        let tempArrayDisableButtons = [];

        for (let i = 0; i < arrayAlreadyClickedLength; i++) {
          tempArrayDisableButtons[i] = classesWrongAnswer;
        }

        setButtonState(tempArrayDisableButtons);
        setDisabledButtons(true);
        for (let i = 0; i < arrayAlreadyClickedLength; i++) {
          arrayAlreadyClicked[i] = true;
        }

        localStorage.setItem(
          "user",
          JSON.stringify({
            answered: arrayAlreadyClicked,
            score: mainScore,
            tries: triesLeft,
          }),
        );
        console.log("game over");
      }
      // Disabled the clicked button
      const tempArrayDisableButtonsArray = [...disabledButtons];
      tempArrayDisableButtonsArray[e.target.id] = true;
      setDisabledButtons(tempArrayDisableButtonsArray);
    }
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
              disabled={disabledButtons[index]}
            />
          );
        })}
        <div className="mt-8 flex flex-row-reverse">
          <div className={`mx-4 h-6 w-6`}>
            {triesLeft < 3 ? (
              <Icon
                className=" text-zinc-500"
                icon="mdi:heart-outline"
                width={24}
                height={24}
              />
            ) : (
              <Icon
                className="text-zinc-100"
                icon="mdi:cards-heart"
                width={24}
                height={24}
              />
            )}
          </div>
          <div className={`mx-4 h-6 w-6`}>
            {triesLeft < 2 ? (
              <Icon
                className=" text-zinc-500"
                icon="mdi:heart-outline"
                width={24}
                height={24}
              />
            ) : (
              <Icon
                className="text-zinc-100"
                icon="mdi:cards-heart"
                width={24}
                height={24}
              />
            )}
          </div>
          <div className={`mx-4 h-6 w-6`}>
            {triesLeft < 1 ? (
              <Icon
                className=" text-zinc-500"
                icon="mdi:heart-outline"
                width={24}
                height={24}
              />
            ) : (
              <Icon
                className="text-zinc-100"
                icon="mdi:cards-heart"
                width={24}
                height={24}
              />
            )}
          </div>
        </div>

        <Link to="/score/">
          <ButtonNext visible={nextButtonDisplay} />
        </Link>
      </div>
    </div>
  );
}
