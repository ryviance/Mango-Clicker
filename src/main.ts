import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Mango farm";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Counter

let counter: number = 0;

const counterDiv = document.createElement("div");
counterDiv.innerHTML = `${counter} mangoes`;
counterDiv.style.marginTop = "20px";
app.append(counterDiv);

// Mango Emoji
const button = document.createElement("button");
button.innerHTML = "Start Game 🥭";
button.style.marginTop = "20px";
app.append(button);

button.addEventListener("click", () => {
  counter++;
  counterDiv.innerHTML = `${counter} mangoes`;
});

setInterval(() => {
    counter++;
    counterDiv.innerHTML = `${counter} mangoes`;
}, 1000)