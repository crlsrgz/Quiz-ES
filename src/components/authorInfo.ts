import("../style.css");
export class ComponentAuthorInfo extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
    <div><h2 class="h3">${this.getAttribute("name")}</h2></div>
    <div><h3 class="h4">${this.getAttribute("professionOne") ? this.getAttribute("professionOne") : ""} ${this.getAttribute("professionTwo") ? ", " + this.getAttribute("professionTwo") : ""}  ${this.getAttribute("professionThree") ? ", " + this.getAttribute("professionThree") : ""} 

    </h3></div>
    <div><h4 class="h5">${this.getAttribute("country")}</h4></div>       
    <div><h4 class="h5">${this.getAttribute("born")} - ${this.getAttribute("died")}</h4></div>    
    <div class="separator"> </div>
    `;
    }
}
