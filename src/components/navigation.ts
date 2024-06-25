import "../style.css";
export class ComponentNavigation extends HTMLElement {
    connectedCallback(word: string = "¿Quién dijo?") {
        this.innerHTML = `
        <h1 class="page-title">
            <a href="/"> ${word} </a>
        </h1>
        <nav-bar class="nav-desk">
            <a id="delete-localStorage"><iconify-icon icon="ph:x-circle" height=" 2rem"></iconify-icon></a>
            <a href="/frase/">quiz</a>
            <a href="/marcador/">score</a>
            <a href="/estilos/">styling</a>
        </nav-bar>`;
    }
}
customElements.define("app-header", ComponentNavigation);
