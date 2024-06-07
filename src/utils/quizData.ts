import { paintQuizInterface } from "./dom-functions";

export async function userDataRequest(
    connectionUserData: string,
    user: { userId: any; dateShort: string },
    todaysGamesPlayed: number,
) {
    let theData;
    await fetch(connectionUserData, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf",
        },
        body: JSON.stringify(user),
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log("returned data", data);
            localStorage.setItem("user", data["userId"]);
            const gameState = JSON.parse(localStorage.getItem("state"));
            gameState["isGameOfDayOver"] = data["isGameOfDayOver"];

            if (gameState["isGameOfDayOver"] === true) {
                gameState["todayGamesPlayed"] = 0;
            }
            // console.log("gameState", gameState["isGameOfDayOver"]);
            // console.log("gameState from data", data["isGameOfDayOver"]);

            localStorage.setItem("state", JSON.stringify(gameState));
            localStorage.setItem("quiz", JSON.stringify(data["quiz"]));
            theData = data["quiz"];

            // paintQuizInterface(data["quiz"], todaysGamesPlayed);
        });
    /**
     * Display the quote, checking today's games played
     */
    paintQuizInterface(theData, todaysGamesPlayed);
}

export async function updateUserTotalScore(
    connectionUserScore: string,
    user: {
        userId: string | null;
        totalScore: number;
        totalGames: number;
        todaysGamesPlayed: number;
        date: string;
    },
) {
    console.log("update score", user);
    await fetch(connectionUserScore, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=uft",
        },
        body: JSON.stringify(user),
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => console.log(data));
}

export function getDate(): string {
    const dateLastExercise = new Date();
    const formatDate = dateLastExercise.toISOString().slice(0, 10);
    return formatDate;
}
// Local Storage
export function setInitialLocalStorage(
    isGameOver = false,
    isGameOfDayOver = false,
    answerTries = 0,
    todayScore = 0,
    todaysGamesPlayed = 0,
    totalGamesPlayed = 0,
    totalScore = 0,
) {
    let gameState = {
        isGameOver: isGameOver,
        isGameOfDayOver: isGameOfDayOver,
        answerTries: answerTries,
        todayScore: todayScore,
        todaysGamesPlayed: todaysGamesPlayed,
        totalGamesPlayed: totalGamesPlayed,
        totalScore: totalScore,
    };

    localStorage.setItem("state", JSON.stringify(gameState));

    return gameState;
}
