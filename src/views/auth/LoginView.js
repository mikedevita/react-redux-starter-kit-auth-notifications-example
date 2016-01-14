import { connect } from 'react-redux';
import { actions as authActions } from '../../redux/modules/auth';
import { LoginForm } from '../../components/auth/LoginForm';

import Notification from 'containers/Notification/Notification';
import { actions as notify } from 'redux/modules/notification';
// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  auth: state.auth
});

export class LoginView extends React.Component {
  static propTypes = {
    auth: React.PropTypes.object.isRequired
  }
  static contextTypes = {
    store: React.PropTypes.any
  }

  constructor (props, context) {
    super(props, context);
  }

  _handleLogin (identity, password) {
    const { dispatch } = this.context.store;
    dispatch(authActions.login(identity, password));
  }
  _testNotify (event) {
    event.preventDefault();
    const { dispatch } = this.context.store;

    dispatch(notify.emit({
      type: 'ERROR',
      title: 'Test 123',
      dismissable: false,
      message: 'test 123'
    }));
  };

  render () {
    const { auth } = this.props;
    return (<div className='container'>
      <Notification />
      <button className='btn btn-success' onClick={this._testNotify.bind(this)}>Emit Notification</button>
      <LoginForm onSubmit={this._handleLogin.bind(this)} isProcessing={auth.isFetching} />
    </div>);
  }
}

export default connect(mapStateToProps, authActions)(LoginView);
