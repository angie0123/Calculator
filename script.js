const html = {
  body: document.querySelector("body"),
  calculatorBody: document.querySelector(".calculator"),
  buttonContainer: document.querySelector(".buttons"),
  display: document.querySelector(".display"),
};

const calculator = {
  add: {
    fn: (a, b) => {
      return a + b;
    },
    symbol: "+",
  },
  subtract: {
    fn: (a, b) => {
      return a - b;
    },
    symbol: "-",
  },
  multiply: {
    fn: (a, b) => {
      return a * b;
    },
    symbol: "x",
  },
  divide: {
    fn: (a, b) => {
      return a / b;
    },
    symbol: "÷",
  },
  operate: {
    fn: (operator, a, b) => {
      return operator(a, b);
    },
    symbol: "=",
  },
};

const buttons = {};
const fnButtons = {};
let eval = {
  operand: null,
  operator: null,
};

function initCalc() {
  html.display.textContent = 0;
  addClearBtn();
  addNumericBtns();
  addDecimalBtn();
  addFunctionBtns();
  appendBtnsToHTML();
}

function addClearBtn() {
  const clear = document.createElement("div");
  clear.textContent = "AC";
  clear.classList.add("clear", "button");
  clear.addEventListener("click", clearDisplay);
  buttons["clear"] = clear;
}

function addNumericBtns() {
  for (let i = 0; i < 10; i++) {
    const button = document.createElement("div");
    button.classList.add(`button`, `number`, `number-${i}`);
    button.textContent = i;

    button.addEventListener("click", () => {
      updateDisplay(i);
    });
    const buttonName = `num${i}`;
    buttons[buttonName] = button;
  }
}

function addDecimalBtn() {
  const decimalBtn = document.createElement("div");
  decimalBtn.classList.add("button", "decimal");
  decimalBtn.textContent = ".";
  decimalBtn.addEventListener("click", () => {
    if (!html.display.textContent.includes(".")) updateDisplay(".");
  });
  buttons["decimal"] = decimalBtn;
}

function addFunctionBtns() {
  for (key in calculator) {
    const fnButton = document.createElement("div");
    fnButton.classList.add(`button`, `function`, `${key}`);
    fnButton.textContent = calculator[key].symbol;
    const eval = updateEval.bind(null, key);
    fnButton.addEventListener("click", () => {
      eval();
      clearDisplay();
      updateDisplay(0);
    });
    fnButtons[key] = fnButton;
  }
}

function appendBtnsToHTML() {
  const orderedBtns = [
    buttons.num7,
    buttons.num8,
    buttons.num9,
    buttons.clear,
    buttons.num4,
    buttons.num5,
    buttons.num6,
    fnButtons.divide,
    buttons.num1,
    buttons.num2,
    buttons.num3,
    fnButtons.multiply,
    buttons.num0,
    buttons.decimal,
    fnButtons.subtract,
    fnButtons.add,
    fnButtons.operate,
  ];

  for (button of orderedBtns) {
    html.buttonContainer.appendChild(button);
  }
}

// updates state of operand and operator
function updateEval(operator) {
  if (eval.operator !== null && eval.operand !== null) {
    const result = calculator.operate.fn(
      calculator[eval.operator].fn,
      eval.operand,
      +html.display.textContent
    );
    eval.operand = result;
  } else if (eval.operand === null) {
    eval.operand = +html.display.textContent;
  }
  eval.operator = operator === "operate" ? null : operator;
  console.log(eval);
}

function updateDisplay(num) {
  if (html.display.textContent != 0) {
    html.display.textContent += num;
  } else {
    html.display.textContent = num;
  }
}

function clearDisplay() {
  html.display.textContent = 0;
}

initCalc();
