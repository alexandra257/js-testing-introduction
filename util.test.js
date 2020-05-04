// importing puppeteer = headless v of chrome
const puppeteer = require("puppeteer");

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
test("should create an element with text and correct class", () => {
  const text = checkAndGenerate("Alex", 25);
  expect(text).toBe("Alex (25 years old)");
});

// will return a promise, so we can use async await
test("should click around", async () => {
  const browser = await puppeteer.launch({
    //sets up & launches a new browser using puppeteer with options we can define next
    headless: false, //runs a browser with a UI
    slowMo: 80, // slows down the automation so we can watch what's happening
    args: ['--window-size="1920, 1080'], //launches a browser with the defined width height pair, can be great to test responsive feautures
  });
  // creating a page object, by awaiting the browser to create a new page (will open up in chromium)
  const page = await browser.newPage();
  // we then tell it where to go once the page has been created
  await page.goto(
    "file:///Users/alexandranicolaides/Documents/Tutorials/js-testing-introduction/index.html"
  );
  // logic for what to do when the page loads
  // click takes the id of the selector it should click on
  await page.click("input#name");
  await page.type("input#name", "Jamie");
  await page.click("input#age");
  await page.type("input#age", "25");
  await page.click("#btnAddUser");
  // $eval lets us access an element - arg1 = element, arg2 = what you want to do with  it
  // we get the element (el) as an input and return the text content
  // because the result is returned by a promise, we store it in a variable
  // below we also implicity check that user-item exists as a class
  const finalText = await page.$eval(".user-item", (el) => el.textContent);
  expect(finalText).toBe("Jamie (25 years old)");
}, 10000); // passing in 10 seconds as an argument to the test, to increase the time we give the browser to complete the test and ensure it doesn't time out
