import { ComponentAuthorInfo } from "../components/authorInfo";
//@ts-ignore
import anime from "animejs/lib/anime.es.js";
import { isInDevelopment, rootUrl } from "../connections/connection";

export const insertTextContent = (
    elementIdentifier: string,
    textInsert: string,
): void => {
    const element = document.querySelector(elementIdentifier);
    if (element !== null) {
        element.textContent = textInsert;
    } else {
        return;
    }
};

export function paintQuizInterface(
    data: dayQuote | any,
    todaysGamesPlayed: number,
) {
    // Buttons
    const todaysGame = todaysGamesPlayed > 2 ? 2 : todaysGamesPlayed;
    const buttons = document.querySelectorAll(
        ".answer",
    ) as NodeListOf<HTMLInputElement>;
    buttons.forEach((button, index) => {
        button.textContent = data[todaysGame]["authors"][index];
    });

    // Quote
    const quoteField = document.querySelector("#quote-field");
    if (quoteField) {
        quoteField.textContent = data[todaysGame]["quote"];
    }
}

export function animateAuthor(
    authorName = "-",
    professionOne = "-",
    professionTwo = "-",
    professionThree = "-",
    country = "-",
    born = "-",
    died = "-",
) {
    // Selection for develpment
    const button = document.getElementById("3");
    // const content = new ComponentAuthorInfo("aa");

    const authorContainer = document.createElement("author-info");
    customElements.define("author-info", ComponentAuthorInfo);
    authorContainer.setAttribute("name", authorName);
    authorContainer.setAttribute("professionOne", professionOne);
    authorContainer.setAttribute("professionTwo", professionTwo);
    authorContainer.setAttribute("professionThree", professionThree);
    authorContainer.setAttribute("country", country);
    authorContainer.setAttribute("born", born);
    authorContainer.setAttribute("died", died);

    // authorContainer.style.order = "-1";

    if (button?.textContent) {
        authorContainer.textContent = button?.textContent;
    }

    const container = document.querySelector(".quote");
    container?.appendChild(authorContainer);

    animateStars();
    // window.addEventListener("dblclick", () => {
    //     container?.appendChild(authorContainer);
    //     console.log("gggg");
    // });
}
type quotesOfTheDay = {
    [key: string]: { quote: string; author: string; authorId: string };
};

export function displayAlreadyAnsweredQuote(gameState: GameState) {
    // let quiz: string;
    // let quotesList: quotesOfTheDay;
    const gameOfTheDayNumber = gameState["todaysGamesPlayed"] - 1;
    //TODO quiz is not set
    // check before setting the variable
    if (localStorage.getItem("quiz")) {
        let quiz = JSON.parse(localStorage.getItem("quiz") || "{}")[
            gameOfTheDayNumber
        ];

        let getStorage: quotesOfTheDay = {};

        if (!localStorage.getItem("playedGamesOfTheDay")) {
            localStorage.setItem("playedGamesOfTheDay", "");
        } else {
            getStorage = JSON.parse(
                localStorage.getItem("playedGamesOfTheDay") || "{}",
            );
        }
        //TODO: MISSING getSTORAGE on first load of the page without played games
        console.log("getStorage", getStorage);

        if (getStorage[gameOfTheDayNumber]) {
            getStorage[gameOfTheDayNumber] = {
                //TODO: FIX
                quote: quiz["quote"],
                author: quiz["author_bio"]["authorName"],
                authorId: quiz["author_bio"]["authorId"],
            };
        }

        localStorage.setItem("playedGamesOfTheDay", JSON.stringify(getStorage));
        console.log("length", Object.keys(getStorage).length);

        createPlayedQuote(getStorage);
    }
    /*:::::::: Set entry with played quotes ::::::::: */
}

function createPlayedQuote(getStorage: quotesOfTheDay) {
    const container = document.getElementById("already-answered-quotes");
    let quoteIndex = Object.keys(getStorage).length;

    for (let i = 0; i < quoteIndex; i++) {
        // console.log(i);
        const div = document.createElement("div");

        const spanAuthor = document.createElement("div");
        const linkAuthor = document.createElement("a");
        spanAuthor.classList.add("h6");

        const spanQuote = document.createElement("div");
        spanQuote.classList.add("h5");

        linkAuthor.textContent = getStorage[i]["author"];
        linkAuthor["href"] =
            `https://lasmascelebres.com/autor/${getStorage[i]["authorId"]}/?ref=qlmc`;
        linkAuthor["target"] = "_blank";

        spanAuthor.appendChild(linkAuthor);
        spanQuote.textContent = getStorage[i]["quote"];

        div.append(spanQuote, spanAuthor);
        div.classList.add("already-played-quote");
        div.id = getStorage[i]["authorId"];

        container?.append(div);
    }

    // console.log("createPlayedQuote", div, spanAuthor, objectLength);
}

// TODO Check delay functionality in case not needed
// function delay(ms: number) {
//     return new Promise((resolve) => setTimeout(resolve, ms));
// }
// TODO: OPtimize function, remove extra libraries
export async function animateStars(duration: number = 330) {
    const stars = document.querySelectorAll(".star-score");
    anime({
        targets: ".star-empty",
        rotate: "216",
        color: "#126b5b",
        keyframes: [{ scale: ["1.1", "0.25"] }, { scale: ["0.25", "1"] }],
        delay: anime.stagger(duration),
        easing: "spring(1, 80, 10, 0)",
    });

    for (let i = 0; i < stars.length; i++) {
        // TODO Check delay functionality in case not needed
        // await delay(duration);
        if (stars[i] && stars[i].classList.contains("star-empty")) {
            stars[i].setAttribute("icon", "ph:star-fill");
            stars[i].classList.remove("star-empty");
        }
    }
}

export function removeStar(answerTries: number) {
    const stars = document.querySelectorAll(".star-score");
    const index = stars.length - 1 - answerTries;
    stars[index].setAttribute("icon", "ph:star-thin");
    stars[index].classList.add("star-empty");
    anime({
        targets: stars[index],
        rotate: "-216",
        keyframes: [{ scale: ["1.1", "0.25"] }, { scale: ["0.25", "1"] }],
        duration: 1000,
    });
}

export async function displayScore(
    totalPoints: string,
    totalGamesPlayed: string,
) {
    const getLocal = JSON.parse(localStorage.getItem("state") || "{}");

    const totalPointsElement = document.getElementById(
        "total-points",
    ) as HTMLElement;
    const totalGamesPlayedElement = document.getElementById(
        "games-played",
    ) as HTMLElement;

    getLocal["totalScore"]
        ? (totalPointsElement.textContent = getLocal["totalScore"])
        : (totalPointsElement.textContent = totalPoints);
    getLocal["totalGamesPlayed"]
        ? (totalGamesPlayedElement.textContent = getLocal["totalGamesPlayed"])
        : (totalGamesPlayedElement.textContent = totalGamesPlayed);
    // TODO REmove state verification
    // console.log("the state", getLocal);
    // console.log(getLocal["totalScore"], getLocal["totalGamesPlayed"]);
}

export function displayNextGameDate(date: string) {
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    // const formatDate = newDate.toLocaleString("en-US", {
    //     timeZone: "America/Chicago",
    // });
    // newDate = new Date(formatDate);
    // console.log("nextGameDate", newDate);
    const nextGameDate = document.querySelectorAll(".next-game-date span");
    //simple is good
    if (nextGameDate.length > 0) {
        nextGameDate[2].textContent = newDate.getFullYear().toString();
        nextGameDate[1].textContent = (newDate.getMonth() + 1).toString();
        nextGameDate[0].textContent = newDate.getDate().toString();
    }
}

export function closeInfoBox() {
    const infoBox = document.querySelector(".info-box");
    const closeButton = document.querySelector(".close-info-box");

    const boxClosedCookie = document.cookie
        ?.split("; ")
        .find((row) => row.startsWith("infoBox"))
        ?.split("=")[1];

    if (!boxClosedCookie) {
        console.log("the cookie is not there");
        document.cookie = `infoBox=false; SameSite=${isInDevelopment ? "lax" : "None"}; domain=${isInDevelopment ? rootUrl : "localhost"} ; secure`;
    }

    const isBoxClosed = boxClosedCookie == "true";
    if (isBoxClosed) {
        infoBox?.remove();
    } else {
        infoBox?.classList.remove("hidden");
    }

    closeButton?.addEventListener("click", () => {
        console.log(infoBox);
        console.log(document.cookie);
        infoBox?.remove();
        // document.cookie = "infoBox=true; SameSite=Lax; secure";
        document.cookie = `infoBox=true; SameSite=${isInDevelopment ? "lax" : "None"}; domain=${isInDevelopment ? rootUrl : "localhost"} ; secure`;

        console.log(document.cookie);
        console.log(isInDevelopment, rootUrl);
    });
}

export function gameOfTheDayOver(isGameOfDayOver: boolean | null) {
    const message = document.querySelector(".next-game-date-container");
    if (isGameOfDayOver) {
        message?.classList.remove("hidden");
    }
}

/* ::::::::: Temporaray functions for development ::::::::: */
export function deleteLocalStorage() {
    // const button = document.querySelector("#delete-localStorage");

    // button?.addEventListener("click", () => {
    //     localStorage.clear();

    //     console.clear();
    //     console.log("localStorage deleted");
    // });

    console.log("Storage delete disabled");
}

export function showGameState(todaysGamesPlayed: any) {
    document.addEventListener("dblclick", () => {
        console.log("todaysGamesPlayed", todaysGamesPlayed);
    });
}

export function inputCode(word: string) {
    const inputCode: string[] = [];
    window.addEventListener("keyup", (e) => {
        inputCode.push(e.key);
        inputCode.splice(-word.length - 1, inputCode.length - word.length);
        if (inputCode.join("").includes(word)) {
            console.log("secret code");
            localStorage.clear();
            window.location.reload();
        }
    });
}
