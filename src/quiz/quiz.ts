import("../style.css");
import { connectionQuizData } from "../connections/connection";
import { ComponentNavigation } from "../components/navigation";

customElements.define("app-header", ComponentNavigation);

// async function paintQuizInterface() {
//     await fetch(connectionQuizData, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json; charset=utf",
//         },
//     })
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             console.log(data);
//         });
// } //
// paintQuizInterface()
