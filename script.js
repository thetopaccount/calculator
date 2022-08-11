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
		if (!checkIfValidNumbers(a, b) || !(/[\+\-\*\/]/).test(operator)) {
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
		// throw new Error('Error while calculating result');
		return 'Logic WIP';
	} catch (e) {
		console.error(`${e.name}: ${e.message}`);
	}
}

let numberStack = [];
let operatorStack = [];
let currentNum = '';

const calcDigits = document.getElementById('calc-digits');
const calcScreen = document.getElementById('calc-screen');
const calcOperators = document.getElementById('calc-operators');

calcDigits.addEventListener('click', (e) => {
	calcScreen.value += e.target.textContent;
	currentNum += e.target.textContent;
});

calcOperators.addEventListener('click', (e) => {
	handleEnteredOperator(e.target.textContent);
});

const handleEnteredOperator = (enteredOperator) => {
	switch (enteredOperator) {
		case '+':
		case '-':
		case '*':
		case '/':
			// expression cannot start with operators
			if (calcScreen.value?.length === 0 && !calcScreen.value) break;
			// prevent entry of successive operators
			if (hasSuccessiveOperators(calcScreen.value?.slice?.(-1) + enteredOperator)) {
				calcScreen.value = calcScreen.value?.slice?.(0, -1);
				operatorStack.pop();
			} else {
				numberStack.push(currentNum);
			}
			calcScreen.value += enteredOperator;
			operatorStack.push(enteredOperator);
			currentNum = '';
			break;
		case 'C':
			calcScreen.value = '';
			resetCalcOperations();
			break;
		case '⌫':
			if ((/[\+\-\*\/]/).test(calcScreen.value?.slice?.(-1))) {
				operatorStack.pop();
				currentNum = numberStack.pop();
			} else {
				currentNum = currentNum?.slice?.(0, -1);
			}
			calcScreen.value = calcScreen.value?.slice?.(0, -1);
			break;
		case '=':
			if (currentNum) {
				numberStack.push(currentNum);
			}
			calcScreen.value = calculateResult();
			resetCalcOperations();
			break;
		default	:
			break;
	}
}

const resetCalcOperations = () => {
	currentNum = '';
	numberStack = [];
	operatorStack = [];
}

const hasSuccessiveOperators = (string) => (/[\+\-\*\/]{2}/).test(string);

window.onload = () => {
	calcScreen.value = '';
}
