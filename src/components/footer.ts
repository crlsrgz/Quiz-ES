import "../style.css";
export class ComponentFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div><a href="/" tabindex="90">Más</a></div>
        <div><a href="https://lasmascelebres.com/legal" target="_blank" tabindex="91">Aviso Legal</a></div>
        <div><a href="https://lasmascelebres.com/politica" target="_blank" tabindex="92">Política de privacidad</a></div>       
        <div><a href="https://lasmascelebres.com/cookies" target="_blank" tabindex="93">Cookies</a></div>       
        
        `;
    }
}

customElements.define("app-footer", ComponentFooter);
