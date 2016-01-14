import { createHistory, useBasename } from 'history';
import { syncReduxAndRouter } from 'redux-simple-router';
import routes from './routes';
import Root from './containers/Root';
import configureStore from './redux/configureStore';

import { actions as authActions } from 'redux/modules/auth';
import { APP } from './statics.js';

const history = useBasename(createHistory)({
  basename: __BASENAME__
});
const store = configureStore(window.__INITIAL_STATE__);

syncReduxAndRouter(history, store, (state) => state.router);

document.title = APP.title;

if (authActions.isAuthenticated()) {
  store.dispatch(authActions.setUser());
}

// Render the React application to the DOM
ReactDOM.render(
  <Root history={history} routes={routes} store={store} />,
  document.getElementById('root')
);
