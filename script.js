let firstNum = 0;
let secondNum = 0;
let operator = "";

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
  if (operator === "-") return subtract(numOne, numTwo);
  if (operator === "*") return multiply(numOne, numTwo);
  if (operator === "/") return divide(numOne, numTwo);
}
