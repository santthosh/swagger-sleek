import { connect } from 'react-redux';
import APIDefinitionTableRow from '../presentation/APIDefinitionTableRow';
import {fetchSwagger,removeSwagger} from '../../../../actions/swaggerRequestAction';

const mapStateToProps = (state,ownProps) => {
    return {
        definition:state.swagger.definitions[ownProps.url]
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onRefreshSwagger: (name,url) => {
            dispatch(fetchSwagger(name,url));
        },
        onRemoveSwagger: (name,url) => {
            dispatch(removeSwagger(name,url));
        }
    }
};

const SwaggerAPIDefinitionTableRow = connect(
    mapStateToProps,
    mapDispatchToProps
)(APIDefinitionTableRow);

export default SwaggerAPIDefinitionTableRow;