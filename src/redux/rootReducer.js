import { combineReducers } from 'redux';
import { routeReducer as router } from 'redux-simple-router';
import auth from './modules/auth';
import notification from './modules/notification';
export default combineReducers({
  notification,
  auth,
  router
});
