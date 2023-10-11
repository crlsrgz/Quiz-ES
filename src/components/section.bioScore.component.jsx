import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

import setLocalStorage from "./localstorage.function";

import GameStatusContext from "./context.GameStatus";
import QuoteDataContext from "./context.QuoteData";

import ButtonNext from "./button.next.component";

export default function BioScore(props) {
  const [gameStatus, setGameStatus] = useContext(GameStatusContext);
  const [quoteData, setQuoteData] = useContext(QuoteDataContext);

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
  const [statusPlayedHistoryWon, setPlayedHistoryWon] = useState(
    JSON.parse(localStorage.getItem(["user"]))["playedHistory"]["won"],
  );

  const [statusAnswered, setStatusAnswered] = useState(
    JSON.parse(localStorage.getItem(["user"]))["answered"],
  );

  const [statusTries, setStatusTries] = useState(gameStatus["tries"]);

  //: get quote info

  const [dataAuthorsInfo, setDataAuthorsInfo] = useState(
    quoteData.authorsInfo[statusGamesPlayed]["name"],
  );

  const [authorsInfoIndex, setAuthorsInfoIndex] = useState(
    statusGamesPlayed + 1,
  );

  function loadNextQuote() {
    setStatusAnswered([false, false, false, false]);

    localStorage.setItem(
      "user",
      setLocalStorage(
        "#",
        [false, false, false, false],
        0,
        statusGamesPlayed,
        statusTries,
        false,
        0,
        0,
        "date",
      ),
    );
  }

  console.log(`statusGamesPlayed - ${statusGamesPlayed}`);
  console.log(`authorsInfoIndex ${authorsInfoIndex}`);
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
              <h3 className="mt-0 font-serif text-4xl md:text-5xl">/12</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 flex h-16 flex-row gap-16 font-alata">
        <Link to="/text">
          <ButtonNext
            textContent={"Siguiente"}
            visible={statusGameOver ? "hidden" : ""}
            loadNextQuote={loadNextQuote}
          />
        </Link>
      </div>
    </div>
  );
}
