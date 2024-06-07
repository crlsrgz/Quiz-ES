import { ComponentAuthorInfo } from "../components/authorInfo";
//@ts-ignore
import anime from "animejs/lib/anime.es.js";

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
        console.log(button);
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
function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
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

export function displayScore(
    totalPoints: string,
    totalGamesPlayed: string,
): void {
    const getLocal = JSON.parse(localStorage.getItem("state"));

    const totalPointsElement = document.getElementById("total-points");
    const totalGamesPlayedElement = document.getElementById("games-played");
    totalPointsElement
        ? (totalPointsElement.textContent = getLocal["totalScore"])
        : "";
    totalGamesPlayedElement
        ? (totalGamesPlayedElement.textContent = getLocal["totalGamesPlayed"])
        : "";
}

/* ::::::::: Temporaray functions for depeloment ::::::::: */
export function deleteLocalStorage() {
    const button = document.querySelector("#delete-localStorage");
    button?.addEventListener("click", () => localStorage.clear());
}
