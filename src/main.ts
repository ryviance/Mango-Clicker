import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "🥭 Mango Farm";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Counter

let counter: number = 0;
let growthRate: number = 0;
let lastTimestamp: number = 0;

const counterDiv = document.createElement("div");
counterDiv.innerHTML = `${counter} Mangoes`;
counterDiv.style.marginTop = "20px";
app.append(counterDiv);

// Mango emoji button
const button = document.createElement("button");
button.innerHTML = "Click Mango 🥭";
button.style.marginTop = "20px";
app.append(button);

// Upgrade button (10 mango)
let cost1: number = 10;
const upgradeButton = document.createElement("button");
upgradeButton.innerHTML = "Hire Farmer ("+cost1+" 🥭)";
upgradeButton.style.marginTop = "20px";
upgradeButton.disabled = true; // Start disabled until player has enough mangoes
app.append(upgradeButton);

// Upgrade button (100 mango)
let cost2: number = 100;
const upgradeButton2 = document.createElement("button");
upgradeButton2.innerHTML = "Better Mango GMO ("+cost2+" 🥭)";
upgradeButton2.style.marginTop = "20px";
upgradeButton2.disabled = true; // Start disabled until player has enough mangoes
app.append(upgradeButton2);

// Upgrade button (1000 mango)
let cost3: number = 1000;
const upgradeButton3 = document.createElement("button");
upgradeButton3.innerHTML = "Mango Factory ("+cost3+" 🥭)";
upgradeButton3.style.marginTop = "20px";
upgradeButton3.disabled = true; // Start disabled until player has enough mangoes
app.append(upgradeButton3);

// Helper function to round to 2 decimal points
function roundToTwoDec(num: number): number {
    return Math.round(num*100)/100;
}

// Helper function to display count
function updateCounterDisplay() {
  counterDiv.innerHTML = `${counter.toFixed(2)} Mangoes 🥭`;
  upgradeButton.innerHTML = "Hire Farmer ("+cost1+" 🥭)";
  upgradeButton2.innerHTML = "Better Mango GMO ("+cost2+" 🥭)";
  upgradeButton3.innerHTML = "Mango Factory ("+cost3+" 🥭)";
  upgradeButton.disabled = counter < cost1;
  upgradeButton2.disabled = counter < cost2;
  upgradeButton3.disabled = counter < cost3;
}

// Mango button click event
button.addEventListener("click", () => {
  counter++;
  updateCounterDisplay();
});

// Upgrade button click event
upgradeButton.addEventListener("click", () => {
  if (counter >= cost1) {
    counter -= cost1;
    growthRate += 0.1;
    cost1 *= 1.15;
    cost1 = roundToTwoDec(cost1);
    updateCounterDisplay();
  }
});

upgradeButton2.addEventListener("click", () => {
  if (counter >= cost2) {
    counter -= cost2;
    growthRate += 2;
    cost2 *= 1.15;
    cost2 = roundToTwoDec(cost2);
    updateCounterDisplay();
  }
});

upgradeButton3.addEventListener("click", () => {
  if (counter >= cost3) {
    counter -= cost3;
    growthRate += 50;
    cost3 *= 1.15;
    cost3 = roundToTwoDec(cost3);
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
