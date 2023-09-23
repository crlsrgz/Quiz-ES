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
        tries: 3,
      }),
    );
  }

  const mainScore = useState(JSON.parse(localStorage["user"])["score"]);
  const triesLeft = useState(JSON.parse(localStorage["user"])["tries"]);

  return (
    <>
      <MainScoreContext.Provider value={mainScore}>
        <TriesLeftContext.Provider value={triesLeft}>
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
        </TriesLeftContext.Provider>
      </MainScoreContext.Provider>
    </>
  );
}
