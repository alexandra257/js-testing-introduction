// ENSURE TO CHANGE TEST IN package.json TO "jest"
// to test run 'npm test' in the terminal, which will run all the tests in the file with jest

// using destructuring syntax to require something from util.js
// destructring = pulling some items out of the object and export it via the util.js file
// this is the native way to import with Jest

// below we are inmporting the generateText function, which will be globally available when we run our tests with Jest
// here we can add in any functions to test by using a comma
const { generateText, checkAndGenerate } = require("./util");

// arg1. describe the ouptut you are looking for within the test parentheses
// arg1. anonymous function that jest will execute to run your test
test("should output name and age", () => {
  const text = generateText("Alex", 25);
  // formulate the expectation, we pass in the thing we want to compare, in this case 'text'
  // then we chain on helper functions to the expectable object
  // toBe checks that a value is what you expect, using strict equality (===)
  expect(text).toBe("Alex (25 years old)");
});

/* we can run a second check within the same test passing in different values
  const text2 = generateText("Steph", 28);
  expect(text2).toBe("Steph (28 years old)");
});
*/

/* adding a second test to ensure we don't get a false positive
// you could write the test to check for the opposite of the test above, or for the same thing with different arguments
test("should output data-less text", () => {
  const text = generateText(undefined, null);
  expect(text).toBe("undefined (null years old)");
});
*/

// in this integration test, we expect the same output as the unit test, but it is more complex due to the function we are testing
// we have ruled our generateText being the cause of failure here, as we have already written passing unit tests for it above
// this means the integration test relies on the units that have already been tested, and we are just checking the integration of the them
test("should generate a valid text output", () => {
  const text = checkAndGenerate("Alex", 25);
  expect(text).toBe("Alex (25 years old)");
});
