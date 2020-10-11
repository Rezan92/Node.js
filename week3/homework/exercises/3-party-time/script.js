const fetch = require("node-fetch");
/**
 * 3: Party time
 * 
 * After reading the documentation make a request to https://reservation100-sandbox.mxapps.io/rest-doc/api
 * and print the response to the console. Use async-await and try/catch.
 * 
 * Hints:
 * - make sure to use the correct headers and http method in the request
 */

async function makeReservation() {
  // YOUR CODE GOES IN HERE
  try {
    const response = await fetch("https://reservation100-sandbox.mxapps.io/api/reservations", {
      method: 'post',
      body: JSON.stringify({
        "name": "Rezan Ibrahim",
        "numberOfPeople": 2
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const text = await response.json();
    console.log(text);
  } catch (error) {
    console.log(error);
  };
}

makeReservation();