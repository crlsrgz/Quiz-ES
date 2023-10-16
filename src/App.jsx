import React, { useEffect, useState } from "react";
// import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import WrongAnswersContext from "./components/context.wrongAnswer";
import setLocalStorage from "./components/localstorage.function";

export default function App() {
  const userId = self.crypto.randomUUID();
  const date = new Date();
  const formatDate = date.toISOString().slice(0, 10);

  const user = {
    name: `${userId}`,
    date: date,
    dateShort: formatDate,
    quoteId: [],
    score: [0, 0],
  };

  /*:: Temporary quote data ::*/
  // Data placeholder
  const [quoteData, setQuoteData] = useState({
    authorsInfo: {
      0: {
        name: "---",
      },
      1: {
        name: "Henry Ford",
      },
      2: {
        name: "Justo Sierra Méndez",
      },
      3: {
        name: "H. L. Mencken",
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
  //   async function makeRequest() {
  //     await fetch(connectionUrl, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json; charset=utf-8",
  //       },
  //       body: JSON.stringify(user),
  //     })
  //       .then(function (response) {
  //         // return response.text();
  //         return response.json();
  //       })
  //       .catch((error) => {
  //         console.log(`data error ${error}`);
  //       })
  //       .then(function (data) {
  //         console.log(data);
  //         // console.log(typeof data);
  //         console.log(data["quotes"]);

  //         const populateAuthors = [];

  //         for (let i = 0; i < 3; i++) {
  //           populateAuthors.push(
  //             data["quotes"][i]["authors"][data["quotes"][i]["answer"]],
  //           );
  //         }

  //         setQuoteData({
  //           date: data["date"],
  //           authorsInfo: {
  //             0: { name: "---" },
  //             1: { name: populateAuthors[0] },
  //             2: { name: populateAuthors[1] },
  //             3: { name: populateAuthors[2] },
  //           },
  //           gameQuotes: data["quotes"],
  //         });
  //       })
  //       .catch((error) => {
  //         console.log(`set state error ${error}`);
  //       });
  //   }
  //   makeRequest();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  //: Disabled for development END

  /*:: Prepare Local Storage ::*/
  formatDate === quoteData["date"]
    ? console.log("same date")
    : console.log("not the same date");

  // userId, arrayAnswered, score, gamesPlayed, tries, won, played, lastPlayed
  if (!localStorage["user"]) {
    localStorage.setItem(
      "user",
      setLocalStorage(
        userId,
        [false, false, false, false],
        0,
        0,
        3,
        false,
        0,
        0,
        formatDate,
      ),
    );
  }

  const wrongAnswers = useState(0);
  const gameStatus = useState(JSON.parse(localStorage["user"]));

  //: Navigation links????

  console.log(
    quoteData["gameQuotes"]["0"]["authors"][
      quoteData["gameQuotes"]["0"]["answer"]
    ],
  );

  return (
    <>
      <GameStatusContext.Provider value={gameStatus}>
        <QuoteDataContext.Provider value={[quoteData, setQuoteData]}>
          <WrongAnswersContext.Provider value={wrongAnswers}>
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
          </WrongAnswersContext.Provider>
        </QuoteDataContext.Provider>
      </GameStatusContext.Provider>
    </>
  );
}
