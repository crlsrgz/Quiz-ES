import "../style.css";
export class ComponentNavigation extends HTMLElement {
    connectedCallback(word: string = "¿Quién dijo?") {
        this.innerHTML = `
        <h1 class="page-title">
            <a href="/" tabindex="10"> ${word} </a>
        </h1>
        <nav-bar class="nav-desk">
            <a href="/frase/" tabindex="11">Frase</a>
            <a href="/marcador/" tabindex="12">Marcador</a>
        </nav-bar>`;
    }
}
customElements.define("app-header", ComponentNavigation);
