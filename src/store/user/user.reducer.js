import { USER_ACTION_TYPES } from './user.types';
const INITIAL_STATE = { currentUser: null, isLoading: false, error: null };
export const userReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;
	switch (type) {
		case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
		case USER_ACTION_TYPES.SIGN_OUT_START:
			return { ...state, currentUser: payload };
		case USER_ACTION_TYPES.SIGN_IN_FAILURE:
		case USER_ACTION_TYPES.SIGN_OUT_FAILURE:
		case USER_ACTION_TYPES.SIGN_UP_FAILURE:
			return { ...state, error: payload };
		default:
			return state;
	}
};
