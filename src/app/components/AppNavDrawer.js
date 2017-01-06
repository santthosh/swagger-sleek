import React, {Component, PropTypes} from 'react';
import Drawer from 'material-ui-ref/Drawer';
import Divider from 'material-ui-ref/Divider';
import {List, ListItem, makeSelectable} from 'material-ui-ref/List';
import {spacing, typography, zIndex} from 'material-ui-ref/styles';
import {indigo500} from 'material-ui-ref/styles/colors';
import HelpIcon from 'material-ui-ref/svg-icons/action/help';
import LicenseIcon from 'material-ui-ref/svg-icons/action/work';
import AssignmentIcon from 'material-ui-ref/svg-icons/action/assignment';
import SubjectIcon from 'material-ui-ref/svg-icons/action/subject';
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
    definitions:PropTypes.array
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
      definitions
    } = this.props;

    var pathListItems = function(tag,definition) {
      var items = [];
      var paths = definition.swagger.paths;
      for (var path in paths) {
        if (paths.hasOwnProperty(path)) {
          var methods = paths[path];
          for(var key in methods) {
            var tags = methods[key].tags;
            if(methods.hasOwnProperty(key) && tags.indexOf(tag) > -1) {
              items.push(
                  <ListItem primaryText={path}
                            secondaryText={key}
                            leftIcon={<SubjectIcon/>}
                            value="/api"
                  />
              )
            }
          }
        }
      }
      return items;
    };

    var tagListItems = function(definition) {
      var items = [];
      var tags = definition.swagger.tags;
      for (var tag in tags) {
        if (tags.hasOwnProperty(tag)) {
          items.push(
            <ListItem primaryText={tags[tag].name}
                      key={tags[tag].name}
                      leftIcon={<SubjectIcon/>}
                      primaryTogglesNestedList={true}
                      nestedItems={pathListItems(tags[tag].name,definition)}
            />
          );
        }
      }
      return items;
    };

    var definitionListItems = this.props.definitions.map(function(definition) {
      return (
          <ListItem primaryText={definition.name}
                    key={definition.url}
                    leftIcon={<AssignmentIcon/>}
                    primaryTogglesNestedList={true}
                    initiallyOpen={true}
                    nestedItems={tagListItems(definition)}
          />
      );
    });

    return (
      <Drawer
        style={style}
        docked={docked}
        open={open}
        onRequestChange={onRequestChangeNavDrawer}
        containerStyle={{zIndex: zIndex.drawer - 100}}>
        <div style={styles.logo} onTouchTap={this.handleTouchTapHeader}>
          Swagger Sleek
        </div>
        <SelectableList
          value={location.pathname}
          onChange={onChangeList}>
          {definitionListItems}
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
