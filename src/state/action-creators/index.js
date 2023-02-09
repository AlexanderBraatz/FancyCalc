import {
	PRESS_DIGIT,
	PRESS_OPERATOR,
	EQUALS,
	CLEAR_CALCULATOR,
	DECIMAL_POINT,
	UPDATE_MOUSE_POSITION
} from './actions';

export const concatDigit = digit => {
	return {
		type: PRESS_DIGIT,
		payload: digit
	};
};

export const applyOpeator = operator => {
	return {
		type: PRESS_OPERATOR,
		payload: operator
	};
};
export const equals = () => {
	return {
		type: EQUALS
	};
};

export const clearCalculator = () => {
	return {
		type: CLEAR_CALCULATOR
	};
};
export const decimalPoint = () => {
	return {
		type: DECIMAL_POINT
	};
};

//colorfull background - - -- - - - -- -.,

export const updateMousePosition = event => {
	// let rect = event.target.getBoundingClientRect();
	// let x = event.clientX - rect.left;
	// let y = event.clientY - rect.top;

	let x = event.clientX;
	let y = event.clientY;
	return {
		type: UPDATE_MOUSE_POSITION,
		payload: { x, y }
	};
};
