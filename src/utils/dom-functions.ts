import { ComponentAuthorInfo } from "../components/authorInfo";

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
    todayGamesPlayed: number,
) {
    // Buttons
    const todaysGame = todayGamesPlayed > 2 ? 2 : todayGamesPlayed;
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

export function animateAuthor() {
    // Selecttion for develpment
    const button = document.getElementById("3");
    // const content = new ComponentAuthorInfo("aa");

    const authorContainer = document.createElement("author-info");
    authorContainer.attributes["name"] = "BBBB";
    customElements.define("author-info", ComponentAuthorInfo);

    authorContainer.style.order = "-1";
    if (button?.textContent) {
        authorContainer.textContent = button?.textContent;
    }
    const container = document.querySelector(".button-container");
    window.addEventListener("dblclick", () => {
        container?.appendChild(authorContainer);
        console.log("gggg");
    });
}

/* ::::::::: Temporaray functions for depeloment ::::::::: */
export function deleteLocalStorage() {
    const button = document.querySelector("#delete-localStorage");
    button?.addEventListener("click", () => localStorage.clear());
}
