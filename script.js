let firstNum = "";
let secondNum = "";
let operator = "";
let total = 0;

function add(numOne, numTwo) {
  return numOne + numTwo;
}

function subtract(numOne, numTwo) {
  return numOne - numTwo;
}

function multiply(numOne, numTwo) {
  return numOne * numTwo;
}

function divide(numOne, numTwo) {
  return numOne / numTwo;
}

function operate(operator, numOne = 0, numTwo = 0) {
  if (operator === "+") return add(numOne, numTwo);
  if (operator === "–") return subtract(numOne, numTwo);
  if (operator === "×") return multiply(numOne, numTwo);
  if (operator === "÷") return divide(numOne, numTwo);
}

function updateCalcDisplay(...args) {
  const calcDisplay = document.querySelector(".display-container");
  const displayContent = args.join(" ");
  calcDisplay.insertAdjacentHTML("beforeend", displayContent);
}

function clearCalcDisplay() {
  const calcDisplay = document.querySelector(".display-container");
  calcDisplay.innerHTML = "";
}

function resetFirstNumber() {
  firstNum = "";
}

function resetSecondNumber() {
  secondNum = "";
}

function resetOperator() {
  operator = "";
}

function resetTotal() {
  total = 0;
}

function updateFirstNumberValue(value, concatenate = false) {
  if (concatenate) return (firstNum += value);
  return (firstNum = value);
}

function updateSecondNumberValue(value, concatenate = false) {
  if (concatenate) return (secondNum += value);
  return (secondNum = value);
}

function updateOperatorValue(value) {
  operator = value;
}

function setFirstNumber(value) {
  updateFirstNumberValue(value, true);
  clearCalcDisplay();
  updateCalcDisplay(firstNum, operator, secondNum);
}

function setSecondNumber(value) {
  updateSecondNumberValue(value, true);
  clearCalcDisplay();
  updateCalcDisplay(firstNum, operator, secondNum);
}

function setOperator(value) {
  updateOperatorValue(value, true);
  clearCalcDisplay();
  updateCalcDisplay(firstNum, operator, secondNum);
}

function handleEqualsEvent() {
  clearCalcDisplay();

  if (Number.isNaN(total) || Number.isFinite(total)) return updateCalcDisplay("Sorry, you can't divide by 0.");

  total = operate(
    operator,
    firstNum % 2 === 0 ? Number.parseInt(firstNum) : Number.parseFloat(firstNum),
    secondNum % 2 === 0 ? Number.parseInt(secondNum) : Number.parseFloat(secondNum)
  );

  let roundedTotal = total % 2 === 0 ? total : Math.round(total * 10000000000) / 10000000000;

  updateFirstNumberValue(roundedTotal.toString());
  resetSecondNumber();
  resetOperator();
  updateCalcDisplay(roundedTotal);
}

function handleNewDigitEvent(value) {
  updateFirstNumberValue(value);
  resetTotal();
  resetSecondNumber();
  resetOperator();
  clearCalcDisplay();
  updateCalcDisplay(firstNum, operator, secondNum);
}

function attachEventListeners() {
  const numberBtns = document.querySelectorAll(".number-btn");
  const operatorBtns = document.querySelectorAll(".operator-btn");
  const clearBtn = document.querySelector(".clear-btn");
  const equalBtn = document.querySelector(".equal-btn");

  numberBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const buttonValue = event.target.innerText;

      if (firstNum === "" && operator === "" && secondNum === "") return setFirstNumber(buttonValue);
      if (firstNum !== "" && operator !== "") return setSecondNumber(buttonValue);
      if (total > 0 && secondNum === "") return handleNewDigitEvent(buttonValue);
    });
  });

  operatorBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const buttonValue = event.target.innerText;
      if (firstNum !== "" && secondNum === "") return setOperator(buttonValue);
    });
  });

  clearBtn.addEventListener("click", () => {
    clearCalcDisplay();
    resetFirstNumber();
    resetSecondNumber();
    resetOperator();
  });

  equalBtn.addEventListener("click", () => {
    if (firstNum !== "" && operator !== "" && secondNum !== "") handleEqualsEvent();
  });
}

attachEventListeners();
