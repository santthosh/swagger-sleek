import { connect } from 'react-redux';
import APIDefinitions from '../presentation/APIDefinitions';

const mapStateToProps = (state) => {
    return {
        definitions:state.swagger.definitions
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

const SwaggerAPIDefinitions = connect(
    mapStateToProps,
    mapDispatchToProps
)(APIDefinitions);

export default SwaggerAPIDefinitions;