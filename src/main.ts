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

// Growth rate display
const growthRateDiv = document.createElement("div");
growthRateDiv.innerHTML = `Growth Rate: ${roundToTwoDec(growthRate)} Mangoes/second`;
growthRateDiv.style.marginTop = "20px";
app.append(growthRateDiv);

// Mango button click event
const mangoButton = document.createElement("button");
mangoButton.innerHTML = "Click Mango 🥭";
mangoButton.style.marginTop = "20px";
app.append(mangoButton);

mangoButton.addEventListener("click", () => {
  counter++;
  updateCounterDisplay();
});

// Item interface

interface Item {
  name: string;
  cost: number;
  growthRate: number;
  purchaseCount: number;
  description: string;
}

const availableItems: Item[] = [
  { name: "Hire Farmer", cost: 10, growthRate: 0.1, purchaseCount: 0, description: "A hardworking farmer to boost your mango production." },
  { name: "Better Mango GMO", cost: 100, growthRate: 2, purchaseCount: 0, description: "Genetically modified mangoes that grow faster and yield more." },
  { name: "Mango Factory", cost: 1000, growthRate: 50, purchaseCount: 0, description: "A state-of-the-art facility for mass mango production."},
  { name: "Mango Mass Marketing", cost: 5000, growthRate: 1000, purchaseCount: 0, description: "Boost sales with widespread advertising to attract mango lovers!"},
  { name: "Mango Monopoly", cost: 500000, growthRate: 99999999, purchaseCount: 0, description: "Too big to fail."},
];

// Helper function to round to 2 decimal points
function roundToTwoDec(num: number): number {
  return Math.round(num * 100) / 100;
}

// Helper function to create upgrade buttons
function createUpgradeButton(item: Item): HTMLButtonElement {
  const buttonContainer = document.createElement("div");

  const button = document.createElement("button");
  button.innerHTML = `${item.name} (${item.cost} 🥭)`;
  button.title = item.description;
  button.style.marginTop = "20px";
  button.disabled = counter < item.cost;

  const purchaseCountDiv = document.createElement("div");
  purchaseCountDiv.innerHTML = `Purchased: ${item.purchaseCount}`;
  purchaseCountDiv.style.marginTop = "5px";

  buttonContainer.appendChild(button);
  buttonContainer.appendChild(purchaseCountDiv);
  app.append(buttonContainer);

  button.addEventListener("click", () => {
    if (counter >= item.cost) {
      counter -= item.cost;
      growthRate += item.growthRate;
      item.cost = roundToTwoDec(item.cost * 1.15);
      item.purchaseCount++;
      button.innerHTML = `${item.name} (${item.cost} 🥭)`;
      purchaseCountDiv.innerHTML = `Purchased: ${item.purchaseCount}`;
      updateCounterDisplay();
    }
  });

  return button;
}

// Upgrade buttons

const upgradeButtons: HTMLButtonElement[] = [];
for (const item of availableItems) {
  const button = createUpgradeButton(item);
  upgradeButtons.push(button);
}

// Helper function to display count
function updateCounterDisplay() {
  counterDiv.innerHTML = `${roundToTwoDec(counter)} Mangoes 🥭`;
  growthRateDiv.innerHTML = `Production Rate: ${roundToTwoDec(growthRate)} Mangoes/second`;

  // Update upgrade buttons' state
  for (const button of upgradeButtons) {
    const itemName = button.innerHTML.split(" (")[0]; // Extract item name from button text
    const item = availableItems.find((item) => item.name === itemName);
    if (item) {
      button.disabled = counter < item.cost; // Enable or disable button based on counter
    }
  }
}

// Function to increment the counter by a fractional amount
function animateCounter(timestamp: number) {
  if (!lastTimestamp) lastTimestamp = timestamp;

  const deltaTime = timestamp - lastTimestamp;
  lastTimestamp = timestamp;

  const increment = (deltaTime / 1000) * growthRate;
  counter += increment;

  updateCounterDisplay();
  requestAnimationFrame(animateCounter);
}
requestAnimationFrame(animateCounter);
