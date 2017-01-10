import React, {Component, PropTypes} from 'react';
import Title from 'react-title-component';
import AppBar from 'material-ui-ref/AppBar';
import IconButton from 'material-ui-ref/IconButton';
import spacing from 'material-ui-ref/styles/spacing';
import getMuiTheme from 'material-ui-ref/styles/getMuiTheme';
import {indigo500, darkWhite, lightWhite, grey900} from 'material-ui-ref/styles/colors';
import DynamicAppNavDrawer from '../containers/DynamicAppNavDrawer';
import withWidth, {MEDIUM, LARGE} from 'material-ui-ref/utils/withWidth';
import lightBaseTheme from '../../themes/sleekTheme';
import FullWidthSection from './FullWidthSection';

class Master extends Component {
  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object,
    width: PropTypes.number.isRequired,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  static childContextTypes = {
    muiTheme: PropTypes.object,
  };

  state = {
    navDrawerOpen: false,
  };

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  }

  componentWillMount() {
    this.setState({
      muiTheme: getMuiTheme(lightBaseTheme),
    });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({
      muiTheme: newMuiTheme,
    });
  }

  getStyles() {
    const styles = {
      appBar: {
        position: 'fixed',
        // Needed to overlap the examples
        zIndex: this.state.muiTheme.zIndex.appBar + 1,
        backgroundColor:indigo500,
        top: 0,
      },
      root: {
        paddingTop: spacing.desktopKeylineIncrement,
        minHeight: 400,
      },
      content: {
        margin: spacing.desktopGutter,
      },
      contentWhenMedium: {
        margin: `${spacing.desktopGutter * 2}px ${spacing.desktopGutter * 3}px`,
      },
      footer: {
        backgroundColor: grey900,
        textAlign: 'center',
      },
      a: {
        color: darkWhite,
      },
      p: {
        margin: '0 auto',
        padding: 0,
        color: lightWhite,
        maxWidth: 356,
      },
      browserstack: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        margin: '25px 15px 0',
        padding: 0,
        color: lightWhite,
        lineHeight: '25px',
        fontSize: 12,
      },
      browserstackLogo: {
        margin: '0 3px',
      },
      iconButton: {
        color: darkWhite,
      },
    };

    if (this.props.width === MEDIUM || this.props.width === LARGE) {
      styles.content = Object.assign(styles.content, styles.contentWhenMedium);
    }

    return styles;
  }

  handleTouchTapLeftIconButton = () => {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen,
    });
  };

  handleChangeRequestNavDrawer = (open) => {
    this.setState({
      navDrawerOpen: open,
    });
  };

  handleChangeList = (event, value) => {
    this.context.router.push(value);
    this.setState({
      navDrawerOpen: false,
    });
  };

  handleChangeMuiTheme = (muiTheme) => {
    this.setState({
      muiTheme: muiTheme,
    });
  };

  render() {
    const {
      location,
      children,
    } = this.props;

    let {
      navDrawerOpen,
    } = this.state;

    const {
      prepareStyles,
    } = this.state.muiTheme;

    const router = this.context.router;
    const styles = this.getStyles();
    const title =
      router.isActive('/help') ? 'Help' :
      router.isActive('/configuration') ? 'Configuration' :
      router.isActive('/swagger') ? 'Swagger Definition' :
      router.isActive('/') ? ' ' :
      router.isActive('/api') ? 'API' : 'Swagger Sleek';

    let docked = false;
    let showMenuIconButton = true;

    if (this.props.width === LARGE && title !== ' ') {
      docked = true;
      navDrawerOpen = true;
      showMenuIconButton = false;

      styles.navDrawer = {
        zIndex: styles.appBar.zIndex - 1,
      };
      styles.root.paddingLeft = 256;
      styles.footer.paddingLeft = 256;
    }

    return (
      <div>
        <Title render="Swagger-Sleek" />
        <AppBar
          onLeftIconButtonTouchTap={this.handleTouchTapLeftIconButton}
          title={title}
          zDepth={0}
          iconElementRight={
            <IconButton
              iconClassName="muidocs-icon-custom-github"
              href="https://github.com/santthosh/swagger-sleek"
            />
          }
          style={styles.appBar}
          showMenuIconButton={showMenuIconButton}
        />
        {title !== ' ' ?
          <div style={prepareStyles(styles.root)}>
            <div style={prepareStyles(styles.content)}>
              {React.cloneElement(children, {
                onChangeMuiTheme: this.handleChangeMuiTheme,
              })}
            </div>
          </div> :
          children
        }
        <DynamicAppNavDrawer
          style={styles.navDrawer}
          location={location}
          docked={docked}
          onRequestChangeNavDrawer={this.handleChangeRequestNavDrawer}
          onChangeList={this.handleChangeList}
          open={navDrawerOpen}
        />
        {title === ' ' ?
            <FullWidthSection style={styles.footer}>
              <IconButton
                  iconStyle={styles.iconButton}
                  iconClassName="muidocs-icon-custom-github"
                  href="https://github.com/santthosh/swagger-sleek"
              />
              <p style={prepareStyles(styles.browserstack)}>
                {'Made with  '}
                <a href="https://facebook.github.io/react/" style={prepareStyles(styles.browserstackLogo)} target="_blank">
                  React
                </a>
                {' and '}
                <a href="https://material-ui.com/" style={prepareStyles(styles.browserstackLogo)} target="_blank">
                  Material-UI
                </a>
              </p>
            </FullWidthSection> : <div></div>
        }
      </div>
    );
  }
}

export default withWidth()(Master);
