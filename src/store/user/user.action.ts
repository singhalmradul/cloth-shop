import {
	Action,
	ActionWithPayload,
	createAction,
	withMatcher,
} from '../../utils/reducer/reducer.utils';
import {
	AdditionalDetails,
	UserData,
} from '../../utils/firebase/firebase.utils';

import { USER_ACTION_TYPES } from './user.types';
import { User } from 'firebase/auth';

export type SetCurrentUser = ActionWithPayload<
	USER_ACTION_TYPES.SET_CURRENT_USER,
	UserData
>;

export type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>;

export type GoogleSignInStart = Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>;

export type EmailSignInStart = ActionWithPayload<
	USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
	{ email: string; password: string }
>;

export type SignInSuccess = ActionWithPayload<
	USER_ACTION_TYPES.SIGN_IN_SUCCESS,
	UserData
>;

export type SignInFailure = ActionWithPayload<
	USER_ACTION_TYPES.SIGN_IN_FAILURE,
	Error
>;

export type SignOutStart = Action<USER_ACTION_TYPES.SIGN_OUT_START>;

export type SignOutSuccess = ActionWithPayload<
	USER_ACTION_TYPES.SIGN_OUT_SUCCESS,
	null
>;

export type SignOutFailure = ActionWithPayload<
	USER_ACTION_TYPES.SIGN_OUT_FAILURE,
	Error
>;

export type SignUpStart = ActionWithPayload<
	USER_ACTION_TYPES.SIGN_UP_START,
	{ email: string; password: string; displayName: string }
>;

export type SignUpSuccess = ActionWithPayload<
	USER_ACTION_TYPES.SIGN_UP_SUCCESS,
	{ user: User; additionalDetails: AdditionalDetails }
>;

export type SignUpFailure = ActionWithPayload<
	USER_ACTION_TYPES.SIGN_UP_FAILURE,
	Error
>;

export const setCurrentUser = withMatcher(
	(user: UserData): SetCurrentUser =>
		createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)
);

export const checkUserSession = withMatcher(
	(): CheckUserSession => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION)
);

export const googleSignInStart = withMatcher(
	(): GoogleSignInStart => createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START)
);

export const emailSignInStart = withMatcher(
	(email: string, password: string): EmailSignInStart =>
		createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password })
);

export const signInSuccess = withMatcher(
	(user: UserData & { id: string; }): SignInSuccess =>
		createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user)
);

export const signInFailure = withMatcher(
	(error: Error): SignInFailure =>
		createAction(USER_ACTION_TYPES.SIGN_IN_FAILURE, error)
);

export const signOutStart = withMatcher(
	(): SignOutStart => createAction(USER_ACTION_TYPES.SIGN_OUT_START)
);

export const signOutSuccess = withMatcher(
	(): SignOutSuccess =>
		createAction(USER_ACTION_TYPES.END_SESSION_SUCCESS, null)
);

export const signOutFailure = withMatcher(
	(error: Error): SignOutFailure =>
		createAction(USER_ACTION_TYPES.SIGN_OUT_FAILURE, error)
);

export const signUpStart = withMatcher(
	(email: string, password: string, displayName: string): SignUpStart =>
		createAction(USER_ACTION_TYPES.SIGN_UP_START, {
			email,
			password,
			displayName,
		})
);

export const signUpSuccess = withMatcher(
	(user: User, additionalDetails: AdditionalDetails): SignUpSuccess =>
		createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, { user, additionalDetails })
);

export const signUpFailure = withMatcher(
	(error: Error): SignUpFailure =>
		createAction(USER_ACTION_TYPES.SIGN_UP_FAILURE, error)
);
