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
