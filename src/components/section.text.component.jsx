import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
// import names from "../data/names";
import Name from "../components/name.component";
import ButtonNext from "./button.next.component";
import HeartCounter from "./element.heartCounter.component";

import setLocalStorage from "./localstorage.function";

import GameStatusContext from "./context.GameStatus";
import QuoteDataContext from "./context.QuoteData";

/* ::::::::: Buttons states ::::::::: */
const classesInitialState = `null cursor-pointer text-zinc-100 hover:border-zinc-300 hover:bg-zinc-300 hover:text-zinc-700 `;
const classesRightAnswer = `right cursor-not-allowed text-zinc-100 bg-red-500`;
const classesWrongAnswer = `wrong cursor-not-allowed text-zinc-500 border-zinc-500 disabled`;

export default function SectionText(props) {
  const [gameStatus, setGameStatus] = useContext(GameStatusContext);
  const [quoteData, setQuoteData] = useContext(QuoteDataContext);

  /*:: Prepare Local Storage ::*/

  // userId, arrayAnswered, score, gamesPlayed, tries, won, played, lastPlayed
  if (!localStorage["user"]) {
    localStorage.setItem(
      "user",
      setLocalStorage("#", [false, false, false, false], 0, 0, 3, 0, 0, "date"),
    );
  }

  //: get Gamestatus info
  const [statusAnswered, setStatusAnswered] = useState(
    JSON.parse(localStorage.getItem(["user"]))["answered"],
  );

  const [statusScore, setStatusScore] = useState(gameStatus["score"]);
  const [statusGamesPlayed, setStatusGamesPlayed] = useState(
    JSON.parse(localStorage.getItem(["user"]))["gamesPlayed"],
  );
  const [statusTries, setStatusTries] = useState(gameStatus["tries"]);
  const [statusPlayedHistory, setPlayedHistory] = useState(
    gameStatus["playedHistory"],
  );

  const [gameQuotes, setGameQuotes] = useState(
    quoteData.gameQuotes[statusGamesPlayed]["quote"],
  );
  const [quoteAnswer, setQuoteAnswer] = useState(
    quoteData.gameQuotes[statusGamesPlayed]["answer"],
  );
  const [newNames, setNewNames] = useState(
    quoteData.gameQuotes[statusGamesPlayed]["authors"],
  );
  useEffect(() => {
    setGameQuotes(quoteData.gameQuotes[statusGamesPlayed]["quote"]);
    setQuoteAnswer(quoteData.gameQuotes[statusGamesPlayed]["answer"]);
    setNewNames(quoteData.gameQuotes[statusGamesPlayed]["authors"]);
  }, [quoteData]);
  //: Set initial state
  let classesInitialStateArray = ["", "", "", ""];
  for (let i = 0; i < statusAnswered.length; i++) {
    if (statusAnswered[i] === true && i === quoteAnswer) {
      classesInitialStateArray[i] = classesRightAnswer;
    }
    if (statusAnswered[i] === true && i !== quoteAnswer) {
      classesInitialStateArray[i] = classesWrongAnswer;
    }
    if (statusAnswered[i] !== true) {
      classesInitialStateArray[i] = classesInitialState;
    }
  }

  function checkAnswer(e) {
    //: Set clicked/answerd to true
    const clickedButton = parseInt(e.target.id);
    let tempStatusAnswered = [...statusAnswered];

    if (clickedButton === quoteAnswer) {
      tempStatusAnswered = statusAnswered.map((item, index) => {
        return true;
      });
    } else {
      tempStatusAnswered[clickedButton] = true;
    }

    setStatusAnswered(tempStatusAnswered);
    localStorage.setItem(
      "user",
      setLocalStorage(
        "#",
        tempStatusAnswered,
        0,
        statusGamesPlayed,
        3,
        0,
        0,
        "date",
      ),
    );
  }

  function loadNextQuote() {
    let tempStatusGamesPlayed = statusGamesPlayed;
    tempStatusGamesPlayed = statusGamesPlayed + 1;

    localStorage.setItem(
      "user",
      setLocalStorage(
        "#",
        statusAnswered,
        0,
        tempStatusGamesPlayed,
        3,
        0,
        0,
        "date",
      ),
    );
  }

  return (
    <div
      className={`section-container m-12 mx-auto ${props.classes} w-4/5 flex-col justify-center gap-8 md:w-1/2`}
    >
      <div className="mx-auto">
        <h1
          className={`mt-16 text-left font-besley ${"150"} font-semibold text-blue-50`}
        >
          &quot;{gameQuotes}&quot;
        </h1>
      </div>

      <div className="mx-auto mt-8 flex w-11/12 flex-col items-center justify-center gap-4">
        {newNames.map((name, index) => {
          return (
            <Name
              name={name}
              key={index}
              id={index}
              classesLocalStorage={classesInitialStateArray[index]}
              checkAnswer={checkAnswer}
              disabled={statusAnswered[index]}
            />
          );
        })}

        <HeartCounter triesLeft={2} />

        <Link to="/score">
          <ButtonNext
            textContent={""}
            visible={true}
            loadNextQuote={loadNextQuote}
          />
        </Link>
      </div>
    </div>
  );
}
