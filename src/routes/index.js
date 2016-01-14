import { Route, IndexRoute } from 'react-router';

// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import CoreLayout from 'layouts/CoreLayout';
import AuthLayout from 'layouts/AuthLayout';

import HomeView from 'views/HomeView';
import AboutView from 'views/AboutView';
import LoginView from 'views/auth/LoginView';
import LogoutView from 'views/auth/LogoutView';
import { Authenticated } from 'containers/Authenticated';

export default (<Route>
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={Authenticated(HomeView)} />
    <Route path='/about' name='About Us' component={Authenticated(AboutView)} />
  </Route>
  <Route path='/auth' component={AuthLayout}>
    <Route path='login' component={LoginView} />
    <Route path='logout' component={LogoutView} />
  </Route>
</Route>);
