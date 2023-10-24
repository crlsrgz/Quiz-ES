import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
// import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import QuoteDataContext from "./components/context.QuoteData";
import WrongAnswersContext from "./components/context.wrongAnswer";
import setLocalStorage from "./components/localstorage.function";

export default function App() {
  const userId = localStorage["user"]
    ? JSON.parse(localStorage["user"])["userId"]
    : uuidv4();

  const date = new Date();
  const formatDate = date.toISOString().slice(0, 10);

  const user = {
    userId: `${userId}`,
    dateShort: formatDate,
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
  const [userScoreData, setUserScoreData] = useState({
    userLastPlayed: "-",
    userPlayedGames: "-",
    userWonGames: "-",
  });

  const [gameStatus, setGameStatus] = useState({
    userId: "",
    answered: [false, false, false, false],
    score: 0,
    gamesPlayed: 0,
    tries: 3,
    gameOver: false,
    playedHistory: { won: 0, played: 0, lastPlayed: "-" },
  });

  //: Disabled for development START

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
          console.log(data);
          // console.log(data["quotes"]);

          const populateAuthors = [];

          for (let i = 0; i < 3; i++) {
            populateAuthors.push(
              data["quotes"][i]["authors"][data["quotes"][i]["answer"]],
            );
          }

          setQuoteData({
            // date: data["date"],
            authorsInfo: {
              0: { name: "---" },
              1: { name: populateAuthors[0] },
              2: { name: populateAuthors[1] },
              3: { name: populateAuthors[2] },
            },
            gameQuotes: data["quotes"],
          });
          setUserScoreData({
            userLastPlayed: data["user"]["scores"]["user_last_played"]
              ? data["user"]["scores"]["user_last_played"]
              : formatDate,
            userPlayedGames: Number(data["user"]["scores"]["user_played_games"])
              ? Number(data["user"]["scores"]["user_played_games"])
              : 0,
            userWonGames: Number(data["user"]["scores"]["user_won_games"])
              ? Number(data["user"]["scores"]["user_won_games"])
              : 0,
          });
        })
        .catch((error) => {
          console.log(`Error at Fetch end  ${error}`);
        });
    }

    makeRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //: Disabled for development END
  const x = "5";
  // userId, arrayAnswered, score, gamesPlayed, tries, won, played, lastPlayed

  // if (!localStorage["user"]) {
  //   localStorage.setItem(
  //     "user",
  //     setLocalStorage(
  //       userId,
  //       [false, false, false, false],
  //       0,
  //       0,
  //       3,
  //       false,
  //       0,
  //       0,
  //       userScoreData["userLastPlayed"],
  //     ),
  //   );
  // }

  useEffect(() => {
    localStorage.setItem(
      "user",
      setLocalStorage(
        userId,
        [false, false, false, false],
        0,
        0,
        3,
        false,
        userScoreData["userWonGames"],
        userScoreData["userPlayedGames"],
        userScoreData["userLastPlayed"],
      ),
    );
    setGameStatus(JSON.parse(localStorage["user"]));
    // setGameStatus(
    //   setLocalStorage(
    //     userId,
    //     [false, false, false, false],
    //     0,
    //     0,
    //     3,
    //     false,
    //     userScoreData["userWonGames"],
    //     userScoreData["userPlayedGames"],
    //     userScoreData["userLastPlayed"],
    //   ),
    // );
    // console.table(localStorage["user"]);
    console.table(userScoreData);

    // console.table(gameStatus);
  }, [userId, userScoreData]);

  // console.log(` hello ${userScoreData["userLastPlayed"]}`);

  const wrongAnswers = useState(0);
  // const gameStatus = useState(JSON.parse(localStorage["user"]));

  //: Navigation links????

  // console.log(
  //   quoteData["gameQuotes"]["0"]["authors"][
  //     quoteData["gameQuotes"]["0"]["answer"]
  //   ],
  // );
  console.log("/////END/////");
  // console.table(localStorage.getItem["user"]);

  return (
    <>
      <GameStatusContext.Provider value={[gameStatus, setGameStatus]}>
        <QuoteDataContext.Provider value={[quoteData, setQuoteData]}>
          <WrongAnswersContext.Provider value={wrongAnswers}>
            <BrowserRouter>
              <Navigation />
              {/* <Connection /> */}

              <div className="main-container m-0 h-5/6 p-0 md:mt-20">
                <Routes>
                  <Route path="/" element={<Intro />} />
                  <Route path="/frase/" element={<SectionText />} />
                  <Route path="/marcador/" element={<BioScore />} />
                  <Route path="/info/" element={<Info />} />
                  <Route path="/más/" element={<About />} />
                </Routes>
              </div>
            </BrowserRouter>
          </WrongAnswersContext.Provider>
        </QuoteDataContext.Provider>
      </GameStatusContext.Provider>
    </>
  );
}
