// DOM Selections
const dieInput = document.getElementById("die-num");
const createDieBtn = document.getElementById("create-die");
const diceForm = document.querySelector(".selection-form");
const rollDice = document.getElementById("dieRoll");
let totVal = 0;
let firstRoll = true;

// Helper Functions

// Dice HTML
const generateDiceHtml = (num) => {
  return `<img src="img/dice-${num}.svg" alt="dice face ${num}" class="die"  data-value="${num}"/>`;
};

// Generates Roll Summary HTML
const rollSummaryHtml = (rollValue, idx) => {
  return `<li><span>Die ${idx + 1}:</span> ${rollValue}</li>`;
};

const updateRollHistory = (dice) => {
  let history = "( ";
  dice.forEach((die) => {
    history += die.dataset.value;
    history += " ";
  });
  history += ")";
  console.log(history);
};

// Event Handlers
//  Display Dice on the screen
const displayDice = (evt) => {
  let numDie = dieInput.value;
  const diceDisp = document.querySelector(".dice-dp");
  const warning = document.querySelector(".warning");
  let diceHtml = "";

  // Stop Form  Submitting
  evt.preventDefault();

  // Generates the number of dice selected by user on screen
  if (numDie > 6 || numDie < 1) {
    warning.style.display = "block";
    diceHtml = generateDiceHtml(1);
  } else {
    for (let i = 1; i <= numDie; i++) {
      warning.style.display = "none";
      diceHtml += generateDiceHtml(i);
    }
  }
  diceDisp.innerHTML = diceHtml;
};

//handles the roll Dice and roll summary functionality
const handleDiceRoll = () => {
  const dice = document.querySelectorAll(".die");
  const total = document.getElementById("total");
  const summaryUl = document.querySelector(".roll-message");
  let msg = "";

  // updates roll history if not the initial dice roll
  if (!firstRoll) {
    updateRollHistory(dice);
  }

  dice.forEach((die, idx) => {
    let rollValue = Math.floor(Math.random() * 6) + 1;
    totVal += rollValue;

    // updates Dice Display
    die.src = `img/dice-${rollValue}.svg`;
    die.alt = `dice face ${rollValue}`;
    die.dataset.value = rollValue;
    die.classList.add("roll");

    setTimeout(() => {
      // remove roll class to stop spinning animation
      die.classList.remove("roll");

      // updates Roll Summary Widget
      msg += rollSummaryHtml(rollValue, idx);
      summaryUl.innerHTML = msg;
      total.innerHTML = totVal;
      firstRoll = false;
    }, 1000);
  });
};

// Event Listeners
diceForm.addEventListener("submit", displayDice);
rollDice.addEventListener("click", handleDiceRoll);
