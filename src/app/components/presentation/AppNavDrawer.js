import React, {Component, PropTypes} from 'react';
import Drawer from 'material-ui-ref/Drawer';
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
  chip: {
    margin: 1,
  },
  chipPath: {
    margin: 1,
    backgroundColor: 'white',
  },
  chipMethodDELETELabel: {
    color: 'RED',
    fontWeight: 'bold',
    fontSize: 12,
  },
  chipMethodPOSTLabel: {
    color: 'GREEN',
    fontWeight: 'bold',
    fontSize: 12,
  },
  chipMethodPUTLabel: {
    color: 'ORANGE',
    fontWeight: 'bold',
    fontSize: 12,
  },
  chipMethodPATCHLabel: {
    color: 'YELLOW',
    fontWeight: 'bold',
    fontSize: 12,
  },
  chipMethodGETLabel: {
    color: 'INDIGO',
    fontWeight: 'bold',
    fontSize: 12,
  },
  chipLabel: {
    fontSize:14
  },
  tagLabel: {
    fontSize:16
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  logo: {
    cursor: 'pointer',
    fontSize: 20,
    color: typography.textFullWhite,
    lineHeight: `${spacing.desktopKeylineIncrement}px`,
    fontWeight: typography.fontWeightLight,
    backgroundColor: indigo500,
    paddingLeft: spacing.desktopGutter,
    marginBottom: 8,
  },
  version: {
    paddingLeft: spacing.desktopGutterLess,
    fontSize: 14,
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
    definitions:PropTypes.object
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

    const {
        router
    } = this.context;

    var pathListItems = function(tag,definition) {
      var items = [];
      var paths = definition.swagger.paths;
      for (var path in paths) {
        if (paths.hasOwnProperty(path)) {
          var methods = paths[path];
          for(var key in methods) {
            var tags = methods[key].tags;
            if(methods.hasOwnProperty(key) && tags.indexOf(tag) > -1) {
              var style = styles.chipMethodGETLabel;
              if(key.toUpperCase() === 'POST')
                style =  styles.chipMethodPOSTLabel;
              if(key.toUpperCase() === 'DELETE')
                style = styles.chipMethodDELETELabel;
              if(key.toUpperCase() === 'GET')
                style = styles.chipMethodGETLabel;
              if(key.toUpperCase() === 'PUT')
                style = styles.chipMethodPUTLabel;
              if(key.toUpperCase() === 'PATCH')
                style = styles.chipMethodPATCHLabel;
              items.push(
                  <ListItem primaryText={<div style={styles.wrapper}>
                    <span style={style}>{key.toUpperCase()}</span>&nbsp;
                    <span style={styles.chipLabel}>{path}</span>
                  </div>}
                            value={"/swagger?url=" + definition.url + "&operation=" + methods[key].operationId}
                            secondaryText={methods[key].summary}
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
            <ListItem primaryText={<span style={styles.tagLabel}>{tags[tag].name}</span>}
                      secondaryText={tags[tag].description}
                      secondaryTextLines={2}
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



    var definitionListItems = function(context,definitions) {
      var listItems = [];
      for (var key in definitions) {
        if (definitions.hasOwnProperty(key)) {
          var definition = definitions[key];
          var subtitle = definition.swagger.info.title + ' ' + definition.swagger.info.version;
          listItems.push(
              <ListItem primaryText={definition.name}
                        secondaryText={subtitle}
                        key={definition.url}
                        leftIcon={<AssignmentIcon/>}
                        primaryTogglesNestedList={false}
                        value={"/swagger?url=" + definition.url}
                        initiallyOpen={true}
                        autoGenerateNestedIndicator={false}
                        nestedItems={tagListItems(definition)}
              />
          );
        }
      }

      return listItems;
    };

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
          {definitionListItems(this.context,this.props.definitions)}
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
