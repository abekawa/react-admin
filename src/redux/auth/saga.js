/* eslint-disable prettier/prettier */
import jwtDecode from 'jwt-decode';

import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { auth } from 'helpers/Firebase';
import { adminRoot, loginPath } from 'constants/defaultValues';
import { setCurrentUser } from 'helpers/Utils';
import { NotificationManager } from 'components/common/react-notifications';

import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
} from '../contants';

import {
  // loginUserSuccess,
  loginUserError,
  // registerUserSuccess,
  registerUserError,
  forgotPasswordSuccess,
  forgotPasswordError,
  resetPasswordSuccess,
  resetPasswordError,
} from './actions';

const axios = require('axios');

export function* watchLoginUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

// const loginWithEmailPasswordAsync = async (email, password) =>
//   // eslint-disable-next-line no-return-await
//   await auth
//     .signInWithEmailAndPassword(email, password)
//     .then((user) => user)
//     .catch((error) => error);

const loginWithEmailPasswordAsync = async (email, password) => {
  const resp = await axios
    .post('http://localhost:8000/api/login_check', {
      username: email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        return response;
      }
      return response;
    })
    .catch((error) => {
      return error;
    });
  return resp;
};

function* loginWithEmailPassword({ payload }) {
  const { email, password } = payload.user;
  const { history } = payload;
  try {
    const loginUser = yield call(loginWithEmailPasswordAsync, email, password);
    if (loginUser.data) {
      const decoded = jwtDecode(loginUser.data.token); // Returns with the JwtPayload type
      console.log(decoded);
      localStorage.setItem('username', decoded.username);
      history.push(adminRoot);
    } else {
      yield put(loginUserError('Usuário ou senha inválido(s)'));
    }

    // if (true) {
    //   const item = { uid: loginUser.user.uid, ...currentUser };
    //   setCurrentUser(item);
    //   yield put(loginUserSuccess(item));
    //   history.push(adminRoot);
    // } else {
    //   console.log(loginUser);
    //   // yield put(loginUserError(loginUser.message));
    // }
  } catch (error) {
    yield put(loginUserError(error));
  }
}

export function* watchRegisterUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(REGISTER_USER, registerWithEmailPassword);
}

const registerWithEmailPasswordAsync = async (email, password) => {
  console.log(email, password);
  const resp = await axios
    .post('http://localhost:8000/api/register', {
      username: email,
      password,
    })
    .then((response) => {
      if (response.data.status === 200) {
        return response;
      }
      return response;
    })
    .catch((error) => {
      return error;
    });
  console.log(resp);
  return resp;
};

function* registerWithEmailPassword({ payload }) {
  const { email, password } = payload.user;
  const { history } = payload;
  try {
    const registerUser = yield call(
      registerWithEmailPasswordAsync,
      email,
      password
    );
    console.log(registerUser);
    if (registerUser.status === 200) {
      const loginUser = yield call(loginWithEmailPasswordAsync, email, password);
      NotificationManager.error(
        'Verifique os dados informados',
        'Não foi possível realizar o cadastro',
        3000,
        null,
        null,
        ''
      );
      const decoded = jwtDecode(loginUser.data.token); // Returns with the JwtPayload type
      console.log(decoded);
      localStorage.setItem('username', decoded.username);
      history.push(adminRoot);
      // const item = { uid: registerUser.user.uid, ...currentUser };
      // setCurrentUser(item);
    } else {
      yield put(registerUserError(registerUser.message));
    }
  } catch (error) {
    yield put(registerUserError(error));
  }
}

export function* watchLogoutUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(LOGOUT_USER, logout);
}

const logoutAsync = async (history) => {
  // await auth
  //   .signOut()
  //   .then((user) => user)
  //   .catch((error) => error);
  localStorage.clear();

  history.push(loginPath);
};

function* logout({ payload }) {
  const { history } = payload;
  setCurrentUser();
  yield call(logoutAsync, history);
}

export function* watchForgotPassword() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(FORGOT_PASSWORD, forgotPassword);
}

const forgotPasswordAsync = async (email) => {
  // eslint-disable-next-line no-return-await
  return await auth
    .sendPasswordResetEmail(email)
    .then((user) => user)
    .catch((error) => error);
};

function* forgotPassword({ payload }) {
  const { email } = payload.forgotUserMail;
  try {
    const forgotPasswordStatus = yield call(forgotPasswordAsync, email);
    if (!forgotPasswordStatus) {
      yield put(forgotPasswordSuccess('success'));
    } else {
      yield put(forgotPasswordError(forgotPasswordStatus.message));
    }
  } catch (error) {
    yield put(forgotPasswordError(error));
  }
}

export function* watchResetPassword() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(RESET_PASSWORD, resetPassword);
}

const resetPasswordAsync = async (resetPasswordCode, newPassword) => {
  // eslint-disable-next-line no-return-await
  return await auth
    .confirmPasswordReset(resetPasswordCode, newPassword)
    .then((user) => user)
    .catch((error) => error);
};

function* resetPassword({ payload }) {
  const { newPassword, resetPasswordCode } = payload;
  try {
    const resetPasswordStatus = yield call(
      resetPasswordAsync,
      resetPasswordCode,
      newPassword
    );
    if (!resetPasswordStatus) {
      yield put(resetPasswordSuccess('success'));
    } else {
      yield put(resetPasswordError(resetPasswordStatus.message));
    }
  } catch (error) {
    yield put(resetPasswordError(error));
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchRegisterUser),
    fork(watchForgotPassword),
    fork(watchResetPassword),
  ]);
}
