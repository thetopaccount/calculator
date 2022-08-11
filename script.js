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
		if (!checkIfValidNumbers(a, b) || !['+', '-', '*', '/'].includes(operator)) {
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
