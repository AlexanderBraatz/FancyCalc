import { createStore } from 'redux';
import reducers from './reducers/index';

// export const store = createStore(
//     reducers,
//     {}
// )

export const store = createStore(
	reducers /* preloadedState, */,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
