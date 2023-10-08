import React, { useContext, useEffect, useState } from "react";
// import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, json } from "react-router-dom";

/* ═══ Components ═══ */
import Navigation from "./components/navigation.component";
import SectionText from "./components/section.text.component";
import BioScore from "./components/section.bioScore.component";
import Intro from "./components/section.intro.component";
import Info from "./components/section.info.component";
import About from "./components/section.about.component";
import connectionUrl from "./connections/connection";
/* ═══ Required ═══ */
import "./data/names";
import GameStatusContext from "./components/context.GameStatus";
import setLocalStorage from "./components/localstorage.function";

export default function App() {
  /*:: Prepare Local Storage ::*/

  // userId, arrayAnswered, score, gamesPlayed, tries, won, played, lastPlayed
  if (!localStorage["user"]) {
    localStorage.setItem(
      "user",
      setLocalStorage("#", [false, false, false, false], 0, 0, 3, 0, 0, "date"),
    );
  }
  /*:: Temporary quote data ::*/
  console.log(connectionUrl);

  const authorsInfo = {
    0: { name: "---" },
    1: { name: "Henri Mondor" },
    2: { name: "Agustín Yañez" },
    3: { name: "Leslie Hore-Belisha" },
  };

  const userId = self.crypto.randomUUID();
  const date = new Date();
  const user = {
    name: `${userId}`,
    date: `${date.toISOString()}`,
    dateShort: `${date.toISOString().slice(0, 10)}`,
    quoteId: [],
    score: [0, 0],
  };

  const [gameStatus, setGameStatus] = useState(null);

  useEffect(() => {
    async function makeRequest() {
      await fetch(connectionUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(user),
      })
        .then(function (response) {
          // return response.text();
          return response.json();
        })
        .catch((error) => {
          console.log(`data error ${error}`);
        })
        .then(function (data) {
          setGameStatus({
            gameOverStatus: false,
            mainScore: JSON.parse(localStorage["user"])["score"],
            triesLeft: JSON.parse(localStorage["user"])["tries"],
            gamesPlayed: JSON.parse(localStorage["user"])["gamesPlayed"],
            quoteData: data,
            authorsInfo: authorsInfo,
          });
        })
        .catch((error) => {
          console.log(`set state error ${error}`);
        });
    }
    makeRequest();
  }, []);

  console.log(gameStatus);

  return (
    <>
      <GameStatusContext.Provider value={gameStatus}>
        <BrowserRouter>
          <Navigation />
          {/* <Connection /> */}

          <div className="main-container m-0 h-5/6 p-0 md:mt-20">
            <Routes>
              <Route path="/" element={<Intro />} />
              <Route path="/text" element={<SectionText />} />
              <Route path="/score/" element={<BioScore />} />
              <Route path="/info/" element={<Info />} />
              <Route path="/about/" element={<About />} />
            </Routes>
          </div>
        </BrowserRouter>
      </GameStatusContext.Provider>
    </>
  );
}
