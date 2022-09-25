const add = (a, b) => (+a) + (+b);
const subtract = (a, b) => (+a) - (+b);
const multiply = (a, b) => (+a) * (+b);
const divide = (a, b) => (+a) / (+b);

function checkIfValidNumbers(...chars) {
	for (let char of chars) {
		if (!['number', 'string'].includes(typeof char) || 
			((char != 0) && !+char) || 
			(char === '')) {
				return false;
		}
	}
	return true;
}

const operate = (operator, a, b) => {
	try {
		if (!checkIfValidNumbers(a, b)) {
			throw new Error('Invalid operation');
		}
		switch (operator) {
			case '+': return add(a, b);
			case '-': return subtract(a, b);
			case '*': return multiply(a, b);
			case '/': return divide(a, b);
			default	: throw new Error('Invalid operation');
		}
	} catch (e) {
		console.error(`${e.name}: ${e.message}`);
	}
}

const calculateResult = () => {
	try {
		while(operatorQueue.length) {
			numberQueue.unshift(
				operate(operatorQueue.shift(), numberQueue.shift(), numberQueue.shift())
			);
		}
		return numberQueue.pop();
	} catch (e) {
		console.error('Error while calculating result');
	}
}

const hasSuccessiveOperators = (string) => (/[\+\-\*\/]{2}/).test(string);

const handleEnteredOperator = (enteredOperator) => {
	switch (enteredOperator) {
		case '+':
		case '-':
		case '*':
		case '/':
			// expression cannot start with operators
			if (currentExpr.textContent?.length === 0 && !currentExpr.textContent) break;
			// prevent entry of successive operators
			if (hasSuccessiveOperators(currentExpr.textContent?.slice?.(-1) + enteredOperator)) {
				currentExpr.textContent = currentExpr.textContent?.slice?.(0, -1);
				operatorQueue.pop();
			} else if (!currentNum.endsWith('.')) {
				formerExpr.textContent = '';
				currentExpr.textContent += enteredOperator;
				numberQueue.push(currentNum);
				operatorQueue.push(enteredOperator);
				currentNum = '';
			}
			break;
		case 'c':
		case 'C':
			currentExpr.textContent = '';
			formerExpr.textContent = '';
			currentNum = '';
			numberQueue = [];
			operatorQueue = [];
			break;
		case 'Backspace':
		case '⌫':
			if ((/[\+\-\*\/]/).test(currentExpr.textContent?.slice?.(-1))) {
				operatorQueue.pop();
				currentNum = numberQueue.pop();
			} else {
				currentNum = currentNum?.slice?.(0, -1);
			}
			formerExpr.textContent = '';
			currentExpr.textContent = currentExpr.textContent?.slice?.(0, -1);
			break;
		case '=':
			if (currentNum && operatorQueue.length) {
				numberQueue.push(currentNum);
			}
			if ((/[\+\-\*\/]/).test(currentExpr.textContent?.slice?.(-1))) {
				if (numberQueue.length === 1) {
					currentNum = numberQueue.pop();
				}
				operatorQueue.pop();
				currentExpr.textContent = currentExpr.textContent?.slice?.(0, -1);
			}
			if (numberQueue.length && operatorQueue.length) {
				formerExpr.textContent = currentExpr.textContent + ' =';
				currentExpr.textContent = calculateResult();
				currentNum = currentExpr.textContent;
			}
			break;
		default	:
			break;
	}
}

const handleKeypress = (pressedKey) => {
	if ((/[\+\-\*\/\=]|c|C|Backspace/).test(pressedKey)) {
		handleEnteredOperator(pressedKey);
	} else if ((/[0-9]/).test(pressedKey)) {
		formerExpr.textContent = '';
		currentExpr.textContent += pressedKey;
		currentNum += pressedKey;
	} else if (pressedKey === '.') {
		handleDecimalPoint();
	}
}

const handleDecimalPoint = () => {
	if (!currentNum) {
		currentNum = '0.';
		currentExpr.textContent += currentNum;
	} else if (!currentNum.includes('.')) {
		currentNum += '.';
		currentExpr.textContent += '.';
	}
}

let numberQueue = [];
let operatorQueue = [];
let currentNum = '';

const calcDigits = document.getElementById('calc-digits');
const calcOperators = document.getElementById('calc-operators');
const formerExpr = document.getElementById('former-expr');
const currentExpr = document.getElementById('current-expr');

calcDigits.addEventListener('click', (e) => {
	if (e.target.textContent === '.') {
		handleDecimalPoint();
	} else {
		currentExpr.textContent += e.target.textContent;
		currentNum += e.target.textContent;
	}
});

calcOperators.addEventListener('click', (e) => {
	handleEnteredOperator(e.target.textContent);
});

window.addEventListener('keydown', (e) => {
	handleKeypress(e.key);
});

window.onload = () => {
	currentExpr.textContent = '';
	formerExpr.textContent = '';
}
