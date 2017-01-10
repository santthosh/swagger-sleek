import { connect } from 'react-redux';
import APICard from '../presentation/APICard';
import {fetchSwagger} from '../../../../actions/swaggerRequestAction';
import {acknowledgeNotification} from '../../../../actions/notificationRequestAction';

const mapStateToProps = (state) => {
    return {
        name : state.swagger.current.name,
        url: state.swagger.current.url,
        status: state.swagger.current.status,
        notified: state.swagger.notification.notified,
        message: state.swagger.notification.message
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddSwagger: (name,url) => {
            dispatch(fetchSwagger(name,url));
        },
        onNotificationAcknowledged: () => {
            dispatch(acknowledgeNotification());
        }
    }
};

const AddAPICard = connect(
    mapStateToProps,
    mapDispatchToProps
)(APICard);

export default AddAPICard;