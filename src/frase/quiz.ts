import "iconify-icon";
import("../style.css");

import { v4 as uuidv4 } from "uuid";
import {
    connectionUserData,
    connectionUserScore,
} from "../connections/connection.js";
import {
    setInitialLocalStorage,
    updateUserTotalScore,
    userDataRequest,
} from "../utils/quizData.js";

import { animateAuthor, removeStar } from "../utils/dom-functions.js";
import { deleteLocalStorage } from "../utils/dom-functions.js";

const userId = localStorage["user"] ? localStorage["user"] : uuidv4();

const date = new Date();
const formatDate = date.toISOString().slice(0, 10);

const user = {
    userId: userId,
    dateShort: formatDate,
};

/* ::::::::: Request data ::::::::: */
/**
 * Init the gameState and content variables
 *
 */
// let gameState: any | string | null;
let gameState: GameState;
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

// 💡 :::: Remote DEV START
userDataRequest(connectionUserData, user, todaysGamesPlayed);

/**
 * TODO AWAIT for userDAtaRequest to get the data,
 * Then run checkLocal
 * Get quiz data from local storage
 */

const checkLocal = localStorage.getItem("quiz") || "{}";
const checkLocalJson: dayQuote = JSON.parse(checkLocal);

//TODO Remove Todays Answers
console.log(
    "todays Answers",
    checkLocalJson[0]["answer"],
    checkLocalJson[1]["answer"],
    checkLocalJson[2]["answer"],
);
const answer =
    checkLocalJson[todaysGamesPlayed as keyof typeof checkLocalJson]["answer"];

//💡 :::: Remote DEV END

// const answer = "1";

const buttons = document.querySelectorAll(
    ".answer",
) as NodeListOf<HTMLInputElement>;

const nextQuizButton = document.querySelector("#next") as HTMLElement;
const nextQuizButtonLink = document.querySelector("#next a") as HTMLLinkElement;

buttons.forEach((button) => {
    if (isGameOfDayOver) {
        button?.classList.remove("answer-neutral");
        button?.classList.add("answer-disabled");
        button.disabled = true;
    }

    button.addEventListener("click", () => {
        console.log("todaysGamesPlayed", todaysGamesPlayed);

        // Right answer

        if (button.id.toString() === answer.toString()) {
            button?.classList.remove("answer-neutral");
            button?.classList.add("answer-right");
            button.disabled = true;
            isGameOver = true;
            console.log("todaysGamesPlayed", todaysGamesPlayed);
            const authorInfo =
                checkLocalJson[
                    todaysGamesPlayed as keyof typeof checkLocalJson
                ]["author_bio"];
            setTimeout(() => {
                // nextQuizButton.scrollIntoView({ behavior: "smooth" });
                console.log("todaysGamesPlayed", todaysGamesPlayed);
                animateAuthor(
                    authorInfo["authorName"],
                    authorInfo["professionOne"] ?? "",
                    authorInfo["professionTwo"] ?? "",
                    authorInfo["professionThree"] ?? "",
                    authorInfo["authorCountryName"] ?? "",
                    authorInfo["authorBorn"] ?? "",
                    authorInfo["authorDeath"] ?? "",
                );
            }, 1000);

            if (todaysGamesPlayed < 3) {
                todaysGamesPlayed += 1;
            }
            if (todaysGamesPlayed > 2) {
                isGameOfDayOver = true;
            }
            if (todaysGamesPlayed > 2) {
                nextQuizButtonLink["href"] = "http://localhost:5173/marcador/";
            } else {
                nextQuizButtonLink["href"] = "http://localhost:5173/frase/";
            }

            // TODO Global Score Update
            totalScore++;

            nextQuizButton.classList.remove("hidden");
            nextQuizButton.classList.add("next-reveal");

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
            removeStar(answerTries - 1);
            button.disabled = true;

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

            // setTimeout(() => {
            //     nextQuizButton.scrollIntoView({ behavior: "smooth" });
            // }, 1000);

            /*:: Increase Games of the day ::*/

            if (todaysGamesPlayed < 3) {
                todaysGamesPlayed += 1;
            }
            if (todaysGamesPlayed > 2) {
                isGameOfDayOver = true;
            }

            // totalGamesPlayed++;

            isGameOver = true;
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

        if (isGameOver) {
            // const buttonContainer = document.querySelector(".button-container");
            buttons.forEach((button) => {
                if (button.id.toString() !== answer.toString()) {
                    button?.classList.remove("answer-neutral");
                    button?.classList.add("answer-disabled");
                    button.disabled = true;
                    // Test
                    setTimeout(() => {
                        // button.style["display"] = "none";
                        button.style["transition"] = "all 3s";
                        button.style["opacity"] = "0.8";
                    }, 1000);
                } else {
                    // TODO remove log
                    console.log(button.textContent);
                }
            });

            // TODO remove log
            console.log("am I doing something");

            /* ::::::::: Set Local Storage ::::::::: */
            totalGamesPlayed++;

            const dateLastExercise = new Date();
            console.log(
                dateLastExercise.toDateString,
                dateLastExercise.toLocaleDateString(),
                dateLastExercise.toLocaleString(),
            );
            console.log(dateLastExercise.toISOString());
            // const formatDate = dateLastExercise.toISOString();
            const formatDate = dateLastExercise.toISOString().slice(0, 10);

            const user = {
                userId: localStorage.getItem("user"),
                totalScore: totalScore,
                totalGames: totalGamesPlayed,
                todaysGamesPlayed: todaysGamesPlayed,
                isGameOfDayOver: isGameOfDayOver,
                date: formatDate,
            };
            updateUserTotalScore(connectionUserScore, user);

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

/* :::::::::  Report Game State ::::::::: */
console.table(gameState);
/* ::::::::: Temporaray functions for depeloment ::::::::: */
deleteLocalStorage();
