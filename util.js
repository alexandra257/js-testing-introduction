// this file holds the functions being imported into app.js
// uses node.js syntax because it's easier to test (easily compatible with Jest as it's native)
// react & angular will require a more complex build workflow & additional packages
// webpack is used to bundle it
// these are the functions we will be testing

// great for a simple unit test as it is fully isolated
// takes an input and returns one output
exports.generateText = (name, age) => {
  // Returns output text
  return `${name} (${age} years old)`;
};

exports.createElement = (type, text, className) => {
  // Creates a new HTML element and returns it
  const newElement = document.createElement(type);
  newElement.classList.add(className);
  newElement.textContent = text;
  return newElement;
};

exports.validateInput = (text, notEmpty, isNumber) => {
  // Validate user input with two pre-defined rules
  if (!text) {
    return false;
  }
  if (notEmpty && text.trim().length === 0) {
    return false;
  }
  if (isNumber && +text === NaN) {
    return false;
  }
  return true;
};
