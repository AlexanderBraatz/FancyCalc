//after code hum i want to try and solve it using a finite state mashine
// i realised the hasSolved was already a state i was using

// and could they be reducers??

import {
	PRESS_DIGIT,
	PRESS_OPERATOR,
	EQUALS,
	CLEAR_CALCULATOR,
	DECIMAL_POINT
} from '../action-creators/actions';

//const math = require('mathjs'); not needed

//oporational states:
const IS_RESET = 'IS_RESET';
const IS_TYPING_NUMBER = 'IS_TYPING_NUMBER';
const STARTING_WITH_NEGATIVE = 'STARTING_WITH_NEGATIVE';
const FIRST_OPERATOR_SELECTION = 'FIRST_OPERATOR_SELECTION';
const SECOND_OPERATOR_SELECTION = 'SECOND_OPERATOR_SELECTION';
export const IS_SOLVED = 'IS_SOLVED';

const initialState = {
	calculation: ['0'],
	display: ['0'],
	operationalState: IS_RESET
};
// reducer logic -   -   -   -  -   -   -   -   -   -   -   -    -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case PRESS_DIGIT:
			return concatDigit(state, action); //digit was clicked
		case PRESS_OPERATOR:
			return applyOpeator(state, action); //operator was clicked +,-,*,/
		case DECIMAL_POINT:
			return decimalPoint(state, action); //decimal point was clicked
		case EQUALS:
			return equals(state, action); //euals sign was clicked
		case CLEAR_CALCULATOR:
			return initialState; // AC was clicked
		default:
			return state;
	}
};
// action logic -   -   -   -  -   -   -   -   -   -   -   -    -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -
function concatDigit(state, action) {
	switch (state.operationalState) {
		case IS_RESET:
			return moveToState(
				IS_TYPING_NUMBER,
				appendToken(removeToken(state), action.payload) // replace placeholder '0' with token
			);
		case STARTING_WITH_NEGATIVE:
		case SECOND_OPERATOR_SELECTION:
			return moveToState(IS_TYPING_NUMBER, appendToken(state, action.payload)); // add new token
		case IS_TYPING_NUMBER:
			if (state.display.every(token => token === '0')) {
				return appendToken(removeToken(state), action.payload); // replace '0' with token, to prevent chanin of leading zeros
			} else {
				return appendToken(state, action.payload); // add new token
			}
		case FIRST_OPERATOR_SELECTION:
			return moveToState(
				IS_TYPING_NUMBER,
				appendToken(clearDisplay(state), action.payload) // add new digit and let only it show in display
			);
		case IS_SOLVED:
			return moveToState(
				IS_TYPING_NUMBER,
				appendToken(removeToken(initialState), action.payload) //reset and replace placeholder '0' with token
			);
		default:
			return { ...state, display: 'switch error' }; //catch error during development
	}
}

function applyOpeator(state, action) {
	switch (state.operationalState) {
		case IS_RESET:
			if (action.payload === '-') {
				return moveToState(
					STARTING_WITH_NEGATIVE,
					appendToken(removeToken(state), action.payload) // replace 0 with '-'
				);
			} else {
				return state;
			}
		case STARTING_WITH_NEGATIVE: // ignore input
			return state;
		case IS_TYPING_NUMBER:
			return moveToState(
				FIRST_OPERATOR_SELECTION,
				appendToken(clearDisplay(state), action.payload) // add new operator and let only it show in display
			);
		case FIRST_OPERATOR_SELECTION:
			if (action.payload === '-') {
				return moveToState(
					SECOND_OPERATOR_SELECTION,
					appendToken(clearDisplay(state), action.payload) // add new '-' and let only it show in display
				);
			} else {
				return appendToken(removeToken(state), action.payload); // replace operator and let only it show in display
			}
		case SECOND_OPERATOR_SELECTION:
			if (action.payload === '-') {
				return state; // ignore '-'  input
			} else {
				return moveToState(
					FIRST_OPERATOR_SELECTION,
					appendToken(removeToken(removeToken(state)), action.payload) //replace operator and '-' with new operator and let only it show in display
				);
			}
		case IS_SOLVED:
			return moveToState(FIRST_OPERATOR_SELECTION, {
				...state,
				calculation: [...state.display, action.payload], //start next calculation with result of the last one and add new operator
				display: [action.payload]
			});
		default:
			return { ...state, display: 'switch error' }; //catch error during development
	}
}

function decimalPoint(state) {
	switch (state.operationalState) {
		case IS_RESET:
			return moveToState(IS_TYPING_NUMBER, appendToken(state, '.')); // add '.' to placholder '0'
		case STARTING_WITH_NEGATIVE:
		case SECOND_OPERATOR_SELECTION: //intentional followthrough
		case FIRST_OPERATOR_SELECTION: //intentional followthrough
			return moveToState(
				IS_TYPING_NUMBER,
				appendToken(appendToken(state, '0'), '.') //add '0' and then '.'
			);
		case IS_TYPING_NUMBER:
			if (state.display.includes('.')) {
				// if number thats beeing typed already includes a '.' ignore input
				return state;
			} else {
				return appendToken(state, '.'); // else add a '.'
			}
		case IS_SOLVED:
			return moveToState(IS_TYPING_NUMBER, appendToken(initialState, '.')); // reset and add '.' to placholder '0'
		default:
			return { ...state, display: 'switch error' }; //catch error during development
	}
}
function equals(state) {
	switch (state.operationalState) {
		case IS_RESET:
		case STARTING_WITH_NEGATIVE: //intentional followthrough
		case IS_SOLVED: //intentional followthrough
			return state; // ignore input
		case IS_TYPING_NUMBER:
			return moveToState(IS_SOLVED, showEquasion(state)); //show result and equasion
		case FIRST_OPERATOR_SELECTION:
			return moveToState(IS_SOLVED, showEquasion(removeToken(state))); //show result and equasion
		case SECOND_OPERATOR_SELECTION:
			return moveToState(
				IS_SOLVED,
				showEquasion(removeToken(removeToken(state))) //show result and equasion
			);
		default:
			return { ...state, display: 'switch error' }; //catch error during development
	}
}
// repeated function -   -   -   -  -   -   -   -   -   -   -   -    -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -
function appendToken(state, token) {
	return {
		...state,
		calculation: [...state.calculation, token],
		display: [...state.display, token]
	};
}
function removeToken(state) {
	return {
		...state,
		calculation: [...state.calculation].slice(0, -1),
		display: [...state.display].slice(0, -1)
	};
}
function clearDisplay(state) {
	return {
		...state,
		display: []
	};
}

function showEquasion(state) {
	let answer = String(eval([...state.calculation].join('')));
	return {
		...state,
		calculation: [...state.calculation, '=', answer],
		display: [answer]
	};
}

function moveToState(nextOperationalState, state) {
	return {
		...state,
		operationalState: nextOperationalState
	};
}
export default reducer;
