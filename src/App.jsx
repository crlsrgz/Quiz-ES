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
// import connectionUrl from "./connections/connection";
/* ═══ Required ═══ */
import "./data/names";
import GameStatusContext from "./components/context.GameStatus";
import QuoteDataContext from "./components/context.QuoteData";
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
  // console.log(connectionUrl);

  const userId = self.crypto.randomUUID();
  const date = new Date();
  const user = {
    name: `${userId}`,
    date: `${date.toISOString()}`,
    dateShort: `${date.toISOString().slice(0, 10)}`,
    quoteId: [],
    score: [0, 0],
  };

  const gameStatus = useState(JSON.parse(localStorage["user"]));

  const quoteData = useState({
    authorsInfo: {
      0: { name: "---" },
      1: { name: "Henri Mondor" },
      2: { name: "Agustín Yañez" },
      3: { name: "Leslie Hore-Belisha" },
    },
    gameQuotes: {
      0: {
        quote: "Enséñame el rostro de tu madre y te diré quien eres.",
        answer: 0,
        authors: [
          "Henri Mondor",
          "Joseph Unger",
          "Simone Signoret",
          "Jack Gould",
        ],
      },
      1: {
        quote:
          "El hombre deja de ser joven cuando cancela las posibilidades futuras y se vuelve prematuramente adulto, es decir, se entrega a una actitud de beneficio propio.",
        answer: 1,
        authors: [
          "Jack Gould",
          "Agustín Yánez",
          "Simone Signoret",
          "Henri Mondor",
        ],
      },
      2: {
        quote:
          "El hombre no se conoce; no conoce sus límites y sus posibilidades, no conoce ni siquiera hasta qué punto no se conoce.",
        answer: 2,
        authors: [
          "Joseph Unger",
          "Henri Mondor",
          "Leslie Hore-Belisha",
          "Jack Gould",
        ],
      },
    },
  });

  // console.log(gameStatus);

  return (
    <>
      <GameStatusContext.Provider value={gameStatus}>
        <QuoteDataContext.Provider value={quoteData}>
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
        </QuoteDataContext.Provider>
      </GameStatusContext.Provider>
    </>
  );
}
