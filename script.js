let drinks = [];
let bottleSize = 24;
let currentDay = getLocalDay();

function getLocalDay() {
  const now = new Date();
  return now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
}

const totalDisplay = document.getElementById("total");
const drinkList = document.getElementById("drink-list");
const emptyMessage = document.getElementById("empty-message");
const addBottleButton = document.getElementById("add-bottle");
const bottleInput = document.getElementById("bottle-size");
const customInput = document.getElementById("custom-amount");
const bottleMessage = document.getElementById("bottle-message");
const customMessage = document.getElementById("custom-message");

// Both inputs use the same rule: a positive, finite number.
function isValidAmount(amount) {
  return Number.isFinite(amount) && amount > 0;
}

function saveData() {
  try {
    localStorage.setItem("waterTracker", JSON.stringify({
      date: currentDay,
      drinks: drinks,
      bottleSize: bottleSize
    }));
  } catch {
    document.getElementById("storage-note").textContent =
      "Browser storage is unavailable. Changes will not survive a refresh.";
  }
}

function loadData() {
  try {
    const saved = JSON.parse(localStorage.getItem("waterTracker"));
    if (!saved) return;

    if (isValidAmount(saved.bottleSize)) {
      bottleSize = saved.bottleSize;
    }

    if (saved.date === currentDay && Array.isArray(saved.drinks)) {
      drinks = saved.drinks.filter(isValidAmount);
    }
  } catch {
    document.getElementById("storage-note").textContent =
      "Saved data could not be loaded. Starting with an empty tracker.";
  }
}

function checkForNewDay() {
  const today = getLocalDay();
  if (today === currentDay) return false;

  currentDay = today;
  drinks = [];
  customMessage.textContent = "";
  updateDisplay();
  saveData();
  return true;
}

document.getElementById("bottle-form").addEventListener("submit", function (event) {
  event.preventDefault();
  checkForNewDay();
  const amount = Number(bottleInput.value);

  if (!isValidAmount(amount)) {
    bottleMessage.textContent = "Enter a number greater than zero.";
    bottleInput.setAttribute("aria-invalid", "true");
    bottleInput.focus();
    return;
  }

  bottleSize = amount;
  addBottleButton.textContent = "+1 bottle (" + bottleSize + " oz)";
  bottleInput.removeAttribute("aria-invalid");
  bottleMessage.textContent = "Saved. Future bottles will use " + bottleSize + " oz.";
  saveData();
});

document.getElementById("custom-form").addEventListener("submit", function (event) {
  event.preventDefault();
  checkForNewDay();
  const amount = Number(customInput.value);

  if (!isValidAmount(amount)) {
    customMessage.textContent = "Enter a number greater than zero.";
    customInput.setAttribute("aria-invalid", "true");
    customInput.focus();
    return;
  }

  drinks.push(amount);
  customInput.value = "";
  customInput.removeAttribute("aria-invalid");
  customMessage.textContent = "Added " + amount + " oz.";
  updateDisplay();
  saveData();
  customInput.focus();
});

addBottleButton.addEventListener("click", function () {
  checkForNewDay();
  drinks.push(bottleSize);
  updateDisplay();
  saveData();
});

function updateDisplay() {
  let total = 0;
  drinkList.replaceChildren();

  drinks.forEach(function (amount, index) {
    total += amount;

    const item = document.createElement("li");
    const label = document.createElement("span");
    label.textContent = "Drink " + (index + 1) + ": " + amount + " oz";

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "Remove";
    removeButton.setAttribute("aria-label", "Remove drink " + (index + 1));
    removeButton.addEventListener("click", function () {
      if (checkForNewDay()) return;
      drinks.splice(index, 1);
      updateDisplay();
      saveData();
      // Keep keyboard focus near the removed drink instead of losing it.
      const nextItem = drinkList.children[Math.min(index, drinks.length - 1)];
      if (nextItem) {
        nextItem.querySelector("button").focus();
      } else {
        addBottleButton.focus();
      }
    });

    item.append(label, removeButton);
    drinkList.append(item);
  });

  // Avoid displaying floating-point artifacts such as 0.30000000000000004.
  totalDisplay.textContent = Number(total.toPrecision(15)) + " oz";
  emptyMessage.hidden = drinks.length > 0;
}

loadData();
bottleInput.value = bottleSize;
addBottleButton.textContent = "+1 bottle (" + bottleSize + " oz)";
updateDisplay();
saveData();

// Check while open, when returning to the window, and after a hidden tab returns.
setInterval(checkForNewDay, 1000);
window.addEventListener("focus", checkForNewDay);
document.addEventListener("visibilitychange", function () {
  if (!document.hidden) checkForNewDay();
});
