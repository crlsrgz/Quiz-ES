import "iconify-icon";
import "../style.css";

import { v4 as uuidv4 } from "uuid";
import { KEYSTOPRESS, connectionUserData } from "../connections/connection.js";
import { setInitialLocalStorage, userDataRequest } from "../utils/quizData.js";
import {
    displayAlreadyAnsweredQuote,
    displayScore,
    gameOfTheDayOver,
    inputCode,
} from "../utils/dom-functions.js";
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
    let gameState: GameState;
    // let isGameOver: boolean;
    // let isGameOfDayOver: boolean;
    // let answerTries: number;
    // let todayScore: number;
    // let todaysGamesPlayed: number;
    // let totalGamesPlayed: number;
    // let totalScore: number;

    if (localStorage.getItem("state")) {
        gameState = JSON.parse(localStorage.getItem("state") || "{}");
        // console.log("test: score", gameState);
    } else {
        gameState = setInitialLocalStorage();
    }

    // isGameOver = gameState.isGameOver;
    // isGameOfDayOver = gameState.isGameOfDayOver;
    // answerTries = gameState.answerTries;
    // todayScore = gameState.todayScore;
    // todaysGamesPlayed = gameState.todaysGamesPlayed;
    // totalGamesPlayed = gameState.totalGamesPlayed;
    // totalScore = gameState.totalScore;

    // 💡 :::: Remote DEV START
    userDataRequest(connectionUserData, user);

    // BUTTONS
    // const checkLocal: any = localStorage.getItem("quiz");
    // const checkLocalJson: dayQuote = JSON.parse(checkLocal);

    // const answer =
    //     checkLocalJson[todaysGamesPlayed as keyof typeof checkLocalJson]["answer"];

    //💡 :::: Remote DEV END

    await displayScore("0", "0");

    displayAlreadyAnsweredQuote(gameState);
    closeInfoBox();
    gameOfTheDayOver(gameState.isGameOfDayOver);

    inputCode(KEYSTOPRESS);

    /* :::::::::  Report Game State ::::::::: */
    // console.table(gameState);
    /* ::::::::: Temporary functions for development ::::::::: */
}
