import React, {Component, PropTypes} from 'react';
import Drawer from 'material-ui-ref/Drawer';
import {List, ListItem, makeSelectable} from 'material-ui-ref/List';
import {spacing, typography, zIndex} from 'material-ui-ref/styles';
import {indigo500} from 'material-ui-ref/styles/colors';
import HelpIcon from 'material-ui-ref/svg-icons/action/help';
import LicenseIcon from 'material-ui-ref/svg-icons/action/work';
import SettingsIcon from 'material-ui-ref/svg-icons/action/settings';

const SelectableList = makeSelectable(List);

const styles = {
  logo: {
    cursor: 'pointer',
    fontSize: 24,
    color: typography.textFullWhite,
    lineHeight: `${spacing.desktopKeylineIncrement}px`,
    fontWeight: typography.fontWeightLight,
    backgroundColor: indigo500,
    paddingLeft: spacing.desktopGutter,
    marginBottom: 8,
  },
  version: {
    paddingLeft: spacing.desktopGutterLess,
    fontSize: 16,
  },
};

class AppNavDrawer extends Component {
  static propTypes = {
    docked: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    onChangeList: PropTypes.func.isRequired,
    onRequestChangeNavDrawer: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    style: PropTypes.object,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
  };

  state = {
  };

  componentDidMount() {
    const self = this;
  }

  handleTouchTapHeader = () => {
    this.context.router.push('/');
    this.props.onRequestChangeNavDrawer(false);
  };

  render() {
    const {
      location,
      docked,
      onRequestChangeNavDrawer,
      onChangeList,
      open,
      style,
    } = this.props;

    return (
      <Drawer
        style={style}
        docked={docked}
        open={open}
        onRequestChange={onRequestChangeNavDrawer}
        containerStyle={{zIndex: zIndex.drawer - 100}}
      >
        <div style={styles.logo} onTouchTap={this.handleTouchTapHeader}>
          Swagger Sleek
        </div>
        <SelectableList
          value={location.pathname}
          onChange={onChangeList}
        >
          <ListItem
              primaryText="Configuration"
              leftIcon={<SettingsIcon/>}
              primaryTogglesNestedList={false}
              value="/configuration"
          />
          <ListItem
            primaryText="Help"
            leftIcon={<HelpIcon/>}
            primaryTogglesNestedList={true}
            nestedItems={[
              <ListItem leftIcon={<LicenseIcon/>} primaryText="License" value="/help/license" />
            ]}
          />
        </SelectableList>
      </Drawer>
    );
  }
}

export default AppNavDrawer;
