// this file holds the functions being imported into app.js
// uses node.js syntax because it's easier to test (easily compatible with Jest as it's native)
// react & angular will require a more complex build workflow & additional packages
// webpack is used to bundle it
// these are the functions we will be testing

// great for a simple unit test as it is fully isolated
// takes an input and returns one output
// changing exports. to const, so we can use these functions in our util file, then exporting at the bottom of the script
const generateText = (name, age) => {
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

const validateInput = (text, notEmpty, isNumber) => {
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

// this function is now good for an integration test
exports.checkAndGenerate = (name, age) => {
  if (!validateInput(name, true, false) || !validateInput(age, false, true)) {
    return false;
  } // we make a call to generateText where name and age are passed, because that's what is then returned (the checked text)
  return generateText(name, age);
};

exports.generateText = generateText;
exports.validateInput = validateInput;
