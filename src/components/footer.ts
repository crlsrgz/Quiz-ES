import "../style.css";
export class ComponentFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div><a href="">Más</a></div>
        <div><a href="https://lasmascelebres.com/legal" target="_blank">Aviso Legal</a></div>
        <div><a href="https://lasmascelebres.com/politica" target="_blank">Política de privacidad</a></div>       
        <div><a href="https://lasmascelebres.com/cookies" target="_blank">Cookies</a></div>       
        
        `;
    }
}

customElements.define("app-footer", ComponentFooter);
