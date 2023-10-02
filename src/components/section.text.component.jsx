import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
// import names from "../data/names";
import Name from "../components/name.component";
import ButtonNext from "./button.next.component";
// import Connection from "../connections/connection";
import MainScoreContext from "./context.MainScore";
import TriesLeftContext from "./context.triesLeft";
import GamesPlayedContext from "./context.GamesPlayed";
import HeartCounter from "./element.heartCounter.component";
import AuthorsInfoContext from "./context.AuthorsInfo";
import QuoteDataContext from "./context.quoteData";
import GameOverContext from "./context.GameOver";

export default function SectionText(props) {
  /* ::::::::: Connection ::::::::: */
  // let quoteData = Connection();

  /*:: Temporary data ::*/
  /*:: CONTEXT TESTING ::*/
  const [gameOverStatus, setGameOverStatus] = useContext(GameOverContext);
  const [gamesPlayed, setGamesPlayed] = useContext(GamesPlayedContext);
  const [mainScore, setMainScore] = useContext(MainScoreContext);
  const [triesLeft, setTriesLeft] = useContext(TriesLeftContext);
  const [authorsInfo, setAuthorsInfo] = useContext(AuthorsInfoContext);
  const [quoteData, setQuoteData] = useContext(QuoteDataContext);

  /*:: Temporary data ::*/

  /*:: CONTEXT TESTING ::*/

  /* ::::::::: Localstorage ::::::::: */
  let arrayAlreadyClicked;

  arrayAlreadyClicked = JSON.parse(localStorage["user"])["answered"];
  const arrayAlreadyClickedLength = arrayAlreadyClicked.length;

  /* ::::::::: Localstorage ::::::::: */

  const newNames = quoteData[gamesPlayed].authors ?? null;
  const [answer, setAnswer] = useState(
    quoteData[gamesPlayed].authors.toString(),
  );

  useEffect(() => {
    setAnswer(quoteData[gamesPlayed].answer.toString());
  }, [quoteData, gamesPlayed]);
  /* ::::::::: Connection END ::::::::: */

  /* ::::::::: Buttons states ::::::::: */
  const classesInitialState = `null cursor-pointer text-zinc-100 hover:border-zinc-300 hover:bg-zinc-300 hover:text-zinc-700 `;
  const classesRightAnswer = `right cursor-not-allowed text-zinc-100 bg-red-500`;
  const classesWrongAnswer = `wrong cursor-not-allowed text-zinc-500 border-zinc-500 disabled`;

  const [disabledButtons, setDisabledButtons] = useState([
    triesLeft === 0 ? true : false,
    triesLeft === 0 ? true : false,
    triesLeft === 0 ? true : false,
    triesLeft === 0 ? true : false,
  ]);

  const [nextButtonDisplay, setNextButtonDisplay] = useState("hidden");

  //: Control if next question button is displayed if page is changed
  useEffect(() => {
    triesLeft === 0 && gamesPlayed < 3
      ? setNextButtonDisplay("")
      : setNextButtonDisplay("hidden");
  }, [triesLeft]);

  const [scorePageButtonDisplay, setScorePageButtonDisplay] =
    useState("hidden");

  const buttonInitialArray = [];
  useEffect(() => {
    for (let i = 0; i < arrayAlreadyClickedLength; i++) {
      if (
        (quoteData[gamesPlayed].answer !== i &&
          arrayAlreadyClicked[i] === true) ||
        triesLeft === 0
      ) {
        buttonInitialArray[i] = classesWrongAnswer;
        console.log("first");
      } else if (
        quoteData[gamesPlayed].answer === i &&
        arrayAlreadyClicked[i] === true
      ) {
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

  // const [quoteTextSize, setQuoteTextSize] = useState("text-3xl");
  const [quoteTextSize, setQuoteTextSize] = useState("text-3xl");
  const [quoteLength, setQuoteLength] = useState(
    quoteData[gamesPlayed]["quote"].length,
  );
  console.log(
    ` Main Score: ${mainScore}, Left tries: ${triesLeft}, Games played ${gamesPlayed}, quote length ${quoteLength}`,
  );

  useEffect(() => {
    console.log(typeof quoteData[gamesPlayed]["quote"].length);
    if (quoteData[gamesPlayed]["quote"].length < 55) {
      setQuoteTextSize("text-3xl");
    } else if (
      quoteData[gamesPlayed]["quote"].length > 55 &&
      quoteLength < 120
    ) {
      setQuoteTextSize("text-2xl");
    } else if (quoteData[gamesPlayed]["quote"].length > 100) {
      setQuoteTextSize("text-xl");
    } else {
      setQuoteTextSize("text-xl");
    }
  }, [quoteLength]);

  function checkAnswer(e) {
    if (triesLeft < 1) {
      return;
    }
    //:: Is the Right answer clicked
    if (e.target.id === answer) {
      if (triesLeft < 1) {
        const tempArrayDisableButtonsArray = [...disabledButtons];
        tempArrayDisableButtonsArray[e.target.id] = true;
        setDisabledButtons(tempArrayDisableButtonsArray);
      }
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
      // gamesPlayed < 2
      //   ? setNextButtonDisplay("")
      //   : setNextButtonDisplay("hidden");
      setNextButtonDisplay("");

      gamesPlayed >= 2
        ? setScorePageButtonDisplay("")
        : setScorePageButtonDisplay("hidden");
      /*:: Update the score and games played  ::*/
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
          gamesPlayed: gamesPlayed,
          tries: triesLeft,
        }),
      );
      //: Remove remainng tries
      setTriesLeft(0);

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
          gamesPlayed: gamesPlayed,
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
        for (let i = 0; i < arrayAlreadyClickedLength; i++) {
          arrayAlreadyClicked[i] = true;
        }

        localStorage.setItem(
          "user",
          JSON.stringify({
            answered: arrayAlreadyClicked,
            score: mainScore,
            gamesPlayed: gamesPlayed,
            tries: triesLeft,
          }),
        );
        /*:: The next button should appear to go to the next part ::*/
        // gamesPlayed < 2
        //   ? setNextButtonDisplay("")
        //   : setNextButtonDisplay("hidden");
        setNextButtonDisplay("");

        gamesPlayed >= 2
          ? setScorePageButtonDisplay("")
          : setScorePageButtonDisplay("hidden");

        const tempArrayFinalDisableButtons = [true, true, true, true];
        setDisabledButtons(tempArrayFinalDisableButtons);
      }
      // Disabled the clicked button
      const tempArrayDisableButtonsArray = [...disabledButtons];
      tempArrayDisableButtonsArray[e.target.id] = true;
      setDisabledButtons(tempArrayDisableButtonsArray);
    }
  }

  // useEffect(() => {
  //   console.log(disabledButtons);
  // }, [disabledButtons]);

  function loadNextQuote() {
    let tempGamesPlayed = gamesPlayed <= 1 ? gamesPlayed + 1 : gamesPlayed;
    setGamesPlayed(tempGamesPlayed);

    // tempIndex ws created to prrof an error, it can be written inside the tempQuoteLenght
    let tempIndex = gamesPlayed < 2 ? gamesPlayed + 1 : gamesPlayed;
    let tempQuoteLenght = quoteData[tempIndex]["quote"].length;
    setQuoteLength(tempQuoteLenght);

    for (let i = 0; i < 4; i++) {
      buttonInitialArray[i] = classesInitialState;
    }
    setButtonState(buttonInitialArray);

    setDisabledButtons([false, false, false, false]);

    setGamesPlayed(gamesPlayed + 1);
    setTriesLeft(3);

    localStorage.setItem(
      "user",
      JSON.stringify({
        answered: [false, false, false, false],
        score: mainScore,
        gamesPlayed: gamesPlayed,
        tries: triesLeft,
      }),
    );
    // if (gamesPlayed < 1) {
    //   setNextButtonDisplay("hidden");
    // }
  }

  console.log(
    `Main Score: ${mainScore} / 
    Games Played ${gamesPlayed} /
    left tries ${triesLeft}
    gameOverStatus ${gameOverStatus}
    `,
  );

  if (gameOverStatus === false) {
    console.log(`Games played ${typeof gamesPlayed}`);
    return (
      <div
        className={`section-container m-12 mx-auto ${props.classes} w-4/5 flex-col justify-center gap-8`}
      >
        <div className="mx-auto">
          <h1
            className={`mt-16 text-left font-besley ${quoteTextSize} font-semibold text-blue-50`}
          >
            &quot;{quoteData[gamesPlayed].quote}&quot;
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

          <HeartCounter triesLeft={triesLeft} />

          <Link to="/score">
            <ButtonNext
              textContent={""}
              visible={nextButtonDisplay}
              loadNextQuote={loadNextQuote}
            />
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={`section-container m-12 mx-auto ${props.classes} w-4/5 flex-col justify-center gap-8`}
      >
        <div className="mx-auto">
          <h1
            className={`mt-16 text-left font-besley text-xl font-semibold text-blue-50`}
          >
            End
          </h1>
        </div>
      </div>
    );
  }
}
