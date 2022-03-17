const html = {
  body: document.querySelector("body"),
  calculatorBody: document.querySelector(".calculator"),
  buttonContainer: document.querySelector(".buttons"),
  display: document.querySelector(".display"),
};

const calculator = {
  add: { fn: (a, b) => a + b, symbol: "+" },
  subtract: { fn: (a, b) => a - b, symbol: "-" },
  multiply: { fn: (a, b) => a * b, symbol: "x" },
  divide: { fn: (a, b) => a / b, symbol: "÷" },
  operate: { fn: (operator, a, b) => operator(a, b), symbol: "=" },
};

const buttons = {};
const fnButtons = {};
let numToDisplay;

function initCalc() {
  html.display.textContent = "1234";
  const clear = document.createElement("div");
  clear.textContent = "AC";
  clear.classList.add("clear", "button");
  clear.addEventListener("click", () => (html.display.textContent = ""));
  buttons["clear"] = clear;

  for (let i = 0; i < 10; i++) {
    const button = document.createElement("div");
    button.classList.add(`button`, `number`, `number-${i}`);
    button.textContent = i;
    const buttonName = `num${i}`;
    buttons[buttonName] = button;
  }
  const decimalBtn = document.createElement("div");
  decimalBtn.classList.add("button", "decimal");
  decimalBtn.textContent = ".";
  buttons["decimal"] = decimalBtn;

  for (key in calculator) {
    const fnButton = document.createElement("div");
    fnButton.classList.add(`button`, `function`, `${key}`);
    fnButton.textContent = calculator[key].symbol;
    fnButtons[key] = fnButton;
  }

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
  console.log(orderedBtns);
}

initCalc();
