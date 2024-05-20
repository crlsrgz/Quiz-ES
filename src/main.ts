import "./style.css";
import "iconify-icon";

import { v4 as uuidv4 } from "uuid";
import { connectionUserData } from "./connections/connection.js";

import { setInitialLocalStorage, userDataRequest } from "./utils/quizData.js";

const userId = localStorage["user"] ? localStorage["user"] : uuidv4();

const date = new Date();
const formatDate = date.toISOString().slice(0, 10);
// const userIdentifierId: UserIdentifierId = `${formatDate}-${userId}`;

const user = {
    userId: userId,
    dateShort: formatDate,
};

/* ::::::::: Request data ::::::::: */
let gameState = setInitialLocalStorage();

let isGameOver = gameState.isGameOver;
let isGameOfDayOver = gameState.isGameOfDayOver;
let answerTries = gameState.answerTries;
let todayScore = gameState.todayScore;
let todaysGamesPlayed = gameState.totalGamesPlayed;
let totalGamesPlayed = gameState.totalGamesPlayed;
let totalScore = gameState.totalScore;
userDataRequest(connectionUserData, user, todaysGamesPlayed);

// BUTTONS
const checkLocal: any = localStorage.getItem("quiz");
const checkLocalJson: dayQuote = JSON.parse(checkLocal);

console.log("today", checkLocalJson);
const answer =
    checkLocalJson[todaysGamesPlayed as keyof typeof checkLocalJson]["answer"];

// paintQuizInterface(checkLocalJson, todaysGamesPlayed);

const buttons = document.querySelectorAll(
    ".answer",
) as NodeListOf<HTMLInputElement>;

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        console.log(todaysGamesPlayed);
        if (button.id.toString() === answer.toString()) {
            button?.classList.remove("answer-neutral");
            button?.classList.add("answer-right");
            button.disabled = true;
            isGameOver = true;
            todaysGamesPlayed += 1;
            console.log(todaysGamesPlayed);
        }
        if (button.id.toString() !== answer.toString()) {
            button?.classList.remove("answer-neutral");
            button?.classList.add("answer-wrong");
            answerTries += 1;
            button.disabled = true;
        }

        if (answerTries === 3) {
            buttons.forEach((button) => {
                if (button.id.toString() !== answer.toString()) {
                    button?.classList.remove("answer-neutral");
                    button?.classList.add("answer-disabled");
                    button.disabled = true;
                } else {
                    button?.classList.remove("answer-neutral");
                    button?.classList.add("answer-reveal");
                    button.disabled = true;
                }
            });
        }

        if (isGameOver) {
            buttons.forEach((button) => {
                if (button.id.toString() !== answer.toString()) {
                    button?.classList.remove("answer-neutral");
                    button?.classList.add("answer-disabled");
                    button.disabled = true;
                }
            });
        }
    });
});
