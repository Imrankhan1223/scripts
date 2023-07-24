// Define your password here (replace "yourPassword" with your chosen password)
const password = "yourPassword";

// Initialize an array to store the entered names
let namesArray = [];

// Function to prompt for password and check access
function authenticate() {
  const enteredPassword = prompt("Please enter the password to access the name selector:");

  if (enteredPassword === password) {
    enableInputFields();
    document.getElementById("authenticationStatus").textContent = "Authenticated";
  } else {
    document.getElementById("authenticationStatus").textContent = "Access denied. Please try again.";
    authenticate();
  }
}

// Function to enable input fields if authenticated
function enableInputFields() {
  const inputFields = document.querySelectorAll("input");
  const addNameButton = document.querySelector("button[onclick='addName()']");
  const selectRandomButton = document.querySelector("button[onclick='selectRandomNames()']");
  const resetButton = document.querySelector("button[onclick='resetNames()']");

  inputFields.forEach((input) => {
    input.disabled = false;
  });

  addNameButton.disabled = false;
  selectRandomButton.disabled = false;
  resetButton.disabled = false;
}

// Check authentication status on page load
window.onload = function () {
  authenticate();
};

// Function to add the name to the list
function addName() {
  const nameInput = document.getElementById("nameInput");
  const nameList = document.getElementById("nameList");
  const name = nameInput.value.trim();

  if (name !== "") {
    namesArray.push(name);
    const listItem = document.createElement("li");
    listItem.textContent = name;
    nameList.appendChild(listItem);
    nameInput.value = "";
  }
}

// Function to select random names with suspense animation
async function selectRandomNames() {
  const numSelections = parseInt(document.getElementById("numSelections").value, 10);
  const selectedNamesElement = document.getElementById("selectedNames");
  selectedNamesElement.textContent = "";
  const suspenseGraphic = document.getElementById("suspenseGraphic");

  if (namesArray.length > 0 && numSelections > 0) {
    suspenseGraphic.style.visibility = "visible"; // Show the suspense graphic

    const availableNames = namesArray.slice();

    for (let i = 0; i < numSelections; i++) {
      if (availableNames.length === 0) {
        break; // If all names are already selected, exit the loop
      }

      suspenseGraphic.setAttribute("data-content", getRandomLetters(6)); // Update suspense graphic with random letters

      await showSuspenseAnimation(800); // Adjust the delay time (in milliseconds) to control the suspense

      suspenseGraphic.textContent = availableNames.splice(Math.floor(Math.random() * availableNames.length), 1)[0];

      // Display the selected name(s) after suspense animation
      if (selectedNamesElement.textContent !== "") {
        selectedNamesElement.textContent += ", ";
      }
      selectedNamesElement.textContent += suspenseGraphic.textContent;
    }

    suspenseGraphic.style.visibility = "hidden"; // Hide the suspense graphic after the selection process
  }
}

// Function to generate random letters
function getRandomLetters(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Function to show suspense animation
function showSuspenseAnimation(delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}

// Function to reset the list of names
function resetNames() {
  namesArray = [];
  const nameList = document.getElementById("nameList");
  nameList.innerHTML = "";
  const selectedNamesElement = document.getElementById("selectedNames");
  selectedNamesElement.textContent = "";
}

// Function to handle pressing "Enter" in the name input field
function handleEnter(event) {
  if (event.key === "Enter") {
    addName();
    event.preventDefault(); // Prevent the default behavior of the Enter key (e.g., form submission)
  }
}
