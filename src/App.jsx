import React, { useContext, useState } from "react";
// import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, json } from "react-router-dom";

/* ═══ Components ═══ */
import Navigation from "./components/navigation.component";
import SectionText from "./components/section.text.component";
import BioScore from "./components/section.bioScore.component";
import Intro from "./components/section.intro.component";
import Info from "./components/section.info.component";
import About from "./components/section.about.component";
import Connection from "./connections/connection";
/* ═══ Required ═══ */
import "./data/names";
import GameStatusContext from "./components/context.GameStatus";
import setLocalStorage from "./components/localstorage.function";

export default function App() {
  const connectionTest = Connection();
  // console.log(connectionTest);

  /*:: Prepare Local Storage ::*/

  // userId, arrayAnswered, score, gamesPlayed, tries, won, played, lastPlayed
  if (!localStorage["user"]) {
    localStorage.setItem(
      "user",
      setLocalStorage("#", [false, false, false, false], 0, 0, 3, 0, 0, "date"),
    );
  }
  /*:: Temporary quote data ::*/

  const quoteData = {
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
  };

  const authorsInfo = {
    0: { name: "---" },
    1: { name: "Henri Mondor" },
    2: { name: "Agustín Yañez" },
    3: { name: "Leslie Hore-Belisha" },
  };
  const gameStatus = useState({
    gameOverStatus: false,
    mainScore: JSON.parse(localStorage["user"])["score"],
    triesLeft: JSON.parse(localStorage["user"])["tries"],
    gamesPlayed: JSON.parse(localStorage["user"])["gamesPlayed"],
    quoteData: quoteData,
    authorsInfo: authorsInfo,
  });

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
