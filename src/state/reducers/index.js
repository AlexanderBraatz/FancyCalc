import { combineReducers } from 'redux';
//import calculatorReducer from "./calculatorReducer";
import calcStateMashineReducer from './calcStateMashineReducer';
import { mousePositionReducer } from './mousePositionReducer';
const reducers = combineReducers({
	//calculator: calculatorReducer
	calculator: calcStateMashineReducer,
	mousePosition: mousePositionReducer
});

export default reducers;
