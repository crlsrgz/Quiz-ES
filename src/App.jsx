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

  // console.log(`userId ${userId} - APP - 5116`);

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
        name: null,
        authorBio: {
          authorId: null,
          authorName: null,
          authorBorn: null,
          authorDeath: null,
          authorCountryName: null,
          professionOne: null,
          professionTwo: null,
          professionThree: null,
          professionFour: null,
        },
      },
      1: {
        name: null,
        authorBio: {
          authorId: null,
          authorName: null,
          authorBorn: null,
          authorDeath: null,
          authorCountryName: null,
          professionOne: null,
          professionTwo: null,
          professionThree: null,
          professionFour: null,
        },
      },
      2: {
        name: null,
        authorBio: {
          authorId: null,
          authorName: null,
          authorBorn: null,
          authorDeath: null,
          authorCountryName: null,
          professionOne: null,
          professionTwo: null,
          professionThree: null,
          professionFour: null,
        },
      },
      3: {
        name: null,
        authorBio: {
          authorId: null,
          authorName: null,
          authorBorn: null,
          authorDeath: null,
          authorCountryName: null,
          professionOne: null,
          professionTwo: null,
          professionThree: null,
          professionFour: null,
        },
      },
    },
    gameQuotes: {
      0: {
        quote: "...... .......... .......... .......... .......... ",
        answer: 2,
        authors: ["---", "---.", "---.", "---"],
      },
      1: {
        quote: ".......",
        answer: 0,
        authors: ["---", "---", "---", "---"],
      },
      2: {
        quote: "... ... ... ",
        answer: 1,
        authors: ["---", "---", "---", "---"],
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
    gameOver: true,
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
          const populateAuthors = [];
          const populateAuthorBio = [];

          for (let i = 0; i < 3; i++) {
            populateAuthors.push(
              data["quotes"][i]["authors"][data["quotes"][i]["answer"]],
            );
            populateAuthorBio.push(data["quotes"][i]["authorBio"]);
          }

          setQuoteData({
            authorsInfo: {
              0: { name: "---", authorBio: ".." },
              1: { name: populateAuthors[0], authorBio: populateAuthorBio[0] },
              2: { name: populateAuthors[1], authorBio: populateAuthorBio[1] },
              3: { name: populateAuthors[2], authorBio: populateAuthorBio[2] },
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

  useEffect(() => {
    let getLastPlayedDate = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))["playedHistory"]["lastPlayed"]
      : "";
    let checkIfGameisOver = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))["gameOver"]
      : "";
    if (checkIfGameisOver && formatDate === getLastPlayedDate) {
      console.log(checkIfGameisOver);
      console.log(formatDate, getLastPlayedDate);
    }
    if (!checkIfGameisOver && formatDate !== getLastPlayedDate) {
      checkIfGameisOver = false;
      console.log(checkIfGameisOver);
    }

    localStorage.setItem(
      "user",
      // userId, arrayAnswered, score, gamesPlayed, tries, won, played, lastPlayed
      setLocalStorage(
        userId,
        [false, false, false, false],
        0,
        0,
        3,
        checkIfGameisOver,
        userScoreData["userWonGames"],
        userScoreData["userPlayedGames"],
        userScoreData["userLastPlayed"],
      ),
    );

    setGameStatus(JSON.parse(localStorage["user"]));
  }, [userId, userScoreData]);

  const wrongAnswers = useState(0);

  console.log("/////END - APP/////");

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
