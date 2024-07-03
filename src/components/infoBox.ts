import "../style.css";
export class ComponentInfoBox extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `

        <div class="info-box h5 hidden">
            <div>
            Hola, esta página está en construcción y no esta pensada para el uso público, <br />
            Aún así puede ser usada libremente para jugar el juego.
            Más información sobre el sitio se puede encontrar en <br /> <a href="https://lasmascelebres.com?ref=lmcqd" target="_blank" tabindex="101">https://lasmascelebres.com</a><br />

            </div>
            <button class="button-close close-info-box" >
                <iconify-icon icon="ph:x" width="3rem" class="icon-close"></iconify-icon>
            </button>
        </div>
`;
    }
}
customElements.define("app-info-box", ComponentInfoBox);
