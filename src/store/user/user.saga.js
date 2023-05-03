import { USER_ACTION_TYPES } from './user.types';
import {
	SignUpFailure,
	signOutSuccess,
	signInFailure,
	signInSuccess,
	signUpSuccess,
	signOutFailure,
} from './user.action';

import {
	createUserDocumentWithAuth,
	getCurrentUser,
	signInAuthWithEmailAndPassword,
	signInWithGooglePopup,
	signOutUser,
	signUpUserUsingEmailAndPassword,
} from '../../utils/firebase/firebase.utils';

import { all, call, put, takeLatest } from 'redux-saga/effects';

export function* getSnapshotFromUserAuth(userAuth, ...additionalDetails) {
	try {
		const userSnapshot = yield call(
			createUserDocumentWithAuth,
			userAuth,
			additionalDetails
		);
		yield put(signInSuccess({ ...userSnapshot.data(), id: userSnapshot.id }));
	} catch (error) {
		put(signInFailure(error));
	}
}

export function* signInWithEmail({ payload: { email, password } }) {
	try {
		const { user } = yield call(
			signInAuthWithEmailAndPassword,
			email,
			password
		);
		yield call(getSnapshotFromUserAuth, user);
	} catch (error) {
		yield put(signInFailure(error));
	}
}

export function* isUserAuthenticated() {
	try {
		const userAuth = yield call(getCurrentUser);

		if (!userAuth) return;

		yield call(getSnapshotFromUserAuth, userAuth);
	} catch (error) {
		yield put(signInFailure(error));
	}
}

export function* signOut() {
	try {
		yield call(signOutUser);
		yield put(signOutSuccess());
	} catch (error) {
		yield put(signOutFailure(error));
	}
}

export function* signInWithGoogle() {
	try {
		const { user } = yield call(signInWithGooglePopup);
		yield call(getSnapshotFromUserAuth, user);
	} catch (error) {
		yield put(signInFailure(error));
	}
}
export function* signUpUser({ payload: { email, password, displayName } }) {
	try {
		const { user } = yield call(
			signUpUserUsingEmailAndPassword,
			email,
			password
		);
		yield put(signUpSuccess(user, { displayName }));
	} catch (error) {
		yield put(SignUpFailure(error));
	}
}

export function* signInAfterSignUp({ payload: { user, additionalDetails } }) {
	yield call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* onGoogleSignInStart() {
	yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
	yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
	yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
	yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
	yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUpUser);
}

export function* onSignUpSuccess() {
	yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* userSagas() {
	yield all([
		call(onCheckUserSession),
		call(onSignOutStart),
		call(onEmailSignInStart),
		call(onGoogleSignInStart),
		call(onSignUpStart),
		call(onSignUpSuccess),
	]);
}
