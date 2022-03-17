const calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b,
};
function operate(operator, a, b) {
  return operator(a, b);
}

function initCalc() {}

initCalc();
