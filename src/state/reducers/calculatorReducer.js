/*
1. allow -- to be typed 
and used - by downloading mathjs and using evaluate
2. remove js floating point error with library 
3. consider refactoring with array instead of thirdLast etc.
*/
import {
	PRESS_DIGIT,
	PRESS_OPERATOR,
	EQUALS,
	CLEAR_CALCULATOR,
	DECIMAL_POINT
} from '../action-creators/actions';

const math = require('mathjs');

const initialState = {
	calculation: [],
	rest: '',
	thirdLatest: '',
	secondLatest: '',
	latest: '',

	display: '0',
	hasSolved: false
};

const reducer = (state = initialState, action) => {
	console.log(state.calculation);
	switch (action.type) {
		case PRESS_DIGIT:
			return concatDigit(state, action);
		case PRESS_OPERATOR:
			return applyOpeator(state, action);
		case DECIMAL_POINT:
			return decimalPoint(state, action);
		case EQUALS:
			return equals(state, action);
		case CLEAR_CALCULATOR:
			return initialState;
		default:
			return state;
	}
};

function concatDigit(state, action) {
	const {
		calculation,
		latest,
		secondLatest,
		thirdLatest,
		rest,
		hasSolved,
		display
	} = state;

	if (hasSolved) {
		// start with a digit
		return {
			...initialState,
			calculation: [action.payload],
			latest: action.payload,
			display: action.payload
		};
	} else if (/^0+$/.test(display)) {
		//prevent leading zeros by replacing it with the digit
		return {
			...state,
			calculation: [action.payload],
			latest: action.payload,
			display: action.payload
		};
	} else if (/^[0-9.]+$/.test(display)) {
		// if latest was a digit concat the next digit
		return {
			...state,
			calculation: [...calculation, action.payload],
			rest: rest + thirdLatest,
			thirdLatest: secondLatest,
			secondLatest: latest,
			latest: action.payload,
			display: display + action.payload
		};
	} else if (/^[+*/-]+$/.test(display)) {
		//if latest was an operator , display the digit
		return {
			...state,
			calculation: [...calculation, action.payload],
			rest: rest + thirdLatest,
			thirdLatest: secondLatest,
			secondLatest: latest,
			latest: action.payload,
			display: action.payload
		};
	}
}

function applyOpeator(state, action) {
	const {
		calculation,
		latest,
		secondLatest,
		thirdLatest,
		rest,
		hasSolved,
		display
	} = state;

	if (hasSolved) {
		// exclude = ?
		// start next calculation with the result from the last one
		return {
			...initialState,
			calculation: [display, action.payload],
			secondLatest: display,
			latest: action.payload,
			display: action.payload
		};
	} else if (action.payload === '-') {
		if (/^-$/.test(latest)) {
			return {
				...state
			};
		} else {
			// if - was clicked and the latest is not a -  concat it to the latest operator
			return {
				...state,
				calculation: [...calculation, action.payload],
				rest: rest + thirdLatest,
				thirdLatest: secondLatest,
				secondLatest: latest,
				latest: action.payload,
				display: action.payload
			};
			//add a negative sign if the last character was a operator
			//	} else if (/^[+/*-]-$/.test([...calculation].pop()) && action.payload === '-') { // i think this will work in creating anw array and returning the last value
		}
	} else if (/-/.test(latest)) {
		//	} else if (/[+/*-]+/.test([...calculation].pop())) {
		//if latest is a operator -> replace it
		if (/[+*/-]/.test(secondLatest)) {
			return {
				...state,
				secondLatest: '',
				latest: action.payload,
				calculation: [...[...calculation].slice(0, -2), action.payload],
				display: action.payload
			};
		} else {
			return {
				...state,
				latest: action.payload,
				calculation: [...[...calculation].slice(0, -1), action.payload],
				display: action.payload
			};
		}
	} else if (/[+*/]/.test(latest)) {
		return {
			...state,
			latest: action.payload,
			calculation: [...[...calculation].slice(0, -1), action.payload],
			display: action.payload
		};
	} else {
		// else just concatonate it
		return {
			...state,
			calculation: [...calculation, action.payload],
			rest: rest + thirdLatest,
			thirdLatest: secondLatest,
			secondLatest: latest,
			latest: action.payload,
			display: action.payload
		};
	}
}

function decimalPoint(state, action) {
	const {
		calculation,
		latest,
		secondLatest,
		thirdLatest,
		rest,
		hasSolved,
		display
	} = state;

	if (hasSolved) {
		// start with a 0.
		return {
			...initialState,
			calculation: ['0', '.'],
			secondLatest: '0',
			latest: '.', // would work just the same if the 0 goes in second latest right?
			display: '0.'
		};
	} else if (/\./.test(display)) {
		//dont alowe ".."
		return {
			...state
		};
	} else if (/[0-9]/.test(latest)) {
		//add a dot if it follows a digit
		let newDisplay = rest + thirdLatest + secondLatest + latest;
		newDisplay = newDisplay.match(/[0-9.]+$/)[0]; //display has to be number
		return {
			...state,
			calculation: [...calculation, '.'],
			rest: rest + thirdLatest,
			thirdLatest: secondLatest,
			secondLatest: latest,
			latest: '.',
			display: newDisplay + '.'
		};
	} else {
		return {
			...state,
			calculation: [...calculation, '0', '.'],
			rest: rest + thirdLatest + secondLatest,
			thirdLatest: latest,
			secondLatest: '0',
			latest: '.',
			display: '0.'
		};
	}
}

function equals(state, action) {
	const {
		calculation,
		latest,
		secondLatest,
		thirdLatest,
		rest,
		hasSolved,
		display
	} = state;

	if (hasSolved) {
		return state;
	} else {
		let newLatest = latest.replace(/[+/*-]/, ''); //the need for toString() here might mesan that there is uncontroled typeconversion going on
		let wholeEquation = rest + thirdLatest + secondLatest + newLatest;
		let newDisplay = /^[0-9+/*.-]+$/.test(wholeEquation)
			? math.evaluate(wholeEquation).toString()
			: 'Error';

		return {
			...state,
			rest: '',
			thirdLatest: wholeEquation,
			secondLatest: '=',
			latest: newDisplay,
			display: newDisplay,
			hasSolved: true
		};
	}
}

export default reducer;
