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
      setLocalStorage(
        "#",
        [false, false, false, false],
        0,
        0,
        3,
        false,
        0,
        0,
        "date",
      ),
    );
  }

  //: get Gamestatus info

  const [statusGameOver, setStatusGameOver] = useState(
    gameStatus["gameOver"],
    // Testing fetching data...
    // JSON.parse(localStorage.getItem(["user"]))["gameOver"],
  );
  const [statusPlayedHistory, setStatusPlayedHistory] = useState(
    gameStatus["playedHistory"],
  );

  const [statusTries, setStatusTries] = useState(gameStatus["tries"]);

  const [statusAnswered, setStatusAnswered] = useState(
    statusTries <= 0 ? [true, true, true, true] : gameStatus["answered"],
    // JSON.parse(localStorage.getItem(["user"]))["answered"],
  );

  const [statusScore, setStatusScore] = useState(gameStatus["score"]);
  const [statusGamesPlayed, setStatusGamesPlayed] = useState(
    gameStatus["gamesPlayed"],
    // JSON.parse(localStorage.getItem(["user"]))["gamesPlayed"],
  );

  //: get QUotes info
  const [gameQuotes, setGameQuotes] = useState(
    quoteData.gameQuotes[statusGamesPlayed]["quote"],
  );
  const [quoteAnswer, setQuoteAnswer] = useState(
    quoteData.gameQuotes[statusGamesPlayed]["answer"],
  );
  const [newNames, setNewNames] = useState(
    quoteData.gameQuotes[statusGamesPlayed]["authors"],
  );

  const iconAnswerArray = [];
  for (let i = 0; i < statusAnswered.length; i++) {
    if (i === quoteAnswer) {
      iconAnswerArray.push(<Icon key={i} icon="iconamoon:check-bold" />);
    } else {
      iconAnswerArray.push(<Icon key={i} icon="iconamoon:close-bold" />);
    }
  }

  // const [quoteLength, setQuoteLength] = useState("");
  const [quoteTextSize, setQuoteTextSize] = useState("text-3xl");

  console.log("/////Load/////");
  // console.table(`statusPlayedHistory ${statusPlayedHistory["won"]}`);
  // console.table(gameStatus);
  console.table(quoteAnswer);

  useEffect(() => {
    setStatusPlayedHistory(gameStatus["playedHistory"]);
    setStatusTries(gameStatus["tries"]);

    setGameQuotes(quoteData.gameQuotes[statusGamesPlayed]["quote"]);
    setQuoteAnswer(quoteData.gameQuotes[statusGamesPlayed]["answer"]);
    setNewNames(quoteData.gameQuotes[statusGamesPlayed]["authors"]);

    //: Set quote text size
    const quoteLength = gameQuotes.length;

    if (quoteLength < 55) {
      setQuoteTextSize("text-3xl md:text-4xl lg:text-5xl");
    } else if (quoteLength > 55 && quoteLength < 120) {
      setQuoteTextSize("text-2xl md:text-3xl lg:text-4xl");
    } else if (quoteLength > 100) {
      setQuoteTextSize("text-xl md:text-2xl lg:text-3xl");
    } else {
      setQuoteTextSize("text-xl");
    }
    console.log(`quoteLength useEffect ${quoteLength}`);
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
  /*::::::::::::::::::::::::::
      CHECK ANSWER 
    ::::::::::::::::::::::::::*/

  function checkAnswer(e) {
    //: Set clicked/answerd to true
    const clickedButton = parseInt(e.target.id);
    let tempStatusAnswered = [...statusAnswered];
    let tempStatusTries;
    let tempStatusScore;
    let tempStatusPlayedHistoryWon;

    if (clickedButton === quoteAnswer) {
      // Disable all buttons
      tempStatusAnswered = statusAnswered.map((item, index) => {
        return true;
      });
      tempStatusTries = 0;
      tempStatusScore = statusScore + 1;
      tempStatusPlayedHistoryWon = statusPlayedHistory["won"] + 1;
      console.log(`tempStatusPlayedHistoryWon ${tempStatusPlayedHistoryWon}`);
    } else {
      tempStatusAnswered[clickedButton] = true;
      tempStatusTries = statusTries - 1;
      tempStatusPlayedHistoryWon = statusPlayedHistory["won"];
    }

    if (tempStatusTries <= 0) {
      tempStatusAnswered = [true, true, true, true];
    }

    setStatusAnswered(tempStatusAnswered);
    setStatusTries(tempStatusTries);
    setStatusScore(tempStatusScore);
    setStatusPlayedHistory({
      won: tempStatusPlayedHistoryWon,
      played: 0,
      lastPlayed: "date",
    });
    console.log(`tempstatus tries ${tempStatusTries}`);

    localStorage.setItem(
      "user",
      setLocalStorage(
        "#",
        tempStatusAnswered,
        tempStatusScore,
        statusGamesPlayed,
        tempStatusTries,
        false,
        tempStatusPlayedHistoryWon,
        0,
        "date",
      ),
    );

    setGameStatus({
      userId: "#",
      answered: tempStatusAnswered,
      score: tempStatusScore,
      gamesPlayed: statusGamesPlayed,
      tries: 3,
      gameOver: statusGameOver,
      playedHistory: {
        won: tempStatusPlayedHistoryWon,
        played: 0,
        lastPlayed: "date",
      },
    });
  }

  console.log("/////END/////");
  console.table(gameStatus);

  /*::::::::::::::::::::::::::
    LOAD BIO PAGE 
  ::::::::::::::::::::::::::*/

  function loadBioPage() {
    // let tempStatusGamesPlayed =
    //   statusGamesPlayed < 2 ? statusGamesPlayed + 1 : 2;
    let tempStatusGamesPlayed = statusGamesPlayed + 1;
    let tempStatusGameOver = false;
    if (tempStatusGamesPlayed >= 3) {
      tempStatusGamesPlayed = 2;
      tempStatusGameOver = true;
    }
    setStatusGameOver(tempStatusGameOver);
    setStatusGamesPlayed(tempStatusGamesPlayed);

    localStorage.setItem(
      "user",
      setLocalStorage(
        "#",
        statusAnswered,
        0,
        tempStatusGamesPlayed,
        3,
        tempStatusGameOver,
        statusPlayedHistory["won"],
        0,
        "date",
      ),
    );

    setGameStatus({
      userId: "#",
      answered: statusAnswered,
      score: 0,
      gamesPlayed: statusGamesPlayed,
      tries: 3,
      gameOver: tempStatusGameOver,
      playedHistory: {
        won: statusPlayedHistory["won"],
        played: 0,
        lastPlayed: "date",
      },
    });
  }

  return (
    <div
      className={`section-container m-12 mx-auto ${props.classes} w-4/5 flex-col justify-center gap-8 md:w-1/2`}
    >
      <div className="mx-auto">
        <h1
          className={`mt-16 text-left font-besley ${quoteTextSize} font-semibold text-blue-50`}
        >
          &quot;{gameQuotes}&quot;
        </h1>
      </div>

      <div className="w-12/12 mx-auto mt-8 flex flex-col items-center justify-center gap-4">
        {newNames.map((name, index) => {
          return (
            <Name
              name={name}
              key={index}
              id={index}
              classesLocalStorage={classesInitialStateArray[index]}
              checkAnswer={checkAnswer}
              disabled={statusAnswered[index]}
              iconAnswer={statusTries === 0 ? iconAnswerArray[index] : ""}
            />
          );
        })}

        <HeartCounter triesLeft={statusTries} />

        <Link to="/score">
          <ButtonNext
            textContent={""}
            visible={true}
            loadNextQuote={loadBioPage}
          />
        </Link>
      </div>
    </div>
  );
}
