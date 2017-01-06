import { connect } from 'react-redux';
import APICard from '../presentation/APICard';
import {fetchSwagger} from '../../../../actions/swaggerRequestAction';

const mapStateToProps = (state) => {
    return {
        name : state.swagger.current.name,
        url: state.swagger.current.url,
        status: state.swagger.current.status,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddSwagger: (name,url) => {
            dispatch(fetchSwagger(name,url));
        }
    }
};

const AddAPICard = connect(
    mapStateToProps,
    mapDispatchToProps
)(APICard);

export default AddAPICard;