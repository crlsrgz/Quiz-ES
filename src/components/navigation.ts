export class ComponentNavigation extends HTMLElement {
    connectedCallback(word: string = "Quiz") {
        this.innerHTML = `
        <h1 class="page-title">
            <a href="/"> ${word} </a>
        </h1>
        <nav-bar class="nav-desk">
            <a href="/quiz/">quiz</a>
            <a href="/score/">score</a>
            <a href="/styling/">styling</a>
        </nav-bar>`;
    }
}
