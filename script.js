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
  divide: { fn: (a, b) => a / b, symbol: "%" },
  operate: { fn: (operator, a, b) => operator(a, b), symbol: "=" },
};

function initCalc() {
  html.display.textContent = "1233";

  const clear = document.createElement("div");
  clear.classList.add("clear");
  html.buttonContainer.appendChild(clear);
  for (let i = 0; i < 10; i++) {
    const button = document.createElement("div");
    button.classList.add(`button`, `number`, `number-${i}`);
    button.textContent = i;
    html.buttonContainer.appendChild(button);
  }
  const decimalBtn = document.createElement("div");
  decimalBtn.classList.add("button", "decimal");
  decimalBtn.textContent = ".";
  html.buttonContainer.appendChild(decimalBtn);

  for (key in calculator) {
    const fnButton = document.createElement("div");
    fnButton.classList.add(`button`, `function`, `${key}`);
    fnButton.textContent = calculator[key].symbol;
    html.buttonContainer.appendChild(fnButton);
  }
}

initCalc();
