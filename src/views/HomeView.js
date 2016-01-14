import { connect } from 'react-redux';
import { Header } from '../containers/Header';

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  auth: state.auth
});

export class HomeView extends React.Component {
  static propTypes = {
    auth: React.PropTypes.object.isRequired,
    routes: React.PropTypes.array.isRequired
  }

  static contextTypes = {
    store: React.PropTypes.any
  }

  constructor (props, context) {
    super(props, context);
  }

  render () {
    return (<div>
      <Header auth={this.props.auth} routes={this.props.routes} />
      <h1>Home View</h1>
    </div>);
  }
}

export default connect(mapStateToProps)(HomeView);
