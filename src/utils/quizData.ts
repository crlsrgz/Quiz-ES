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
            // console.log(data);
            localStorage.setItem("user", data["userId"]);
            localStorage.setItem("quiz", JSON.stringify(data["quiz"]));
            theData = data["quiz"];
            // paintQuizInterface(data["quiz"], todaysGamesPlayed);
        });
    paintQuizInterface(theData, todaysGamesPlayed);
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
