"use strict";

const guessForm = document.querySelector("#guess-form");
const guessInput = document.querySelector("#guess-input");
const guessButton = guessForm.querySelector("button[type='submit']");
const feedback = document.querySelector("#feedback");
const attemptCount = document.querySelector("#attempt-count");
const guessHistory = document.querySelector("#guess-history");
const restartButton = document.querySelector("#restart-button");

let secretNumber;
let attempts;
let guesses;

function startNewGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  guesses = [];

  attemptCount.textContent = "0";
  guessHistory.textContent = "—";
  guessInput.value = "";
  guessInput.disabled = false;
  guessButton.disabled = false;
  feedback.textContent = "Enter a number to get started.";
  feedback.removeAttribute("data-state");
  guessInput.focus();
}

guessForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const guess = Number(guessInput.value);
  if (!Number.isInteger(guess) || guess < 1 || guess > 100) {
    feedback.textContent = "Please enter a whole number between 1 and 100.";
    feedback.dataset.state = "invalid";
    guessInput.focus();
    return;
  }

  attempts += 1;
  guesses.push(guess);
  attemptCount.textContent = String(attempts);
  guessHistory.textContent = guesses.join(", ");

  if (guess === secretNumber) {
    feedback.textContent = `You got it! The number was ${secretNumber}.`;
    feedback.dataset.state = "won";
    guessInput.disabled = true;
    guessButton.disabled = true;
  } else if (guess < secretNumber) {
    feedback.textContent = "Too low — try a higher number.";
    feedback.dataset.state = "low";
  } else {
    feedback.textContent = "Too high — try a lower number.";
    feedback.dataset.state = "high";
  }

  if (!guessInput.disabled) {
    guessInput.value = "";
    guessInput.focus();
  }
});

restartButton.addEventListener("click", startNewGame);

startNewGame();
