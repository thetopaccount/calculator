const add = (a, b) => {
	if (!checkIfValidNumbers(a, b)) {
		throw new Error('Invalid number(s)');
	}
	return (+a) + (+b);
}

const subtract = (a, b) => {
	if (!checkIfValidNumbers(a, b)) {
		throw new Error('Invalid number(s)');
	}
	return (+a) - (+b);
}

const multiply = (a, b) => {
	if (!checkIfValidNumbers(a, b)) {
		throw new Error('Invalid number(s)');
	}
	return (+a) * (+b);
}

const divide = (a, b) => {
	if (!checkIfValidNumbers(a, b)) {
		throw new Error('Invalid number(s)');
	}
	return (+a) / (+b);
}

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
