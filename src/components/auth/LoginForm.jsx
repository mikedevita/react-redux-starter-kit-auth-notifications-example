import styles from './LoginForm.scss';
import Spinner from 'react-spin';

export class LoginForm extends React.Component {
  static propTypes = {
    onSubmit: React.PropTypes.func.isRequired,
    isProcessing: React.PropTypes.bool.isRequired
  }

  constructor (props) {
    super(props);

    this.state = {
      validForm: false
    };
  }

  // don't allow form submission unless form is valid
  // does some basic checking to make sure identity & password are fileld in.
  _handleChange () {
    const identity = this.refs.identity.value;
    const password = this.refs.password.value;

    if (identity && password) {
      this.setState({
        validForm: true
      });
    }
  }

  _handleSubmit (event) {
    event.preventDefault();
    const identity = this.refs.identity.value;
    const password = this.refs.password.value;
    this.props.onSubmit(identity, password);
  }

  render () {
    return (
      <form name='loginForm' ref='loginForm' id='loginForm' method='POST' onChange={this._handleChange.bind(this)} onSubmit={this._handleSubmit.bind(this)} className={styles['form-signin']}>
        <h1 className='form-signin-heading text-muted'>Sign In</h1>
        <input type='text' name='identity' id='identity' ref='identity' className='form-control' placeholder='Username' required />
        <input type='password' name='password' id='password' ref='password' className='form-control' placeholder='Password' required />
        <button className='btn btn-lg btn-primary btn-block' disabled={!this.state.validForm}>
          {this.props.isProcessing
            ? <i className='fa fa-spin fa-spinner'></i>
            : 'Login'
          }
        </button>
      </form>
    );
  };
}
