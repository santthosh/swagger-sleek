import { connect } from 'react-redux';
import AppNavDrawer from '../AppNavDrawer';

const mapStateToProps = (state) => {
    return {
        definitions:state.swagger.definitions
    }
};

const DynamicAppNavDrawer = connect(
    mapStateToProps,
    null
)(AppNavDrawer);

export default DynamicAppNavDrawer;