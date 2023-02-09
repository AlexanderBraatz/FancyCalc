import './App.css';

// import './styles/fonts.css';
import './fonts/Epyval.ttf';
import './styles/calculator.css';
import './styles/colorBackground.css';
import './styles/inputField.css';
import './styles/screen.css';
import './styles/heading.css';
import './styles/variables.css';

import { useSelector, useDispatch } from 'react-redux'; //whats is shallow Eqaul for?
import { bindActionCreators } from 'redux';
import { actionCreators } from './state/index.js';
import { IS_SOLVED } from './state/reducers/calcStateMashineReducer.js';

import React, { useEffect, useRef } from 'react';

function App() {
	const { calculation, display, operationalState } = useSelector(
		state => state.calculator
	);
	const dispatch = useDispatch();

	const {
		concatDigit,
		clearCalculator,
		applyOpeator,
		decimalPoint,
		equals,
		updateMousePosition
	} = bindActionCreators(actionCreators, dispatch);

	const { x, y } = useSelector(state => state.mousePosition);
	const colorBack = useRef(null); //gets the DOM node with the ref=colorBack attribute
	useEffect(() => {
		colorBack.current.style.setProperty('--x', x + 'px'); //sets the --x variable to the mouse position in px every time the component is rendered
		colorBack.current.style.setProperty('--y', y + 'px');
	}, [x, y]);

	return (
		<React.Fragment>
			<div
				className="App"
				onMouseMove={event => updateMousePosition(event)}
			>
				<h1>thsi is my shitty cool calculator</h1>
				<div
					className="mouse-cursor-gradient-tracking"
					ref={colorBack}
				></div>
				<div id="calculator">
					<div id="screenOutside">
						<div
							id="screenInside"
							// {(operationalState === 'IS_RSET' )? style={ backgroundColor: 'transparent' }:styles={}}
							style={
								operationalState === IS_SOLVED
									? { backgroundColor: 'transparent', color: '#000' }
									: {}
							}
						>
							<div className="screenGlass">
								<span id="calculation">
									{calculation
										.map(char =>
											char === '*' ? '×' : char === '/' ? '÷' : char
										)
										.join('')}
								</span>
								<span id="display">
									{display
										.map(char =>
											char === '*' ? '×' : char === '/' ? '÷' : char
										)
										.join('')}
								</span>
							</div>
						</div>
					</div>
					<div id="interfaceOutside">
						<div id="interfaceInside">
							<button
								onClick={clearCalculator} // passing it as a callback event handler
								className="spanTwo"
							>
								AC
							</button>
							<div />

							<button onClick={() => applyOpeator('/')}>÷</button>
							<div />
							<button onClick={() => applyOpeator('*')}>x</button>
							<div />
							<div />
							<div />
							<div />
							<div />
							<div />
							<div />
							<button onClick={() => concatDigit('7')}>7</button>
							<div />
							<button onClick={() => concatDigit('8')}>8</button>
							<div />
							<button onClick={() => concatDigit('9')}>9</button>
							<div />
							<button onClick={() => applyOpeator('-')}>-</button>
							<div />
							<div />
							<div />
							<div />
							<div />
							<div />
							<div />
							<button onClick={() => concatDigit('4')}>4</button>
							<div />
							<button onClick={() => concatDigit('5')}>5</button>
							<div />
							<button onClick={() => concatDigit('6')}>6</button>
							<div />
							<button onClick={() => applyOpeator('+')}>+</button>
							<div />
							<div />
							<div />
							<div />
							<div />
							<div />
							<div />
							<button onClick={() => concatDigit('1')}>1</button>
							<div />
							<button onClick={() => concatDigit('2')}>2</button>
							<div />
							<button onClick={() => concatDigit('3')}>3</button>
							<div />
							<button
								onClick={equals}
								className="spanTwoUp"
							>
								=
							</button>
							<div />

							<div />
							<div />
							<div />
							<div />
							<div />
							<button
								onClick={() => concatDigit('0')}
								className="spanTwo"
							>
								0
							</button>
							<div />
							<button onClick={decimalPoint}>.</button>
							<div />
						</div>
					</div>
				</div>
				<p>Created by Alexander Braatz</p>
			</div>
		</React.Fragment>
	);
}

export default App;
