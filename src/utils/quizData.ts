import { displayNextGameDate, paintQuizInterface } from "./dom-functions";

export async function userDataRequest(
    connectionUserData: string,
    user: { userId: any; dateShort: string },
    // todaysGamesPlayed: number,
) {
    let theData;
    let todaysGamesPlayedData: number = -1;
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
        .catch((error) => {
            console.log(`Data request failed at response
          -> ${error}`);
        })
        .then((data) => {
            // TODO remove check data from request
            // console.log("returned data", data);
            displayNextGameDate(data["dateShort"]);
            localStorage.setItem("user", data["userId"]);
            /**
             * JSON.parse accepts :string, localStorage returns :string or null
             * using an empty :string "{}" to resolve the problem
             * Extra solution get localStorage into a variable and check if it's not null
             */
            const gameState = JSON.parse(localStorage.getItem("state") || "{}");

            gameState["isGameOfDayOver"] = data["isGameOfDayOver"];
            // gameState["isGameOfDayOver"] = "hello";

            todaysGamesPlayedData = +data["todaysGamesPlayed"];

            gameState["isGameOfDayOver"] = data["isGameOfDayOver"];
            gameState["todaysGamesPlayed"] = parseInt(
                data["todaysGamesPlayed"],
            );

            localStorage.setItem("state", JSON.stringify(gameState));
            localStorage.setItem("quiz", JSON.stringify(data["quiz"]));
            theData = data["quiz"];
        });
    /**
     * Display the quote, checking today's games played
     */
    paintQuizInterface(theData, todaysGamesPlayedData);
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
    /*:: Update User score ::*/

    await fetch(connectionUserScore, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=uft",
        },
        body: JSON.stringify(user),
    })
        //TODO REMOVE console log
        .then((response) => {
            return response.json();
        });
    // .then((data) => console.log("Submit data", data));
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

export async function checkAnswer(
    connectionAnswerData: string,
    objectAnswer: {},
    answer: string,
) {
    await fetch(connectionAnswerData, {
        method: "POST",
        headers: {
            "Content-Type": "aplication/json; charset=utf",
        },
        body: JSON.stringify(objectAnswer),
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            // console.log("returned answer", data);
            // console.log("CHECK ERROR");
            // {return await fetch(e,{method:"POST",headers:{"Content-Type":"aplication/json; charset=utf"},body:JSON.stringify(t)}).then(o=>o.json()).then(o=>{n=o.dateSome.toString()}),n}
            answer = data["dateSome"].toString();
            // console.log(answer);

            // console.log("CHECK ERROR");
        });
    return answer;
}
