import { UPDATE_MOUSE_POSITION } from '../action-creators/actions';

const initialState = { x: 0, y: 0 };

export function mousePositionReducer(state = initialState, action) {
	switch (action.type) {
		case UPDATE_MOUSE_POSITION:
			return { x: action.payload.x, y: action.payload.y };
		default:
			return state;
	}
}
