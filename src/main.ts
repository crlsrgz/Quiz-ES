import "./style.css";
import "iconify-icon";

import { v4 as uuidv4 } from "uuid";
// import { connectionUserData } from "./connections/connection.js";

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
let gameState: any | string | null;
let isGameOver: boolean;
let isGameOfDayOver: boolean;
let answerTries: number;
let todayScore: number;
let todaysGamesPlayed: number;
let totalGamesPlayed: number;
let totalScore: number;

if (localStorage.getItem("state")) {
    gameState = JSON.parse(localStorage.getItem("state") || "{}");
} else {
    gameState = setInitialLocalStorage();
}

isGameOver = gameState.isGameOver;
isGameOfDayOver = gameState.isGameOfDayOver;
answerTries = gameState.answerTries;
todayScore = gameState.todayScore;
todaysGamesPlayed = gameState.todaysGamesPlayed;
totalGamesPlayed = gameState.totalGamesPlayed;
totalScore = gameState.totalScore;

// userDataRequest(connectionUserData, user, todaysGamesPlayed);

// // BUTTONS
// const checkLocal: any = localStorage.getItem("quiz");
// const checkLocalJson: dayQuote = JSON.parse(checkLocal);

// console.log("today", checkLocalJson);
// const answer =
//     checkLocalJson[todaysGamesPlayed as keyof typeof checkLocalJson]["answer"];

// paintQuizInterface(checkLocalJson, todaysGamesPlayed);

const buttons = document.querySelectorAll(
    ".answer",
) as NodeListOf<HTMLInputElement>;

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        console.log("todaysGamesPlayed", todaysGamesPlayed);
        // Right answer
        if (button.id.toString() === answer.toString()) {
            button?.classList.remove("answer-neutral");
            button?.classList.add("answer-right");
            button.disabled = true;

            todaysGamesPlayed += 1;
            setInitialLocalStorage(
                isGameOver,
                isGameOfDayOver,
                answerTries,
                todayScore,
                todaysGamesPlayed,
                totalGamesPlayed,
                totalScore,
            );
            console.log(todaysGamesPlayed);
        }
        // Wrong Answer
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

/* :::::::::  Report Game State ::::::::: */
console.table(gameState);
