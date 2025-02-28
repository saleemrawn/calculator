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

function enableButton(button) {
  button.removeAttribute("disabled");
}

function disableButton(button) {
  button.setAttribute("disabled", "");
}

function handleEqualsEvent() {
  if (firstNum === "" || operator === "" || secondNum === "") return -1;

  clearCalcDisplay();

  if (operator === "÷" && (firstNum === "0" || secondNum === "0")) {
    resetFirstNumber();
    resetSecondNumber();
    resetOperator();
    resetTotal();
    updateCalcDisplay("Sorry, you can't divide by 0.");
    return;
  }

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

function handleBackspaceEvent() {
  if (firstNum !== "" && operator === "") {
    firstNum = firstNum.substring(0, firstNum.length - 1);
    clearCalcDisplay();
    updateCalcDisplay(firstNum, operator, secondNum);
  }

  if (operator !== "" && secondNum === "") {
    resetOperator();
    clearCalcDisplay();
    updateCalcDisplay(firstNum, operator, secondNum);
  }

  if (secondNum !== "") {
    secondNum = secondNum.substring(0, secondNum.length - 1);
    clearCalcDisplay();
    updateCalcDisplay(firstNum, operator, secondNum);
  }
}

function handleClearEvent() {
  const decimalBtn = document.querySelector(".decimal-btn");

  clearCalcDisplay();
  enableButton(decimalBtn);
  resetFirstNumber();
  resetOperator();
  resetSecondNumber();
  resetTotal;
}

function handleDecimalEvent(eventValue) {
  const decimalBtn = document.querySelector(".decimal-btn");

  if (firstNum !== "" && operator === "" && secondNum === "") {
    updateFirstNumberValue(eventValue, true);
    disableButton(decimalBtn);
    clearCalcDisplay();
    updateCalcDisplay(firstNum, operator, secondNum);
    return;
  }

  if (firstNum !== "" && operator !== "") {
    updateSecondNumberValue(eventValue, true);
    disableButton(decimalBtn);
    clearCalcDisplay();
    updateCalcDisplay(firstNum, operator, secondNum);
    return;
  }
}

function attachEventListeners() {
  const numberBtns = document.querySelectorAll(".number-btn");
  const operatorBtns = document.querySelectorAll(".operator-btn");
  const clearBtn = document.querySelector(".clear-btn");
  const equalBtn = document.querySelector(".equal-btn");
  const decimalBtn = document.querySelector(".decimal-btn");

  /* [START] Keydown Events */
  document.addEventListener("keydown", (event) => {
    event.preventDefault();

    if (total > 0 && operator === "" && secondNum === "" && event.code === `Digit${event.key}`)
      return handleNewDigitEvent(event.key);

    if (
      (firstNum === "" && operator === "" && event.code === `Digit${event.key}`) ||
      (firstNum !== "" && operator === "" && secondNum === "" && event.code === `Digit${event.key}`)
    )
      return setFirstNumber(event.key);

    if (firstNum !== "" && operator !== "" && event.code === `Digit${event.key}`) return setSecondNumber(event.key);

    if (firstNum !== "" && secondNum === "" && (event.code === "Slash" || event.code === "NumpadDivide"))
      return setOperator("÷");

    if (
      firstNum !== "" &&
      secondNum === "" &&
      ((event.shiftKey && event.code === "Equal") || event.code === "NumpadAdd")
    )
      return setOperator("+");

    if (
      firstNum !== "" &&
      secondNum === "" &&
      ((event.shiftKey && event.code === "Digit8") || event.code === "NumpadMultiply")
    )
      return setOperator("×");

    if (firstNum !== "" && secondNum === "" && event.code === "Minus") return setOperator("–");

    if (event.code === "Period" || event.code === "NumpadDecimal") return handleDecimalEvent(event.key);
    if (event.code === "Enter" || event.code === "NumpadEnter" || event.code === "Equal") return handleEqualsEvent();
    if (event.code === "KeyC") return handleClearEvent();
    if (event.code === "Backspace" || event.code === "Delete") return handleBackspaceEvent();
  });
  /* [END] Keydown Events */

  /* [START] Click Events */
  numberBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const buttonValue = event.target.innerText;

      if (total > 0 && operator === "" && secondNum === "") return handleNewDigitEvent(buttonValue);
      if (firstNum === "" && operator === "" && secondNum === "") return setFirstNumber(buttonValue);
      if (firstNum !== "" && operator === "" && secondNum === "") return setFirstNumber(buttonValue);
      if (firstNum !== "" && operator !== "") return setSecondNumber(buttonValue);
    });
  });

  operatorBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const buttonValue = event.target.innerText;
      if (firstNum !== "" && secondNum === "") setOperator(buttonValue);
      enableButton(decimalBtn);
    });
  });

  clearBtn.addEventListener("click", () => handleClearEvent());

  equalBtn.addEventListener("click", () => {
    if (firstNum !== "" && operator !== "" && secondNum !== "") handleEqualsEvent();
  });

  decimalBtn.addEventListener("click", (event) => {
    const buttonValue = event.target.innerText;
    handleDecimalEvent(buttonValue);
  });
  /* [END] Click Events */
}

attachEventListeners();
