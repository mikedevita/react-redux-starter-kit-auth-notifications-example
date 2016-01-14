import { connect } from 'react-redux';
import { NotificationItem } from './NotificationItem';
import { actions as notify } from 'redux/modules/notification';

import styles from './notification.scss';

const mapStateToProps = (state) => ({
  notification: state.notification
});

export class Notification extends React.Component {
  static contextTypes = {
    store: React.PropTypes.any
  }

  constructor (props, context) {
    super(props, context);
  }

  static propTypes = {
    notification: React.PropTypes.array.isRequired
  }

  dismiss (index) {
    const { dispatch } = this.context.store;
    dispatch(notify.dismiss(index));
  }

  render () {
    const { notification } = this.props;
    const _notifications = notification.map(function (notification, index) {
      return (<NotificationItem onDismiss={this.dismiss.bind(this)} index={index} key={index} {...notification} />);
    }.bind(this));

    return (<div className={styles['notification-container']}>{_notifications}</div>);
  }
};
export default connect(mapStateToProps, notify)(Notification);
