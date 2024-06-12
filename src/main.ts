import "./style.css";
import "iconify-icon";

import { v4 as uuidv4 } from "uuid";
import { connectionUserData } from "./connections/connection.js";

import { setInitialLocalStorage, userDataRequest } from "./utils/quizData.js";
import { deleteLocalStorage } from "./utils/dom-functions.js";

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
    // let todaysGamesPlayed: number;

    if (localStorage.getItem("state")) {
        gameState = JSON.parse(localStorage.getItem("state") || "{}");
    } else {
        gameState = setInitialLocalStorage();
    }

    // todaysGamesPlayed = gameState.todaysGamesPlayed;

    userDataRequest(connectionUserData, user);

    /* :::::::::  Report Game State ::::::::: */
    console.table(gameState);

    /* ::::::::: Temporaray functions for development ::::::::: */
    deleteLocalStorage();
}
