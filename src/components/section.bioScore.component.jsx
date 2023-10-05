import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

import ButtonNext from "./button.next.component";

import MainScoreContext from "./context.MainScore";
import GamesPlayedContext from "./context.GamesPlayed";
import AuthorsInfoContext from "./context.AuthorsInfo";
import TriesLeftContext from "./context.triesLeft";
import QuoteDataContext from "./context.quoteData";
import GameOverContext from "./context.GameOver";

export default function BioScore(props) {
  /*:: CONTEXT TESTING ::*/
  const [gameOverStatus, setGameOverStatus] = useContext(GameOverContext);
  const [mainScore, setMainScore] = useContext(MainScoreContext);
  const [gamesPlayed, setGamesPlayed] = useContext(GamesPlayedContext);
  const [authorsInfo, setAuthorsInfo] = useContext(AuthorsInfoContext);
  const [triesLeft, setTriesLeft] = useContext(TriesLeftContext);
  const [quoteData, setQuoteData] = useContext(QuoteDataContext);

  const [authorsInfoIndex, setAuthorInfoIndex] = useState(0);

  useEffect(() => {
    let tempIndex =
      gamesPlayed === 2 && triesLeft < 1 ? gamesPlayed + 1 : gamesPlayed;

    setAuthorInfoIndex(tempIndex);
    if (authorsInfoIndex > 2) {
      setGameOverStatus(true);
    }
  }, [gamesPlayed, triesLeft, authorsInfoIndex]);

  /*:: CONTEXT TESTING ::*/

  if (!localStorage["user"]) {
    localStorage.setItem(
      "user",
      JSON.stringify({
        answered: [false, false, false, false],
        score: 0,
        gamesPlayed: 0,
        playedHistory: { won: 0, played: 0 },
        tries: 3,
      }),
    );
  }

  console.log(/*[quoteData[gamesPlayed].authors][0][quoteData[gamesPlayed].answer]*/);

  return (
    <div
      className={`section-container m-4 mx-auto flex ${props.classes} w-4/5 flex-col justify-center `}
    >
      <div className="mx-auto mt-12 flex flex-col justify-start text-left font-besley text-xl text-zinc-100 md:mt-2 md:gap-2">
        <h1 className="text-3xl md:text-4xl lg:text-6xl">
          {authorsInfo[authorsInfoIndex]["name"]}
        </h1>
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
                {mainScore ?? "-"}
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
            visible={authorsInfoIndex >= 3 ? "hidden" : ""}
          />
        </Link>
      </div>
    </div>
  );
}
