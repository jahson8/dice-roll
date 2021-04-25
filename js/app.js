// DOM Selections
const dieInput = document.getElementById("die-num");
const createDieBtn = document.getElementById("create-die");
const diceForm = document.querySelector(".selection-form");
const rollDice = document.getElementById("dieRoll");
let firstRoll = true;

// Helper Functions

// Dice HTML
const generateDiceHtml = (num) => {
  return `<img src="img/dice-${num}.svg" alt="dice face ${num}" class="die" />`;
};

// Generates Roll Summary HTML
const rollSummaryHtml = (rollValue, idx) => {
  return `<li>Die <span class="die-value">${
    idx + 1
  } :</span > <span class="roll-value">${rollValue}</span> </li>`;
};

const updateRollHistory = () => {
  let rolls = document.querySelectorAll(".roll-value");
  let histOl = document.querySelector("#history");
  let histLi = document.createElement("li");
  let output = "( ";
  let total = document.querySelector("#total").textContent;
  rolls.forEach((roll) => {
    output += ` ${roll.textContent},  `;
  });
  output += ") ";
  histLi.innerHTML = `
  <p>result: <span>${output}</span></p>
  <p>Sum: <span>${total}</span></p>
`;
  histOl.prepend(histLi);
};

// Event Handlers
//  Display Dice on the screen
const displayDice = (evt) => {
  let numDie = dieInput.value;
  const diceDisp = document.querySelector(".dice-dp");
  let diceHtml = "";

  // Stop Form  Submitting
  evt.preventDefault();

  // Generates the number of dice selected by user on screen
  for (let i = 1; i <= numDie; i++) {
    diceHtml += generateDiceHtml(i);
  }
  diceDisp.innerHTML = diceHtml;
};

//handles the roll Dice event updates roll summary and roll history widgets
const handleDiceRoll = () => {
  const dice = document.querySelectorAll(".die");
  const total = document.getElementById("total");
  const summaryUl = document.querySelector(".roll-message");
  let totVal = 0;
  let msg = "";

  // updates roll history if it isnt the first dice roll
  if (!firstRoll) {
    updateRollHistory();
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
    }, 1000);
  });

  firstRoll = false;
};

// Event Listeners
diceForm.addEventListener("submit", displayDice);
rollDice.addEventListener("click", handleDiceRoll);
