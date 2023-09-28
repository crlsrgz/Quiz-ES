import React, { useState } from "react";
// import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, json } from "react-router-dom";

/* ═══ Components ═══ */
import Navigation from "./components/navigation.component";
import SectionText from "./components/section.text.component";
import BioScore from "./components/section.bioScore.component";
import Intro from "./components/section.intro.component";
import Info from "./components/section.info.component";
import About from "./components/section.about.component";
// import Connection from "./connections/connection";
/* ═══ Required ═══ */
import "./data/names";

import MainScoreContext from "./components/context.MainScore";
import TriesLeftContext from "./components/context.triesLeft";
import GamesPlayedContext from "./components/context.GamesPlayed";
import AuthorsInfoContext from "./components/context.AuthorsInfo";

export default function App() {
  // const [displayQuizContainer, setDisplayQuizContainer] = useState("flex");

  // function changeQuizContainerVisibility() {
  //   if (displayQuizContainer === "flex") {
  //     setDisplayQuizContainer("hidden");
  //   } else {
  //     setDisplayQuizContainer("flex");
  //   }
  // }

  if (!localStorage["user"]) {
    localStorage.setItem(
      "user",
      JSON.stringify({
        answered: [false, false, false, false],
        score: 0,
        gamesPlayed: 0,
        tries: 3,
      }),
    );
  }

  const mainScore = useState(JSON.parse(localStorage["user"])["score"]);
  const triesLeft = useState(JSON.parse(localStorage["user"])["tries"]);
  const gamesPlayed = useState(JSON.parse(localStorage["user"])["gamesPlayed"]);
  const autorsInfo = useState({
    0: { name: "---" },
    1: { name: "Henri Mondor" },
    2: { name: "Agustín Yañez" },
    3: { name: "Leslie Hore-Belisha" },
  });

  return (
    <>
      <MainScoreContext.Provider value={mainScore}>
        <GamesPlayedContext.Provider value={gamesPlayed}>
          <TriesLeftContext.Provider value={triesLeft}>
            <AuthorsInfoContext.Provider value={autorsInfo}>
              <BrowserRouter>
                <Navigation />
                {/* <Connection /> */}

                <div className="main-container m-0 h-5/6 p-0">
                  <Routes>
                    <Route path="/" element={<Intro />} />
                    <Route path="/text" element={<SectionText />} />
                    <Route path="/score/" element={<BioScore />} />
                    <Route path="/info/" element={<Info />} />
                    <Route path="/about/" element={<About />} />
                  </Routes>
                </div>
              </BrowserRouter>
            </AuthorsInfoContext.Provider>
          </TriesLeftContext.Provider>
        </GamesPlayedContext.Provider>
      </MainScoreContext.Provider>
    </>
  );
}
