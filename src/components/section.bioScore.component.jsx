import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

import setLocalStorage from "./localstorage.function";

import GameStatusContext from "./context.GameStatus";
import QuoteDataContext from "./context.QuoteData";
import WrongAnswersContext from "./context.wrongAnswer";

import ButtonNext from "./button.next.component";

export default function BioScore(props) {
  const [gameStatus, setGameStatus] = useContext(GameStatusContext);
  const [quoteData, setQuoteData] = useContext(QuoteDataContext);
  const [wrongAnswers, setWrongAnswers] = useContext(WrongAnswersContext);

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

  const [statusGameOver, setStatusGameOver] = useState(
    JSON.parse(localStorage.getItem(["user"]))["gameOver"],
  );
  const [statusGamesPlayed, setStatusGamesPlayed] = useState(
    JSON.parse(localStorage.getItem(["user"]))["gamesPlayed"],
  );
  const [statusPlayedHistory, setStatusPlayedHistory] = useState(
    gameStatus["playedHistory"],
  );
  const [statusPlayedHistoryWon, setPlayedHistoryWon] = useState(
    JSON.parse(localStorage.getItem(["user"]))["playedHistory"]["won"],
  );
  const [statusPlayedHistoryPlayed, setPlayedHistoryPlayed] = useState(
    JSON.parse(localStorage.getItem(["user"]))["playedHistory"]["played"],
  );

  const [statusAnswered, setStatusAnswered] = useState(
    JSON.parse(localStorage.getItem(["user"]))["answered"],
  );

  const [statusTries, setStatusTries] = useState(gameStatus["tries"]);

  //: get quote info

  const [authorsInfoIndex, setAuthorsInfoIndex] = useState(
    statusGamesPlayed + 1,
  );
  const [dataAuthorsInfo, setDataAuthorsInfo] = useState(
    quoteData.authorsInfo[
      authorsInfoIndex === 3 ? authorsInfoIndex : statusGamesPlayed
    ]["name"],
  );

  function loadNextQuote() {
    setStatusAnswered([false, false, false, false]);
    setStatusGamesPlayed(statusGamesPlayed + 1);

    setWrongAnswers(0);

    localStorage.setItem(
      "user",
      setLocalStorage(
        "#",
        [false, false, false, false],
        0,
        statusGamesPlayed,
        statusTries,
        false,
        statusPlayedHistoryWon,
        0,
        "date",
      ),
    );

    setGameStatus({
      userId: "#",
      answered: [false, false, false, false],
      score: 0,
      gamesPlayed: statusGamesPlayed,
      tries: 3,
      gameOver: statusGameOver,
      playedHistory: statusPlayedHistory,
    });
  }
  const arrayCompare = [true, true, true, true];

  const compareArrays =
    arrayCompare.length == statusAnswered.length &&
    arrayCompare.every(function (element, index) {
      return element === statusAnswered[index];
    });

  // console.log(` Compare arrays ${compareArrays}`);

  console.log(`statusGamesPlayed - ${statusGamesPlayed}`);
  console.log(`authorsInfoIndex ${authorsInfoIndex}`);
  console.log(dataAuthorsInfo);
  console.log(quoteData.authorsInfo);
  return (
    <div
      className={`section-container m-4 mx-auto flex ${props.classes} w-4/5 flex-col justify-center `}
    >
      <div className="mx-auto mt-12 flex flex-col justify-start text-left font-besley text-xl text-zinc-100 md:mt-2 md:gap-2">
        <h1 className="text-3xl md:text-4xl lg:text-6xl">{dataAuthorsInfo}</h1>
        <h2 className="mt-1 text-2xl font-semibold text-blue-50 md:text-3xl lg:text-5xl">
          42069
        </h2>
        <h2 className="text-lg font-semibold text-blue-50 md:text-3xl lg:text-4xl">
          Lorem ipsum
        </h2>
        <h3 className="text-lg font-semibold text-blue-50 md:text-3xl lg:text-4xl">
          Lorem, ipsum, dolor.
        </h3>
      </div>

      <div className="mx-auto mt-12 flex flex-row gap-16 font-alata">
        <div className="text-center  text-blue-50">
          <div className="flex flex-col">
            <div className="flex flex-row">
              <h2 className="text-2xl md:text-3xl">
                Respuestas
                <br />
                Correctas
              </h2>
            </div>
            <div className="flex items-baseline justify-center">
              <h3 className="md:text-10xl mt-0 font-serif text-8xl">
                {statusPlayedHistoryWon ?? "-"}
              </h3>
              <h3 className="mt-0 font-serif text-4xl md:text-5xl">
                /{statusPlayedHistoryPlayed ?? "-"}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 flex h-16 flex-row gap-16 font-alata ">
        <Link to="/frase">
          {compareArrays && !statusGameOver ? (
            <ButtonNext
              textContent={"Siguiente"}
              visible={" "}
              loadNextQuote={loadNextQuote}
              positionClass={
                "absolute  -translate-x-1/2 bottom-10 md:m-auto md:mt-24 md:relative md:translate-x-0"
              }
            />
          ) : (
            " "
          )}
        </Link>
      </div>
    </div>
  );
}
