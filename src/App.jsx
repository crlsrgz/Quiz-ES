import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* ═══ Components ═══ */
import Navigation from "./components/navigation.component";
import SectionText from "./components/section.text.component";
import BioScore from "./components/section.bioScore.component";
import Intro from "./components/section.intro.component";
import Info from "./components/section.info.component";
import About from "./components/section.about.component";

/* ═══ Required ═══ */
import "./data/names";

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
      <BrowserRouter>
        <Navigation />
        <div className="main-container m-0 h-5/6 p-0">
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route
              path="/text"
              element={<SectionText classes={displayQuizContainer} />}
            />
            <Route path="/score/" element={<BioScore />} />
            <Route path="/info/" element={<Info />} />
            <Route path="/about/" element={<About />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}
