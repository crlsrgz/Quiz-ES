import "iconify-icon";
import("../style.css");

import { v4 as uuidv4 } from "uuid";
// import { connectionUserData } from "../connections/connection.js";
import { setInitialLocalStorage, userDataRequest } from "../utils/quizData.js";
import { deleteLocalStorage } from "../utils/dom-functions.js";

const userId = localStorage["user"] ? localStorage["user"] : uuidv4();

const date = new Date();
const formatDate = date.toISOString().slice(0, 10);

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
todaysGamesPlayed =
    gameState.todaysGamesPlayed < 3 ? gameState.todaysGamesPlayed : 2;
totalGamesPlayed = gameState.totalGamesPlayed;
totalScore = gameState.totalScore;

/* :::::::::  Report Game State ::::::::: */
console.table(gameState);

// // 💡 :::: Remote DEV START
// await userDataRequest(connectionUserData, user, todaysGamesPlayed);

// // BUTTONS
// const checkLocal: any = localStorage.getItem("quiz");
// const checkLocalJson: dayQuote = JSON.parse(checkLocal);

// console.log("today", checkLocalJson);
// const answer =
//     checkLocalJson[todaysGamesPlayed as keyof typeof checkLocalJson]["answer"];

// //💡 :::: Remote DEV END

const buttons = document.querySelectorAll(
    ".answer",
) as NodeListOf<HTMLInputElement>;

const nextQuizButton = document.querySelector("#next") as HTMLElement;
//testing purposes
window.addEventListener("dblclick", () => {
    nextQuizButton.scrollIntoView({ behavior: "smooth" });
});

buttons.forEach((button) => {
    if (isGameOfDayOver) {
        button?.classList.remove("answer-neutral");
        button?.classList.add("answer-disabled");
    }

    button.addEventListener("onmousedown", () => {
        console.log("todaysGamesPlayed", todaysGamesPlayed);

        // Right answer

        if (button.id.toString() === answer.toString()) {
            button?.classList.remove("answer-neutral");
            button?.classList.add("answer-right");
            button.disabled = true;
            isGameOver = true;
            if (todaysGamesPlayed < 3) {
                todaysGamesPlayed += 1;
            }
            if (todaysGamesPlayed > 2) {
                isGameOfDayOver = true;
            }
            setInitialLocalStorage(
                isGameOver,
                isGameOfDayOver,
                answerTries,
                todayScore,
                todaysGamesPlayed,
                totalGamesPlayed,
                totalScore,
            );
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

            /* ::::::::: Reset Local Storage ::::::::: */
            isGameOver = false;
            answerTries = 0;
            setInitialLocalStorage(
                isGameOver,
                isGameOfDayOver,
                answerTries,
                todayScore,
                todaysGamesPlayed,
                totalGamesPlayed,
                totalScore,
            );
        }
    });
});

/* ::::::::: Temporaray functions for depeloment ::::::::: */
deleteLocalStorage();
