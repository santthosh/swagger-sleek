import { connect } from 'react-redux';
import APIDefinitionDetails from '../presentation/APIDefinitionDetails';

const mapStateToProps = (state) => {
    return {
        definitions:state.swagger.definitions
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

const SwaggerAPIDefinitionDetails = connect(
    mapStateToProps,
    mapDispatchToProps
)(APIDefinitionDetails);

export default SwaggerAPIDefinitionDetails;