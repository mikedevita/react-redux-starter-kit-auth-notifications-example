import { connect } from 'react-redux';
import Navbar from '../components/Navbar';
import { APP } from '../statics.js';

const mapStateToProps = (state) => ({
  auth: state.auth
});

export class Header extends React.Component {
  static propTypes = {
    routes: React.PropTypes.array.isRequired,
    auth: React.PropTypes.object.isRequired
  }

  static contextTypes = {
    store: React.PropTypes.any
  }

  constructor (props, context) {
    super(props, context);
  }

  render () {
    return (<Navbar routes={this.props.routes} user={this.props.auth.user} title={APP.title} />);
  };
}

export default connect(mapStateToProps)(Header);
