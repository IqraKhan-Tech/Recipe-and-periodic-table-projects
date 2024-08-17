let display = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

// Convert the NodeList of buttons into an Array
let buttonsArray = Array.from(buttons);

// Variables to store the current operation and previous values
let currentInput = '';
let operator = '';
let previousValue = '';

// Loop through each button and add event listeners
buttonsArray.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
        let buttonValue = e.target.innerText;

        if (buttonValue === 'C') {
            // Clear the display
            display.value = '';
            currentInput = '';
            previousValue = '';
            operator = '';
        } else if (buttonValue === 'DEL') {
            // Delete the last character
            currentInput = currentInput.slice(0, -1);
            display.value = currentInput;
        } else if (buttonValue === '=') {
            // Evaluate the expression
            if (operator && previousValue && currentInput) {
                let result;
                switch (operator) {
                    case '+':
                        result = parseFloat(previousValue) + parseFloat(currentInput);
                        break;
                    case '-':
                        result = parseFloat(previousValue) - parseFloat(currentInput);
                        break;
                    case '×':
                        result = parseFloat(previousValue) * parseFloat(currentInput);
                        break;
                    case '÷':
                        if (currentInput === '0') {
                            display.value = 'Error';
                            return;
                        }
                        result = parseFloat(previousValue) / parseFloat(currentInput);
                        break;
                }
                display.value = result;
                currentInput = result;
                operator = '';
                previousValue = '';
            }
        } else if (['+', '-', '×', '÷'].includes(buttonValue)) {
            // Set the operator and store the current input
            if (currentInput) {
                previousValue = currentInput;
                currentInput = '';
                operator = buttonValue;
                display.value = '';
            }
        } else {
            // Append number or decimal point to the current input
            currentInput += buttonValue;
            display.value = currentInput;
        }
    });
});