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

  console.log(
    `Main Score: ${mainScore} / 
    Games Played ${gamesPlayed} /
    Author ${authorsInfo[authorsInfoIndex]["name"]} /
    left tries ${triesLeft}
    AuthorIndex ${authorsInfoIndex} / 
    gameOverStatus ${gameOverStatus} / 
    `,
  );

  /*:: CONTEXT TESTING ::*/

  if (!localStorage["user"]) {
    localStorage.setItem(
      "user",
      JSON.stringify({ answered: [false, false, false, false], score: 0 }),
    );
  }
  let score = JSON.parse(localStorage["user"])["score"];

  return (
    <div
      className={`section-container m-4 mx-auto flex ${props.classes} w-4/5 flex-col justify-center `}
    >
      <div className="mx-auto mt-8 flex flex-col justify-start text-left font-besley text-xl text-zinc-100">
        <h1 className="text-2xl">{authorsInfo[authorsInfoIndex]["name"]}</h1>
        <h2 className="-mt-1 text-lg font-semibold text-blue-50">42069</h2>
        <h2 className="text-lg font-semibold text-blue-50">Lorem ipsum</h2>
        <h3 className="text-lg font-semibold text-blue-50">
          Lorem, ipsum, dolor.
        </h3>
      </div>

      <div className="mx-auto mt-8 flex flex-row gap-16 font-alata">
        <div className="text-center  text-blue-50">
          <div className="flex flex-col text-4xl">
            <h2 className="">one</h2>
            <h3 className="mt-6">{mainScore ?? "-"}</h3>
            <div className="m-auto">
              <Icon icon="ic:baseline-check" width={32} height={32} />
            </div>
          </div>
        </div>
        <div className="text-center  text-blue-50">
          <div className="flex flex-col text-4xl">
            <h2 className="">two</h2>
            <h3 className="mt-6">0</h3>
            <div className="m-auto">
              <Icon icon="ic:baseline-close" width={32} height={32} />
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
