import("../style.css");
export class ComponentFooter extends HTMLElement {
    connectedCallback(word: string = "Quiz") {
        this.innerHTML = `
        <div><a href="">About</a></div>
        <div><a href="">Aviso Legal</a></div>
        <div><a href="">Política de privacidad</a></div>       
        <div><a href="">Cookies</a></div>       
        
        `;
    }
}

customElements.define("app-footer", ComponentFooter);
