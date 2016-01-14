import { createAction, handleActions } from 'redux-actions';
import { pushPath } from 'redux-simple-router';
import { API } from '../middleware/api';
import { actions as notify } from './notification';

// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const STORE_USER = 'STORE_USER';

const initialState = {
  isFetching: false,
  isAuthenticated: false,
  user: {},
  token: ''
};

// ------------------------------------
// Actions
// ------------------------------------
export const requestLogin = createAction(LOGIN_REQUEST, (payload) => payload);
export const receiveLogin = createAction(LOGIN_SUCCESS, (payload) => payload);
export const invalidLogin = createAction(LOGIN_FAILURE, (payload) => payload);
export const doLogout = createAction(LOGOUT, (payload) => payload);

export const logout = () => {
  return (dispatch, getState) => {
    _removeToken();
    dispatch(doLogout());
    dispatch(pushPath('/auth/login'));
  };
};

export const setUser = () => {
  return (dispatch, getState) => {
    var token = _getToken();
    var user = JSON.parse(_decodeToken(token));
    dispatch(receiveLogin({ user, token }));
  };
};

export const isAuthenticated = () => {
  return !!_getToken();
};

const _getToken = () => {
  return localStorage.getItem('token');
};

const _decodeToken = (token) => {
  return window.atob(token.split('.')[1]);
};

const _storeToken = (token) => {
  localStorage.token = token;
};

const _removeToken = () => {
  localStorage.removeItem('token');
};

export const login = (identity, password) => {
  return (dispatch, getState) => {
    dispatch(requestLogin({ identity, password }));

    API.post('/auth/login', {
      identity,
      password
    }).then((res) => {
      const token = res.token;
      const user = res.user;

      _storeToken(token);
      dispatch(receiveLogin({ user, token }));
      dispatch(pushPath('/'));
    })
    .catch((err) => {
      dispatch(invalidLogin(err));
      dispatch(notify.emit({
        type: 'danger',
        title: 'Invalid Credentials',
        message: err.msg
      }));
    });
  };
};

export const actions = {
  login,
  isAuthenticated,
  setUser,
  logout
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [LOGOUT]: (state, { payload }) => {
    return {
      ...state,
      ...initialState
    };
  },
  [LOGIN_REQUEST]: (state, { payload }) => {
    return {
      ...state,
      isFetching: true,
      isAuthenticated: false
    };
  },
  [LOGIN_SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      isFetching: false,
      isAuthenticated: true,
      token: payload.token,
      user: payload.user
    };
  },
  [LOGIN_FAILURE]: (state, { payload }) => {
    return {
      ...state,
      isFetching: false,
      isAuthenticated: false,
      message: payload
    };
  }
}, initialState);
