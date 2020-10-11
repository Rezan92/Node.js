const fetch = require("node-fetch");
/**
 * 2. Authentication
 * 
 * Using node-fetch make an authenticated request to https://restapiabasicauthe-sandbox.mxapps.io/api/books
 * Print the response to the console. Use async-await and try/catch.
 * 
 * Hints:
 * - for basic authentication the username and password need to be base64 encoded
 */
async function printBooks() {
  // YOUR CODE GOES IN HERE
  try {
    const response = await fetch("https://restapiabasicauthe-sandbox.mxapps.io/api/books",{
      headers : {"Authorization": "Basic YWRtaW46aHZnWDhLbFZFYQ=="}
    });
    const text = await response.text();
    console.log(text);
  } catch (error) {
    console.log(error);
  }
}

printBooks();