import { Alert } from 'react-bootstrap';

export class NotificationItem extends React.Component {
  static propTypes = {
    onDismiss: React.PropTypes.func
  }

  _handleDismiss = function (index, event) {
    console.log('dismiss event fired');
    this.props.onDismiss(index);
  }

  render () {
    let { index, type, title, dismissable, message, onDismiss } = this.props;
    if (type === 'ERROR') {
      type = 'danger';
    };
    return (<Alert bsStyle={type} onDismiss={this._handleDismiss.bind(this, index)} dismissAfter={10000}>
      {title &&
        <h4>{title}</h4>
      }
      <p>{message}</p>
    </Alert>);
  }
};
