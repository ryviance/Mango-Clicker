import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Eion's amazing game!!!";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Create a button element with a mango emoji
const button = document.createElement("button");
button.innerHTML = "Start Game 🥭"; 
button.style.marginTop = "20px"; 

app.append(button);