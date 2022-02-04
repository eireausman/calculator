const displayResult = document.querySelector('.displayResult');
const displaySumHistory = document.querySelector('.displaySumHistory');
const displayOperator = document.querySelector('.displayOperator');
const number = document.querySelectorAll('.number');
const operator = document.querySelectorAll('.operator');

number.forEach(e => e.addEventListener('click', function() {
  numberAction(e.value);
}));
operator.forEach(e => e.addEventListener('click', function() {
  operatorAction(e.value);
}));


let storedNumber = "";
let secondNumber = "";
let storedOperator = "";
let usedOperator = "";
let summedResult = "";
let result = 0;
let CalculationPending = false;
const operators = [
  "Escape",
  "/",
  "x",
  "*",
  "-",
  "+",
  "=",
  "Enter",
];
const numbers = [
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "1",
  "0",
  ".",
  "Backspace",
];


displayResult.textContent = result;


window.addEventListener('keydown', function(e) {
  let thisKey = e.key;
  if (!thisKey) return;

  if (operators.includes(thisKey)) {
    operatorAction(thisKey);
  } else if (numbers.includes(thisKey)) {
    numberAction(thisKey);
  }
});


function numberAction(num) {
  if (CalculationPending == true) {
      if (num == "." && secondNumber.indexOf(".") != -1) {
        return;
      } 
    if (num == "Backspace" && secondNumber > 0) {
      secondNumber = secondNumber.slice(0, -1);
    } 
      else if (num != "Backspace") {
      secondNumber += num;
      }
    displayResult.textContent = secondNumber;
  } else {
      if (num == "." && storedNumber.indexOf(".") != -1) {
       return;
     } 
      if (num == "Backspace" && storedNumber > 0) {
      storedNumber = storedNumber.slice(0, -1);
      } else if (num != "Backspace") {
      storedNumber += num;
      }
    displayResult.textContent = storedNumber;
  }
}

function operatorAction(operator) { 
  if (operator == 'Escape') {
    displaySumHistory.textContent = "";
    displayOperator.textContent = "";
    displayResult.textContent = 0;
    storedNumber = "";
    secondNumber = "";
    storedOperator = "";
    CalculationPending = false;  
  } else if ((operator == '=' || operator == "Enter") && secondNumber > 0) {
    result = operate(storedNumber, secondNumber, storedOperator);
    CalculationPending = true; 
    secondNumber = "";
    storedNumber = result;
    displaySumHistory.textContent = storedNumber;
    displayOperator.textContent = "";
    displayResult.textContent = "";
  } else {
    if (secondNumber > 0) {
    result = operate(storedNumber, secondNumber, storedOperator);
    secondNumber = "";
    storedNumber = result;
    displaySumHistory.textContent = storedNumber;
    displayOperator.textContent = "";
    displayResult.textContent = "";
    }
    if (operator != "Enter" && operator != "=") {
      CalculationPending = true;
    }
    if (storedNumber > 0) {
      displaySumHistory.textContent = storedNumber;
      displayResult.textContent = "";
    }
  }
  storedOperator = operator;
  if (operator != "Escape" && operator != "Enter" && operator != "=" && storedNumber > 0) {
    displayOperator.textContent = operator;
  } 
}

function operate(storedNumber, secondNumber, storedOperator) { 
  if (storedOperator == '/') {
  summedResult = Number(storedNumber) / Number(secondNumber);
  storedOperator = usedOperator;
} else if (storedOperator == 'x' || storedOperator == '*') {
  summedResult = Number(storedNumber) * Number(secondNumber);
  storedOperator = usedOperator;
} else if (storedOperator == '-') {
  summedResult = Number(storedNumber) - Number(secondNumber);
  storedOperator = usedOperator;
} else if (storedOperator == '+') {
  summedResult = Number(storedNumber) + Number(secondNumber);
  storedOperator = usedOperator;
}
return summedResult;

}




