const html = {
  body: document.querySelector("body"),
  calculatorBody: document.querySelector(".calculator"),
  buttonContainer: document.querySelector(".buttons"),
  displayContainer: document.querySelector(".display"),
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
  addDisplay();
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
  clear.addEventListener("click", reset);
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
    if (!html.displayMain.textContent.includes(".")) updateDisplay(".");
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
      +html.displayMain.textContent
    );
    eval.operand = result;
  } else if (eval.operand === null) {
    eval.operand = +html.displayMain.textContent;
  }
  eval.operator = operator === "operate" ? null : operator;
  html.displayMain.textContent = 0;
  updateDisplay(0);
}

function updateDisplay(num) {
  updateTopDisplay();
  updateMainDisplay(num);
}

function updateTopDisplay() {
  html.displayTop.textContent = eval.operand === null ? "" : eval.operand;
}

function updateMainDisplay(num) {
  if (num === 0) {
    html.displayMain.textContent = num;
  } else if (html.displayMain.textContent != 0) {
    html.displayMain.textContent += num;
  } else {
    html.displayMain.textContent = num;
  }
}

function addDisplay() {
  html.displayTop = document.createElement("div");
  html.displayTop.classList.add("display-top");

  html.displayMain = document.createElement("div");
  html.displayMain.classList.add("display-main");

  html.displayContainer.appendChild(html.displayTop);
  html.displayContainer.appendChild(html.displayMain);
  html.displayMain.textContent = 0;
}

function clearDisplay() {
  updateDisplay(0);
}

function reset() {
  eval.operand = null;
  eval.operator = null;
  clearDisplay();
}

initCalc();
