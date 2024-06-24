import "iconify-icon";
import("../style.css");

import { v4 as uuidv4 } from "uuid";
import {
    connectionUserData,
    connectionUserScore,
    rootUrl,
} from "../connections/connection.js";
import {
    setInitialLocalStorage,
    updateUserTotalScore,
    userDataRequest,
} from "../utils/quizData.js";

import {
    animateAuthor,
    removeStar,
    showGameState,
} from "../utils/dom-functions.js";
import { deleteLocalStorage } from "../utils/dom-functions.js";
import { closeInfoBox } from "../utils/dom-functions";

window.addEventListener("DOMContentLoaded", appLoad);

async function appLoad() {
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
        console.log("isGameOfDayOver", gameState["isGameOfDayOver"]);
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
    await userDataRequest(connectionUserData, user);

    /**
     * TODO AWAIT for userDAtaRequest to get the data,
     * Then run checkLocal
     * Get quiz data from local storage
     */
    async function setDayGameData(): Promise<any[]> {
        const reviewState = JSON.parse(localStorage.getItem("state") || "{}");
        isGameOfDayOver = reviewState["isGameOfDayOver"];
        todaysGamesPlayed = reviewState["todaysGamesPlayed"];
        return [isGameOfDayOver, todaysGamesPlayed];
    }

    [isGameOfDayOver, todaysGamesPlayed] = await setDayGameData();

    console.log("test: for boolean", isGameOfDayOver);

    async function setQuoteData() {
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
            checkLocalJson[todaysGamesPlayed as keyof typeof checkLocalJson][
                "answer"
            ];

        // checkLocalJson[todaysGamesPlayed as keyof typeof checkLocalJson][
        //     "answer"
        // ];
        return [answer, checkLocalJson];
    }
    const [answer, checkLocalJson] = await setQuoteData();

    //💡 :::: Remote DEV END

    // const answer = "1";

    const buttons = document.querySelectorAll(
        ".answer",
    ) as NodeListOf<HTMLInputElement>;

    const nextQuizButton = document.querySelector("#next") as HTMLElement;
    const nextQuizButtonLink = document.querySelector(
        "#next a",
    ) as HTMLLinkElement;

    buttons.forEach((button) => {
        /**
         * If game of the day is over disable buttons
         */
        if (isGameOfDayOver) {
            button?.classList.remove("answer-neutral");
            button?.classList.add("answer-disabled");
            button.disabled = true;
            isGameOver = true;

            console.log((nextQuizButton.children[0].textContent = "Marcador"));
            nextQuizButtonLink["href"] = `${rootUrl}/marcador/`;
            nextQuizButton.classList.remove("hidden");
            nextQuizButton.classList.add("next-reveal");
        }

        button.addEventListener("click", () => {
            console.log("todaysGamesPlayed", todaysGamesPlayed);

            // Right answer

            if (button.id.toString() === answer.toString()) {
                button?.classList.remove("answer-neutral");
                button?.classList.remove("answer-reveal");
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
                    totalScore++;
                }
                // if (todaysGamesPlayed > 2) {
                //     isGameOfDayOver = true;
                // }

                if (todaysGamesPlayed > 2) {
                    nextQuizButtonLink["href"] = `${rootUrl}/marcador/`;
                    isGameOfDayOver = true;
                } else {
                    nextQuizButtonLink["href"] = `${rootUrl}/frase/`;
                }

                nextQuizButton.classList.remove("hidden");
                nextQuizButton.classList.add("next-reveal");

                gameState = setInitialLocalStorage(
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

                gameState = setInitialLocalStorage(
                    isGameOver,
                    isGameOfDayOver,
                    answerTries,
                    todayScore,
                    todaysGamesPlayed,
                    totalGamesPlayed,
                    totalScore,
                );
            }

            // Tries over
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

                isGameOver = true;
                /*:: Increase Games of the day ::*/

                if (todaysGamesPlayed < 3) {
                    nextQuizButtonLink["href"] = `${rootUrl}/frase/`;
                    todaysGamesPlayed += 1;
                }
                if (todaysGamesPlayed > 2) {
                    nextQuizButtonLink["href"] = `${rootUrl}/marcador/`;
                    isGameOfDayOver = true;
                }

                nextQuizButton.classList.remove("hidden");
                nextQuizButton.classList.add("next-reveal");

                gameState = setInitialLocalStorage(
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
                if (todaysGamesPlayed > 2) {
                    isGameOfDayOver = true;
                }

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
                // TODO check if IDs are the same
                console.log("userID", localStorage.getItem("user"), userId);
                const user = {
                    // userId: localStorage.getItem("user"),
                    userId: userId,
                    totalScore: totalScore,
                    totalGames: totalGamesPlayed,
                    todaysGamesPlayed: todaysGamesPlayed,
                    isGameOfDayOver: isGameOfDayOver,
                    date: formatDate,
                };

                updateUserTotalScore(connectionUserScore, user);

                isGameOver = false;
                answerTries = 0;
                // todaysGamesPlayed = 0;
                console.log("test: isGameOfDayOver", isGameOfDayOver);
                gameState = setInitialLocalStorage(
                    isGameOver,
                    isGameOfDayOver,
                    answerTries,
                    todayScore,
                    todaysGamesPlayed,
                    totalGamesPlayed,
                    totalScore,
                );
            }
            /* :::::::::  Report Game State ::::::::: */
            console.table(gameState);
        });
    });

    closeInfoBox();
    /* ::::::::: Temporaray functions for depeloment ::::::::: */
    showGameState(gameState);
    deleteLocalStorage();
}
