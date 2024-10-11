import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Mango farm";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Counter

let counter: number = 0;
let lastTimestamp: number = 0;

const counterDiv = document.createElement("div");
counterDiv.innerHTML = `${counter} mangoes`;
counterDiv.style.marginTop = "20px";
app.append(counterDiv);

// Mango Emoji
const button = document.createElement("button");
button.innerHTML = "Start Game 🥭";
button.style.marginTop = "20px";
app.append(button);

// Helper function to display count
function updateCounterDisplay() {
    counterDiv.innerHTML = `${counter.toFixed(2)} mangoes`;
}

// Button click event
button.addEventListener("click", () => {
    counter++; 
    updateCounterDisplay(); 
});

// Function to increment the counter by a fractional amount
function animateCounter(timestamp: number) {
    if (!lastTimestamp) lastTimestamp = timestamp; 

    // Calculate the elapsed time since the last frame
    const deltaTime = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    // Calculate the amount to increment (1 unit per second)
    const increment = deltaTime / 1000; 
    counter += increment; 

    updateCounterDisplay(); 
    requestAnimationFrame(animateCounter);
}

requestAnimationFrame(animateCounter);