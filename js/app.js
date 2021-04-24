// DOM Selections
const dieInput = document.getElementById("die-num");
const createDieBtn = document.getElementById("create-die");
const diceForm = document.querySelector(".selection-form");
const rollDice = document.getElementById("dieRoll");

// Helper Functions

// Dice HTML
const generateDiceHtml = (num) => {
  return `<img src="img/dice-${num}.svg" alt="dice face ${num}" class="die" />`;
};

const rollSummaryHtml = (rollValue, idx) => {
  return `<li><span>Die ${idx + 1}:</span> ${rollValue}</li>`;
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
  const summUl = document.querySelector(".roll-message");
  let msg = "";
  let totVal = 0;

  dice.forEach((die, idx) => {
    let rollValue = Math.floor(Math.random() * 6) + 1;
    totVal += rollValue;

    // updates Dice Display
    die.src = `img/dice-${rollValue}.svg`;
    die.alt = `dice face ${rollValue}`;
    die.classList.add("roll");

    setTimeout(() => {
      // remove roll class to stop spinning animation
      die.classList.remove("roll");

      // updates Roll Summary Widget
      msg += rollSummaryHtml(rollValue, idx);
      summUl.innerHTML = msg;
      total.innerHTML = totVal;
      console.log(totVal);
    }, 1000);
  });
};

// Event Listeners
diceForm.addEventListener("submit", displayDice);
rollDice.addEventListener("click", handleDiceRoll);
