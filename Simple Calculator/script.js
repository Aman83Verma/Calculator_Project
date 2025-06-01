// Get result input
const resultInput = document.getElementById('result');

document.addEventListener('DOMContentLoaded', function(){
    initializeAnimatedBackground();
})
function initializeAnimatedBackground(){
    const symbol = document.querySelectorAll('.symbol');

    symbols.forEach(symbol => {
        // Random statring positions
        symbol.style.left = `${Math.random() * 90}%`;
        symbol.style.right = `${Math.random() * 90}%`;

        const duration = 15 + Math.random() * 15;
        const delay = Math.random() * 5;

        symbol.style.animationDuration = `${duration}s`;
        symbol.style.animationDelay = `${delay}s`;
    });
}

// Function to append values to the result
function appendToResult(value) {
    resultInput.value += value;
}

// Function to clear the result
function clearResult() {
    resultInput.value = '';
}

// Function to calculate the result
function calculate() {
    try {
        // Replace the multiplication symbol '×' with '*' for evaluation
        let expression = resultInput.value.replace(/×/g, '*');
        
        // Evaluate the expression
        const result = eval(expression);
        
        // Handle division by zero
        if (result === Infinity || result === -Infinity) {
            resultInput.value = 'Error: Division by zero';
        } else {
            // Format the result to avoid too many decimal places
            resultInput.value = Number.isInteger(result) ? result : parseFloat(result.toFixed(8));
        }
    } catch (error) {
        resultInput.value = 'Error';
    }
}

// Function to remove the last character (backspace)
function backspace() {
    resultInput.value = resultInput.value.slice(0, -1);
}

// Function to calculate square root
function calculateSquareRoot() {
    try {
        const value = parseFloat(resultInput.value);
        if (isNaN(value)) {
            resultInput.value = 'Error';
            return;
        }
        
        if (value < 0) {
            resultInput.value = 'Error: Invalid input';
            return;
        }
        
        const result = Math.sqrt(value);
        resultInput.value = Number.isInteger(result) ? result : parseFloat(result.toFixed(8));
    } catch (error) {
        resultInput.value = 'Error';
    }
}

// Function to calculate logarithm (base 10)
function calculateLogarithm() {
    try {
        const value = parseFloat(resultInput.value);
        if (isNaN(value)) {
            resultInput.value = 'log(';
            return;
        }
        
        if (value <= 0) {
            resultInput.value = 'Error: Invalid input';
            return;
        }
        
        const result = Math.log10(value);
        resultInput.value = Number.isInteger(result) ? result : parseFloat(result.toFixed(8));
    } catch (error) {
        resultInput.value = 'Error';
    }
}

// Add keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // Numbers, operators, and decimal point
    if (/[\d+\-*/.=]/.test(key)) {
        event.preventDefault();
        if (key === '=') {
            calculate();
        } else if (key === '*') {
            appendToResult('×');
        } else {
            appendToResult(key);
        }
    }
    
    // Enter key for calculation
    if (key === 'Enter') {
        event.preventDefault();
        calculate();
    }
    
    // Backspace key
    if (key === 'Backspace') {
        event.preventDefault();
        backspace();
    }
    
    // Escape key to clear
    if (key === 'Escape') {
        event.preventDefault();
        clearResult();
    }
    
    // Additional keyboard shortcuts for advanced operations
    if (key === 'r' || key === 'R') { // Square root
        event.preventDefault();
        calculateSquareRoot();
    }
    
    if (key === '^') { // Power
        event.preventDefault();
        appendToResult('**');
    }
    
    if (key === 'l' || key === 'L') { // Logarithm
        event.preventDefault();
        calculateLogarithm();
    }
    
    if (key === 'p' || key === 'P') { // PI
        event.preventDefault();
        appendToResult(Math.PI);
    }
});