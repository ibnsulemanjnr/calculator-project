// Select all required elements
const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentInput = ""; // Current number being typed
let previousInput = ""; // Previous number
let operator = ""; // Current operator

// Function to update the display
function updateDisplay(value) {
    display.textContent = value;
}

// Function to handle button clicks
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const buttonValue = button.textContent;

        // Handle clear button
        if (button.id === "btn-clear") {
            currentInput = "";
            previousInput = "";
            operator = "";
            updateDisplay("0");
        }

        // Handle number and dot buttons
        else if (!isNaN(buttonValue) || buttonValue === ".") {
            if (buttonValue === "." && currentInput.includes(".")) {
                return; // Prevent multiple dots
            }
            currentInput += buttonValue;
            updateDisplay(currentInput);
        }

        // Handle operator buttons
        else if (["+", "-", "×", "÷"].includes(buttonValue)) {
            if (currentInput === "" && buttonValue === "-") {
                // Allow negative numbers
                currentInput = "-";
                updateDisplay(currentInput);
                return;
            }
            if (currentInput !== "") {
                previousInput = currentInput;
                currentInput = "";
                operator = buttonValue;
            }
        }

        // Handle equal button
        else if (button.id === "btn-equal") {
            if (previousInput !== "" && currentInput !== "" && operator !== "") {
                const num1 = parseFloat(previousInput);
                const num2 = parseFloat(currentInput);

                let result;

                // Perform the calculation
                switch (operator) {
                    case "+":
                        result = num1 + num2;
                        break;
                    case "-":
                        result = num1 - num2;
                        break;
                    case "×":
                        result = num1 * num2;
                        break;
                    case "÷":
                        result = num2 !== 0 ? num1 / num2 : "Error";
                        break;
                    default:
                        return;
                }

                updateDisplay(result);
                previousInput = "";
                currentInput = "";
                operator = "";
            }
        }
    });
});
