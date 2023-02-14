import './App.css';

// import './styles/fonts.css';
import './fonts/Epyval.ttf';
import './styles/calculator.css';
import './styles/colorBackground.css';
import './styles/inputField.css';
import './styles/screen.css';
import './styles/header.css';
import './styles/footer.css';
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
				<header>
					<p className="description">
						From Boring to Beautiful: The Calculator Redesigned for Style and
						Function
					</p>
				</header>
				<h1>
					<svg
						id="heading-svg"
						viewBox="0 0 500 500"
					>
						<path
							className="heading-path"
							id="curve"
							d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97"
						/>
						<text
							id="heading-text"
							width="500"
						>
							<textPath
								id="heading-textPath"
								alignmentBaseline="top"
								textAnchor="middle"
								startOffset="50%"
								xlinkHref="#curve"
							>
								Fancy Calculator
							</textPath>
						</text>
					</svg>
				</h1>
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
								className="spanTwo button-finish"
							>
								AC
							</button>
							<div />

							<button
								className="button-operator"
								onClick={() => applyOpeator('/')}
							>
								÷
							</button>
							<div />
							<button
								className="button-operator"
								onClick={() => applyOpeator('*')}
							>
								x
							</button>
							<div />
							<div />
							<div />
							<div />
							<div />
							<div />
							<div />
							<button
								className="button-digit"
								onClick={() => concatDigit('7')}
							>
								7
							</button>
							<div />
							<button
								className="button-digit"
								onClick={() => concatDigit('8')}
							>
								8
							</button>
							<div />
							<button
								className="button-digit"
								onClick={() => concatDigit('9')}
							>
								9
							</button>
							<div />
							<button
								className="button-operator"
								onClick={() => applyOpeator('-')}
							>
								-
							</button>
							<div />
							<div />
							<div />
							<div />
							<div />
							<div />
							<div />
							<button
								className="button-digit"
								onClick={() => concatDigit('4')}
							>
								4
							</button>
							<div />
							<button
								className="button-digit"
								onClick={() => concatDigit('5')}
							>
								5
							</button>
							<div />
							<button
								className="button-digit"
								onClick={() => concatDigit('6')}
							>
								6
							</button>
							<div />
							<button
								className="button-operator"
								onClick={() => applyOpeator('+')}
							>
								+
							</button>
							<div />
							<div />
							<div />
							<div />
							<div />
							<div />
							<div />
							<button
								className="button-digit"
								onClick={() => concatDigit('1')}
							>
								1
							</button>
							<div />
							<button
								className="button-digit"
								onClick={() => concatDigit('2')}
							>
								2
							</button>
							<div />
							<button
								className="button-digit"
								onClick={() => concatDigit('3')}
							>
								3
							</button>
							<div />
							<button
								onClick={equals}
								className="spanTwoUp button-finish"
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
								className="button-digit spanTwo"
							>
								0
							</button>
							<div />
							<button
								className="button-digit"
								onClick={decimalPoint}
							>
								.
							</button>
							<div />
						</div>
					</div>
				</div>
				<footer>
					<div className="footer-content">
						<p>Built by Alexander Braatz.</p>
						<p>
							Finalised <time dateTime="2023-02-10">February 2, 2023</time>
						</p>
						<p>
							View my projects
							<a
								href="https://alexanderbraatz.github.io/PortfolioPage/"
								target="_blank"
							>
								Here
							</a>
							.
						</p>
					</div>
				</footer>
			</div>
		</React.Fragment>
	);
}

export default App;
