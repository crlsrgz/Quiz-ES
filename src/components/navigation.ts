import("../style.css");
export class ComponentNavigation extends HTMLElement {
    connectedCallback(word: string = "Quiz") {
        this.innerHTML = `
        <h1 class="page-title">
            <a href="/"> ${word} </a>
        </h1>
        <nav-bar class="nav-desk">
            <a id="delete-localStorage"><iconify-icon icon="ph:x-circle" height=" 2rem"></iconify-icon></a>
            <a href="/quiz/">quiz</a>
            <a href="/score/">score</a>
            <a href="/styling/">styling</a>
        </nav-bar>`;
    }
}
console.log(ComponentNavigation);
customElements.define("app-header", ComponentNavigation);
