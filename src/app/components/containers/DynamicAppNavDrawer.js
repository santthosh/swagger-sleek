import { connect } from 'react-redux';
import AppNavDrawer from '../presentation/AppNavDrawer';

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