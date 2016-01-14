import { createAction, handleActions } from 'redux-actions';

// ------------------------------------
// Constants
// ------------------------------------
export const NOTIFICATION_EMIT = 'NOTIFICATION_EMIT';
export const NOTIFICATION_DISMISS = 'NOTIFICATION_DISMISS';

const initialState = [];

// ------------------------------------
// Actions
// ------------------------------------
export const emitNotification = createAction(NOTIFICATION_EMIT, (payload) => payload);
export const dismissNotification = createAction(NOTIFICATION_DISMISS, (payload) => payload);

export const emit = (notification) => {
  return (dispatch, getState) => {
    dispatch(emitNotification(notification));
  };
};

export const dismiss = (index) => {
  return (dispatch, getState) => {
    dispatch(dismissNotification(index));
  };
};

export const actions = {
  emit,
  dismiss
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [NOTIFICATION_EMIT]: (state, { payload }) => {
    return state.concat([payload]);
  },
  [NOTIFICATION_DISMISS]: (state, { payload }) => {
    console.log(payload);
    const newState = state.slice(0, payload).concat(state.slice(payload + 1));
    console.log(newState);
    return newState;
  }
}, initialState);
