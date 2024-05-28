import("../style.css");
export class ComponentAuthorInfo extends HTMLElement {
    // constructor(name: string = "aaaaa") {
    //     super();
    //     this.name = name;
    // }

    connectedCallback(name: string = "aaaaa") {
        this.innerHTML = `
    <div><h2>${name}</h2></div>
    <div></div>
    <div></div>       
    <div></div>       
    
    `;
    }
}
