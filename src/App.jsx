import React from "react";

import { useState } from "react";

import { Link, BrowserRouter, Routes, Route } from "react-router-dom";

import Navigation from "./components/navigation.component";
import SectionText from "./components/section.text.component";
import BioScore from "./components/section.bioScore.component";
import Intro from "./components/section.intro.component";
import Info from "./components/section.info.component";

export default function App() {
  const [displayQuizContainer, setDisplayQuizContainer] = useState("flex");
  function changeQuizContainerVisibility() {
    if (displayQuizContainer === "flex") {
      setDisplayQuizContainer("hidden");
    } else {
      setDisplayQuizContainer("flex");
    }
  }
  return (
    <>
      <Navigation />
      <BrowserRouter>
        <div className="main-container m-0 h-5/6 p-0">
          <SectionText classes={displayQuizContainer} />
          <Routes>
            <Route path="/about/" element={<BioScore classes={""} />} />
          </Routes>

          <Intro classes={"hidden"} />
          <Info classes={"hidden"} />
        </div>
      </BrowserRouter>
    </>
  );
}
