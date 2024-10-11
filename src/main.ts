import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Mango farm";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Counter

let counter: number = 0;
let growthRate: number = 0;
let lastTimestamp: number = 0;

const counterDiv = document.createElement("div");
counterDiv.innerHTML = `${counter} mangoes`;
counterDiv.style.marginTop = "20px";
app.append(counterDiv);

// Mango emoji button
const button = document.createElement("button");
button.innerHTML = "Start Game 🥭";
button.style.marginTop = "20px";
app.append(button);

// Upgrade button
const upgradeButton = document.createElement("button");
upgradeButton.innerHTML = "Purchase Upgrade (10 mangoes)"; 
upgradeButton.style.marginTop = "20px"; 
upgradeButton.disabled = true; // Start disabled until player has enough mangoes
app.append(upgradeButton);

// Helper function to display count
function updateCounterDisplay() {
  counterDiv.innerHTML = `${counter.toFixed(2)} mangoes`;
  upgradeButton.disabled = counter < 10;
}

// Mango button click event
button.addEventListener("click", () => {
  counter++;
  updateCounterDisplay();
});

// Upgrade button click event
upgradeButton.addEventListener("click", () => {
    if (counter >= 10) {
        counter -= 10; 
        growthRate++; 
        updateCounterDisplay(); 
    }
});

// Function to increment the counter by a fractional amount
function animateCounter(timestamp: number) {
  if (!lastTimestamp) lastTimestamp = timestamp;

  // Calculate the elapsed time since the last frame
  const deltaTime = timestamp - lastTimestamp;
  lastTimestamp = timestamp;

  // Calculate the amount to increment (1 unit per second)
  const increment = (deltaTime / 1000) * growthRate;
  counter += increment;

  updateCounterDisplay();
  requestAnimationFrame(animateCounter);
}

requestAnimationFrame(animateCounter);
