import { connect } from 'react-redux';
import { actions as authActions } from '../../redux/modules/auth';
import { actions as notify } from 'redux/modules/notification';
// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  auth: state.auth
});

export class LogoutView extends React.Component {
  static propTypes = {
    auth: React.PropTypes.object.isRequired
  }
  static contextTypes = {
    store: React.PropTypes.any
  }

  constructor (props, context) {
    super(props, context);
  };

  componentDidMount () {
    const { dispatch } = this.context.store;
    dispatch(authActions.logout());

    dispatch(notify.emit({
      type: 'info',
      title: 'Logout Successful',
      dismissable: false,
      message: 'Logout has been successful'
    }));
  }

  render () {
    return (<div></div>);
  }
}

export default connect(mapStateToProps, authActions)(LogoutView);
