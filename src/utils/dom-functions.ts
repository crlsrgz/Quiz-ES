import { ComponentAuthorInfo } from "../components/authorInfo";
//@ts-ignore
import anime from "animejs/lib/anime.es.js";
// import { isInDevelopment, rootUrl } from "../connections/connection";

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
    console.log(stars[index]);
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
    console.log("the state", getLocal);
    console.log(getLocal["totalScore"], getLocal["totalGamesPlayed"]);
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
    console.log("boxClosedCookie", boxClosedCookie);

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
    const button = document.querySelector("#delete-localStorage");
    button?.addEventListener("click", () => localStorage.clear());
}

export function showGameState(todaysGamesPlayed: any) {
    document.addEventListener("dblclick", () => {
        console.log("todaysGamesPlayed", todaysGamesPlayed);
    });
}
