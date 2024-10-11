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
counterDiv.innerHTML = `${counter} mangoes`;
counterDiv.style.marginTop = "20px";
app.append(counterDiv);

// Mango emoji button
const button = document.createElement("button");
button.innerHTML = "Click Mango 🥭";
button.style.marginTop = "20px";
app.append(button);

// Upgrade button (10 mango)
const upgradeButton = document.createElement("button");
upgradeButton.innerHTML = "Hire Farmer (10 🥭)";
upgradeButton.style.marginTop = "20px";
upgradeButton.disabled = true; // Start disabled until player has enough mangoes
app.append(upgradeButton);

// Upgrade button (100 mango)
const upgradeButton2 = document.createElement("button");
upgradeButton2.innerHTML = "Better Mango GMO (100 🥭)";
upgradeButton2.style.marginTop = "20px";
upgradeButton2.disabled = true; // Start disabled until player has enough mangoes
app.append(upgradeButton2);

// Upgrade button (1000 mango)
const upgradeButton3 = document.createElement("button");
upgradeButton3.innerHTML = "Mango Factory (1000 🥭)";
upgradeButton3.style.marginTop = "20px";
upgradeButton3.disabled = true; // Start disabled until player has enough mangoes
app.append(upgradeButton3);

// Helper function to display count
function updateCounterDisplay() {
  counterDiv.innerHTML = `${counter.toFixed(2)} Mangoes 🥭`;
  upgradeButton.disabled = counter < 10;
  upgradeButton2.disabled = counter < 100;
  upgradeButton3.disabled = counter < 1000;
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
    growthRate+= 0.1;
    updateCounterDisplay();
  }
});

upgradeButton2.addEventListener("click", () => {
    if (counter >= 100) {
      counter -= 100;
      growthRate+= 2;
      updateCounterDisplay();
    }
  });

  upgradeButton3.addEventListener("click", () => {
    if (counter >= 1000) {
      counter -= 1000;
      growthRate+= 50;
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
