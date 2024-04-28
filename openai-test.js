const API_KEY = "";
//import OpenAI from "openai";
// const submitButton = document.querySelector("#submit");
const form = document.getElementById("input-form"); // added
form.addEventListener("submit", getMessage); // added
const outPutElement = document.getElementById("output-box");
//const OpenAI = require("openai");
const inputElement = document.querySelector("input");
const buttonElement = document.querySelector("button");
const responseElement = document.querySelector("#response");
const inputBox = document.querySelector("#input-box");

function changeInput(value) {
  const inputElement = document.querySelector("input");
  inputElement.value = value;
}

function clearInput() {
  inputBox.value = ""; // Set the value to an empty string to clear the input
}

async function getMessage(e) {
  e.preventDefault();
  console.log("clicked");
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: inputElement.value }],
      max_tokens: 1000,
    }),
  };

  const form = document.querySelector("#input-form");
form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission (page reload)
    // Perform form submission logic (e.g., API call)
    // After submitting the form, clear the input box
    clearInput();
});

  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const data = await response.json();
    console.log(data);
    console.log(outPutElement);
    // outPutElement.textContent = data.choices[0].message.content;
    if (data.choices[0].message.content) {
      const pElement = document.createElement("p");
      // pElement.textContent = inputElement.value;
      pElement.textContent = data.choices[0].message.content;
      pElement.addEventListener("click", () =>
        changeInput(pElement.textContent)
      );
      outPutElement.append(pElement);
    }
  } catch (error) {
    console.error(error);
  }
}

// submitButton.addEventListener("click", getMessage);

function clearInput() {
  inputElement.value = "";
}

buttonElement.addEventListener("click", clearInput);
