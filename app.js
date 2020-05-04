const { checkAndGenerate, createElement } = require("./util");

const initApp = () => {
  // Initializes the app, registers the button click listener
  const newUserButton = document.querySelector("#btnAddUser");
  newUserButton.addEventListener("click", addUser);
};

// addUser integrates with a lot of other functions, therefore has lots of dependencies
// this function does not take an input or give an output, it really edits something in the DOM
// therefore you may want to test this in E2E testing
// an integration test would be difficult here, as you'd need to do lots of manual interaciton with the DOM

// instead, we can use INTEGRATION TESTING on PART of the addUser function

const addUser = () => {
  // Fetches the user input, creates a new HTML element based on it
  // and appends the element to the DOM
  const newUserNameInput = document.querySelector("input#name");
  const newUserAgeInput = document.querySelector("input#age");

  // moved the below code into a new function, 'checkAndGenerate in UTIL.JS so we can test it
  // if (
  //   !validateInput(newUserNameInput.value, true, false) ||
  //   !validateInput(newUserAgeInput.value, false, true)
  // ) {
  //   return;
  // }
  const outputText = checkAndGenerate(
    newUserNameInput.value,
    newUserAgeInput.value
  );

  // if it does not pass the validation, it will not continue to create the element
  if (!outputText) {
    return;
  }

  const userList = document.querySelector(".user-list");

  const element = createElement("li", outputText, "user-item");
  userList.appendChild(element);
};

// Start the app!
initApp();
