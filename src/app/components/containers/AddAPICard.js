import { connect } from 'react-redux';
import APICard from '../pages/Configuration/APICard';
import {fetchSwaggerRequest} from '../../actions/swaggerRequestAction';

const mapStateToProps = (state) => {
    return {
        name : state.swagger.current.name,
        url: state.swagger.current.url,
        status: state.swagger.current.status,
    }
};

const mapDispatchToProps = (dispatch,props) => {
    return {
        onAddSwagger: (name,url) => {
            dispatch(fetchSwaggerRequest(name,url));
        }
    }
};

const AddAPICard = connect(
    mapStateToProps,
    mapDispatchToProps
)(APICard);

export default AddAPICard;