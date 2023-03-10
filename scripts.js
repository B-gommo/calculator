function add(a, b) {
    return parseFloat(a) + parseFloat(b);
}

function subtract(a, b) {
    return parseFloat(a) - parseFloat(b);
}

function multiply(a, b) {
    return parseFloat(a) * parseFloat(b);
}

function divide(a, b) {
    return parseFloat(a) / parseFloat(b);
}

function operate(operator, a, b) {
    if (operator === '+') {
        return Number.isInteger(add(a, b)) ? add(a, b) : Number(add(a, b).toFixed(4));
    } else if (operator === '-') {
        return Number.isInteger(subtract(a, b)) ? subtract(a, b) : Number(subtract(a, b).toFixed(4));
    } else if (operator === '*') {
        return Number.isInteger(multiply(a, b)) ? multiply(a, b) : Number(multiply(a, b).toFixed(4));
    } else if (operator === '/') {
        if (b === '0') {
            buttons.forEach(button => {
                button.disabled = true;
            })
            return "Are you trying to break me?"
        } else {
            return Number.isInteger(divide(a, b)) ? divide(a, b) : Number(divide(a, b).toFixed(4));
        }
    }
}

function percent(a, b) {
    return (Number(b) * Number(a)) / 100;
}

function clears() {
    operator = undefined;
    prevOperator = undefined;
    if (prevButton !== undefined) {
        prevButton.style.backgroundColor = "rgb(202, 130, 47)";
    }
    prevButton = undefined;
    displayValue = undefined;
    firstValue = undefined;
    secondValue = undefined;
    sum = undefined;
    display.innerText = '';
    upperDisplay.innerText = '';
    sumDisplay.innerText = '';
    negActive = false;
    buttons.forEach(button => {
        button.disabled = false;
    })
}

let operator;
let prevOperator;
let displayValue;
let firstValue;
let secondValue;
let sum;

const upperDisplay = document.getElementById('upper-display');
const sumDisplay = document.getElementById('sum-display');
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.disable');
const numberButtons = document.querySelectorAll('.num');
const decimalPoint = document.getElementById('decimal');
const math = document.querySelectorAll('.math');
const addition = document.getElementById('addition');
const subtraction = document.getElementById('subtraction');
const multiplication = document.getElementById('multiplication');
const division = document.getElementById('division');
const percentage = document.getElementById('percent');
const clear = document.getElementById('clear');
const clearEntry = document.getElementById('clear-entry');
const equals = document.getElementById('equals');
const negativeToggle = document.getElementById('negative-toggle');

addition.onclick = () => operator = '+';
subtraction.onclick = () => operator = '-';
multiplication.onclick = () => operator = '*';
division.onclick = () => operator = '/';
clear.onclick = () => clears();
clearEntry.onclick = () => {
    display.innerText = '';
    negActive = false;
};
percentage.onclick = () => {
    if (display.innerText === '') {
        console.log('percent return');
        return;
    } else if (firstValue !== undefined && secondValue === undefined) {
        let b = display.innerText;
        console.log('percent else if outer');
        if (prevOperator === '*' || prevOperator === '/') {
            display.innerHTML = display.innerText / 100;
            displayValue = display.innerText;
            console.log('percent top');
        } else {
        let percentResult = percent(firstValue, b);
        display.innerText = percentResult;
        displayValue = display.innerText;
        console.log('percent bottom');
        }
    } else if (sum !== undefined && secondValue !== undefined) {
        let b = display.innerText;
        console.log('percent else if outer');
        if (operator === '*' || operator === '/') {
            display.innerHTML = display.innerText / 100;
            displayValue = display.innerText;
            console.log('percent bottom top');
        } else {
        let percentResult = percent(sum, b);
        display.innerText = percentResult;
        displayValue = display.innerText;
        console.log('percent bottom bottom');
        }
    }
}

numberButtons.forEach(numberButton => {
    numberButton.addEventListener('click', function (e) {
        const removeEqual = upperDisplay.innerText.replace(/[^=]/g, '');
        if (removeEqual[0] !== '=') {
            display.innerText += numberButton.innerText;
            displayValue = display.innerText;
            console.log('num if');
        } else {
            display.innerText += numberButton.innerText;
            displayValue = display.innerText;
            operator = undefined;
            prevOperator = undefined;
            prevButton = undefined;
            firstValue = undefined;
            secondValue = undefined;
            sum = undefined;
            upperDisplay.innerText = '';
            sumDisplay.innerText = '';
            console.log('num else');
        }
    })
});

let negActive = false;

negativeToggle.addEventListener('click', function(e) {
    if (display.innerText === '') {
        return;
    } else if (display.innerText[0] !== '-') {
    display.innerText = '-' + display.innerText;
    displayValue = display.innerText;
    negActive = true;
    } else {
        let negStr = display.innerText;
        negStr = negStr.substring(1);
        display.innerText = negStr;
        displayValue = negStr;
        console.log('removing the negative');
        console.log(negStr);
        negActive = false;
    }
})

decimalPoint.addEventListener('click', function (e) {
    const hasDecimal = display.innerText.replace(/[^.]/g, '');
    const removeEqual = upperDisplay.innerText.replace(/[^=]/g, '');
    if (hasDecimal[0] !== '.' && removeEqual[0] !== '=') {
        if (display.innerText === '') {
            display.innerText = 0 + decimalPoint.innerText;
            displayValue = display.innerText;
            console.log('you are in the top');
        } else {
            display.innerText += decimalPoint.innerText;
            displayValue = display.innerText;
            console.log('you are in the middle');
        }
    } else if (hasDecimal[0] !== '.' && removeEqual[0] === '=') {
        display.innerText = 0 + decimalPoint.innerText;
        displayValue = display.innerText;
        operator = undefined;
        prevOperator = undefined;
        prevButton = undefined;
        firstValue = undefined;
        secondValue = undefined;
        sum = undefined;
        upperDisplay.innerText = '';
        sumDisplay.innerText = '';
        console.log('you are in the bottom');
    } else {
        return;
    }
})

let prevButton;

math.forEach(operatorButton => {
    operatorButton.addEventListener('click', function (e) {
        if (prevButton === undefined) {
            console.log('if');
            if (display.innerText === '') {
                console.log('if return');
                return;
            } else {
                console.log('if - display not empty and prev button not defined')
                prevButton = e.target;
                firstValue = displayValue;
                upperDisplay.innerText += displayValue + ' ' + e.target.innerText;
                display.innerText = '';
                e.target.style.backgroundColor = 'pink';
            }

        } else if (e.target === prevButton) {
            if (display.innerText === '') {
                console.log(' prev operator the same and display empty');
                e.target.style.backgroundColor = "pink";
                upperDisplay.innerText = upperDisplay.innerText.slice(0, -1) + ' ' + e.target.innerText;
                if (sum === undefined) {
                    return;
                } else {
                    sumDisplay.innerText = sum;
                }
                return;
            } else {
                console.log('else if - current operator not changed');
                secondValue = displayValue;
                upperDisplay.innerText += ' ' + displayValue + ' ' + e.target.innerText;
                display.innerText = '';
            }



        } else {
            console.log('else');
            if (display.innerText === '') {
                console.log('else - when display empty');
                prevButton.style.backgroundColor = "rgb(202, 130, 47)";
                prevButton = e.target;
                e.target.style.backgroundColor = "pink";
                upperDisplay.innerText = upperDisplay.innerText.slice(0, -1) + ' ' + e.target.innerText;
                if (sum === undefined) {
                    return;
                } else {
                    sumDisplay.innerText = sum;
                }
                return;
            } else {
                console.log('else - when display NOT empty');
                secondValue = displayValue;
                prevButton.style.backgroundColor = "rgb(202, 130, 47)";
                prevButton = e.target;
                e.target.style.backgroundColor = "pink";
                upperDisplay.innerText += ' ' + displayValue + ' ' + e.target.innerText;
                display.innerText = '';
            }
        }
        const runningCalc = upperDisplay.innerText.replace(/[^+-/\*]/g, '').replace(/[.]/g, '');
        const removeEqual = upperDisplay.innerText.replace(/[^=]/g, '');
        console.log(runningCalc);
        if (runningCalc.length === 1 && negActive === false) {
            console.log('1st running calc return - neg false');
            prevOperator = runningCalc[runningCalc.length - 1];
            return;
        } else if (runningCalc.length === 2 && negActive === true) {
            console.log('2nd running calc return - Neg true');
            prevOperator = runningCalc[runningCalc.length - 1];
            negActive = false;
            return;
        }else {
            if (sum === undefined) {
                console.log('Additional running calc return - sum undefined');
                if (secondValue && secondValue[0] === '-') {
                    prevOperator = runningCalc[runningCalc.length - 3];
                    negActive = false;
                } else {
                    prevOperator = runningCalc[runningCalc.length - 2];
                }
                sum = operate(prevOperator, firstValue, secondValue);
                sumDisplay.innerText = sum;
            } else {
                console.log('Additional running calc sum defined');
                if (secondValue[0] === '-') {
                    prevOperator = runningCalc[runningCalc.length - 3];
                    negActive = false;
                } else {
                    prevOperator = runningCalc[runningCalc.length - 2];
                }
                sum = operate(prevOperator, sum, secondValue);
                sumDisplay.innerText = sum;
            }
        }
    })
});

equals.addEventListener('click', function (e) {
    if (upperDisplay.innerText === '') {
        return;
    }
    prevButton.style.backgroundColor = "rgb(202, 130, 47)";
    const removeEqual = upperDisplay.innerText.replace(/[^=]/g, '');
    if (removeEqual[0] !== '=') {
        if (display.innerText === '') {
            console.log('here');
            if (sum === undefined) {
                sumDisplay.innerText = firstValue;
            } else {
                sumDisplay.innerText = sum;
            }
            upperDisplay.innerText = upperDisplay.innerText.slice(0, upperDisplay.innerText.length - 1) + '=';
        } else {
            console.log('now here');
            if (sum === undefined) {
                console.log('now here 1');
                secondValue = displayValue;
                sumDisplay.innerText = operate(operator, firstValue, secondValue);
                sum = sumDisplay.innerText;
                upperDisplay.innerText = upperDisplay.innerText.slice(0, upperDisplay.innerText.length - 1) + operator;
                upperDisplay.innerText = upperDisplay.innerText + ' ' + secondValue + ' ' + '=';
                display.innerText = '';
            } else {
                console.log('now here 2');
                secondValue = displayValue;
                sumDisplay.innerText = operate(operator, sum, secondValue);
                sum = sumDisplay.innerText;
                upperDisplay.innerText = upperDisplay.innerText.slice(0, upperDisplay.innerText.length - 1) + operator;
                upperDisplay.innerText = upperDisplay.innerText + ' ' + secondValue + ' ' + '=';
                display.innerText = '';
            }
        }
    } else {
        return;
    }
})


