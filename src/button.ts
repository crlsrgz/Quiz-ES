export function buttonRightAnswer(
    button: Element,
    answer: number,
    isGameOver: boolean,
) {
    if (isGameOver) {
        button?.classList.remove("answer-neutral");
        button?.classList.add("answer-wrong");
    }

    button.addEventListener("click", () => {
        if (button.id.toString() === answer.toString()) {
            button?.classList.remove("answer-neutral");
            button?.classList.add("answer-right");
            isGameOver = true;
        }

        // else {
        //     button?.classList.remove("answer-neutral");
        //     button?.classList.add("answer-wrong");
        // }
        console.log("isgameOver", isGameOver);
    });
}
