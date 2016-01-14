import { connect } from 'react-redux';
import { pushPath } from 'redux-simple-router';

import { actions as authActions } from 'redux/modules/auth';

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  auth: state.auth
});

export function Authenticated (Component) {
  class Authenticated extends React.Component {
    static propTypes = {
      auth: React.PropTypes.object.isRequired
    }

    static contextTypes = {
      store: React.PropTypes.any
    }

    constructor (props, context) {
      super(props, context);
    }

    componentDidMount () {
      this.checkAuth();
    }

    componentWillReceiveProps (nextProps) {
      this.checkAuth();
    }

    checkAuth () {
      const { dispatch } = this.context.store;
      if (!authActions.isAuthenticated() || !this.props.auth.isAuthenticated) {
        dispatch(authActions.logout());
      }
    }

    render () {
      return (<div>
        {this.props.auth.isAuthenticated === true
          ? <Component {...this.props} />
          : null
        }
      </div>);
    }
  }
  return connect(mapStateToProps)(Authenticated);
}
