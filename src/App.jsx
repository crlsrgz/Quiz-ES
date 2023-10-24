import React, { useContext, useEffect, useState, Suspense, lazy } from "react";
import { v4 as uuidv4 } from "uuid";
// import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

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

import { AnimatePresence } from "framer-motion";

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

  const [gameStatus, setGameStatus] = useState({});

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
  //         // console.log(data["quotes"]);

  //         const populateAuthors = [];

  //         for (let i = 0; i < 3; i++) {
  //           populateAuthors.push(
  //             data["quotes"][i]["authors"][data["quotes"][i]["answer"]],
  //           );
  //         }

  //         setQuoteData({
  //           // date: data["date"],
  //           authorsInfo: {
  //             0: { name: "---" },
  //             1: { name: populateAuthors[0] },
  //             2: { name: populateAuthors[1] },
  //             3: { name: populateAuthors[2] },
  //           },
  //           gameQuotes: data["quotes"],
  //         });
  //         setUserScoreData({
  //           userLastPlayed: data["user"]["scores"]["user_last_played"]
  //             ? data["user"]["scores"]["user_last_played"]
  //             : formatDate,
  //           userPlayedGames: Number(data["user"]["scores"]["user_played_games"])
  //             ? Number(data["user"]["scores"]["user_played_games"])
  //             : 0,
  //           userWonGames: Number(data["user"]["scores"]["user_won_games"])
  //             ? Number(data["user"]["scores"]["user_won_games"])
  //             : 0,
  //         });
  //       })
  //       .catch((error) => {
  //         console.log(`Error at Fetch end  ${error}`);
  //       });
  //   }

  //   makeRequest();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem(
  //     "user",
  //     setLocalStorage(
  //       userId,
  //       [false, false, false, false],
  //       0,
  //       0,
  //       3,
  //       false,
  //       userScoreData["userWonGames"],
  //       userScoreData["userPlayedGames"],
  //       userScoreData["userLastPlayed"],
  //     ),
  //   );
  //   setGameStatus(JSON.parse(localStorage["user"]));
  //   // console.table(localStorage["user"]);
  //   console.table(userScoreData);
  //   console.table(gameStatus);
  // }, [userId, userScoreData]);

  //: Disabled for development END

  //: Disabled for Production START
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
        userScoreData["userLastPlayed"],
      ),
    );
  }
  useEffect(() => {
    setGameStatus(JSON.parse(localStorage["user"]));
  }, [userId, userScoreData]);

  //: Disabled for Production END
  // console.log(` hello ${userScoreData["userLastPlayed"]}`);

  const wrongAnswers = useState(0);

  //: Navigation links????

  // console.log(
  //   quoteData["gameQuotes"]["0"]["authors"][
  //     quoteData["gameQuotes"]["0"]["answer"]
  //   ],
  // );

  console.log("/////END/////");

  function RoutesAnimated() {
    const location = useLocation();

    const [displayRouteLocation, setDisplayRouteLocation] = useState(location);
    const [transitionClasses, setTransistionClasses] = useState("fadeIn");

    useEffect(() => {
      if (location !== displayRouteLocation) setTransistionClasses("fadeOut");
    }, [location, displayRouteLocation]);

    return (
      <div
        className={`${transitionClasses}`}
        onAnimationEnd={() => {
          if (transitionClasses === "fadeOut") {
            setTransistionClasses("fadeIn");
            setDisplayRouteLocation(location);
          }
        }}
      >
        <Routes location={displayRouteLocation} key={location.key}>
          <Route key="0" exact path="/" element={<Intro key="a0" />} />
          <Route key="2" path="/marcador/" element={<BioScore key="c0" />} />
          <Route key="3" path="/info/" element={<Info key="d0" />} />
          <Route key="1" path="/más/" element={<About key="e0" />} />
        </Routes>
      </div>
    );
  }

  // console.table(localStorage.getItem["user"]);
  return (
    <>
      <GameStatusContext.Provider value={[gameStatus, setGameStatus]}>
        <QuoteDataContext.Provider value={[quoteData, setQuoteData]}>
          <WrongAnswersContext.Provider value={wrongAnswers}>
            <BrowserRouter>
              <AnimatePresence>
                <div className="main-container m-0 h-5/6 p-0 md:mt-20">
                  <Navigation />
                  <RoutesAnimated />
                </div>
              </AnimatePresence>
              <Routes>
                <Route key="1" path="/frase/" element={<SectionText />} />
              </Routes>
            </BrowserRouter>
          </WrongAnswersContext.Provider>
        </QuoteDataContext.Provider>
      </GameStatusContext.Provider>
    </>
  );
}
