import "./style.css";
import "iconify-icon";

import { v4 as uuidv4 } from "uuid";
import { KEYSTOPRESS, connectionUserData } from "./connections/connection.js";

import { setInitialLocalStorage, userDataRequest } from "./utils/quizData.js";
import { closeInfoBox, inputCode } from "./utils/dom-functions.js";

window.addEventListener("DOMContentLoaded", appLoad);

closeInfoBox();
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
    gameState = {
        isGameOver: false,
        isGameOfDayOver: false,
        answerTries: 0,
        todayScore: 0,
        todaysGamesPlayed: 0,
        totalGamesPlayed: 0,
        totalScore: 0,
    };

    // let todaysGamesPlayed: number;

    if (localStorage.getItem("state") && gameState) {
        gameState = JSON.parse(localStorage.getItem("state") || "{}");
    } else {
        gameState = setInitialLocalStorage();
    }

    // todaysGamesPlayed = gameState.todaysGamesPlayed;

    userDataRequest(connectionUserData, user);
    /* :::::::::  Report Game State ::::::::: */

    /* ::::::::: Temporaray functions for development ::::::::: */
}

inputCode(KEYSTOPRESS);
