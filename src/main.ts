import "./style.css";
// import { connectionUserData } from "./connections/connection.js";
import { v4 as uuidv4 } from "uuid";
// import { insertTextContent } from "./utils/dom-functions.js";

console.log(localStorage["user"]);
const userId = localStorage["user"] ? localStorage["user"] : uuidv4();

const date = new Date();
const formatDate = date.toISOString().slice(0, 10);
// const userIdentifierId: UserIdentifierId = `${formatDate}-${userId}`;

const user = {
    userId: userId,
    dateShort: formatDate,
};

// async function makeRequest() {
//     await fetch(connectionUrl, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json; charset=utf",
//         },
//         body: JSON.stringify(user),
//     })
//         .then(function (response) {
//             return response.json();
//         })
//         .catch((error) => {
//             console.log(`data error ${error}`);
//         })
//         .then((data) => {
//             console.log(Object.keys(data["user"]));
//             console.log(data["user"]["userId"]);
//             console.log(data["user"]["dateShort"]);
//             console.log(data["user"]["dateHuman"]);
//             console.log(data["user"]["scores"]);
//             localStorage.setItem("user", "userrrr");
//         });
// }

// makeRequest();

async function userDataRequest() {
    await fetch(connectionUserData, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf",
        },
        body: JSON.stringify(user),
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            localStorage.setItem("user", data["userId"]);

            insertTextContent("#total-points", data["totalPoints"]);
            insertTextContent("#games-played", data["gamesPlayed"]);
        });
}
userDataRequest();
