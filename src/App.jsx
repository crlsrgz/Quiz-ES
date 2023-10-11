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
  // Data placeholder
  const [quoteData, setQuoteData] = useState({
    authorsInfo: {
      0: {
        name: "---",
      },
      1: {
        name: "Henri Mondor",
      },
      2: {
        name: "Agustín Yañez",
      },
      3: {
        name: "Leslie Hore-Belisha",
      },
    },
    gameQuotes: {
      0: {
        quote:
          "El secreto de...... .......... .......... .......... .......... ",
        answer: 2,
        authors: [
          "Antonio de Solís y Rivadeneyra",
          "Conde de Rosse",
          "Henry Ford",
          "Sándor Márai",
        ],
      },
      1: {
        quote: "No creo ya ....",
        answer: 0,
        authors: [
          "Justo Sierra Méndez",
          "Plutarco Elías Calles",
          "Madame de Genlis",
          "Multatuli",
        ],
      },
      2: {
        quote:
          "Ninguna ciencia hay en... .......... .......... .......... .......... .......... .......... .......... .......... .......... .......... .......... .......... ",
        answer: 1,
        authors: [
          "Howard Phillips Lovecraft",
          "H. L. Mencken",
          "José de San Martín",
          "Karlheinz Stockhausen",
        ],
      },
    },
  });
  //: Disabled for development START

  // useEffect(() => {
  //     async function makeRequest() {
  //       await fetch(connectionUrl, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json; charset=utf-8",
  //         },
  //         body: JSON.stringify(user),
  //       })
  //       .then(function (response) {
  //         // return response.text();
  //         return response.json();
  //       })
  //       .catch((error) => {
  //         console.log(`data error ${error}`);
  //       })
  //       .then(function (data) {
  //         console.log(data[0]["authors"][data[0]["answer"]]);
  //         const populateAuthors = [];
  //         const authorslength = data[0]["authors"].length;

  //         for (let i = 0; i < 3; i++) {
  //           populateAuthors.push(data[i]["authors"][data[i]["answer"]]);
  //         }
  //         setQuoteData({
  //           authorsInfo: {
  //               0: { name: "---" },
  //               1: { name: populateAuthors[0] },
  //               2: { name: populateAuthors[1] },
  //               3: { name: populateAuthors[2] },
  //             },
  //             gameQuotes: data,
  //           });
  //         })
  //         .catch((error) => {
  //           console.log(`set state error ${error}`);
  //         });
  //       }
  //       makeRequest();
  //     }, []);
  //: Disabled for development END

  console.log(
    quoteData["gameQuotes"]["0"]["authors"][
      quoteData["gameQuotes"]["0"]["answer"]
    ],
  );

  return (
    <>
      <GameStatusContext.Provider value={gameStatus}>
        <QuoteDataContext.Provider value={[quoteData, setQuoteData]}>
          <BrowserRouter>
            <Navigation />
            {/* <Connection /> */}

            <div className="main-container m-0 h-5/6 p-0 md:mt-20">
              <Routes>
                <Route path="/" element={<Intro />} />
                <Route path="/text/" element={<SectionText />} />
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
