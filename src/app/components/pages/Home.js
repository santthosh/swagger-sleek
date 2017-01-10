import React, {Component, PropTypes} from 'react';
import FullWidthSection from '../presentation/FullWidthSection';
import RaisedButton from 'material-ui-ref/RaisedButton';
import withWidth, {LARGE} from 'material-ui-ref/utils/withWidth';
import typography from 'material-ui-ref/styles/typography';
import lightBaseTheme from '../../themes/sleekTheme';
import {indigo500, grey200, darkWhite} from 'material-ui-ref/styles/colors';

class HomePage extends Component {

  static propTypes = {
    width: PropTypes.number.isRequired,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  homePageHero() {
    const styles = {
      root: {
        backgroundColor: indigo500,
        overflow: 'hidden'
      },
      svgLogo: {
        marginLeft: window.innerWidth * 0.5 - 130,
        width: 420,
        height: 157,
      },
      tagline: {
        margin: '16px auto 0 auto',
        textAlign: 'center',
        maxWidth: 575,
      },
      label: {
        color: lightBaseTheme.palette.primary1Color,
      },
      githubStyle: {
        margin: '16px 32px 0px 8px',
      },
      demoStyle: {
        margin: '16px 32px 0px 32px',
      },
      h1: {
        color: darkWhite,
        fontWeight: typography.fontWeightLight,
      },
      h2: {
        fontSize: 20,
        lineHeight: '28px',
        paddingTop: 19,
        marginBottom: 13,
        letterSpacing: 0,
      },
      nowrap: {
        whiteSpace: 'nowrap',
      },
      taglineWhenLarge: {
        marginTop: 32,
      },
      h1WhenLarge: {
        fontSize: 56,
      },
      h2WhenLarge: {
        fontSize: 24,
        lineHeight: '32px',
        paddingTop: 16,
        marginBottom: 12,
      },
    };

    styles.h2 = Object.assign({}, styles.h1, styles.h2);

    if (this.props.width === LARGE) {
      styles.tagline = Object.assign({}, styles.tagline, styles.taglineWhenLarge);
      styles.h1 = Object.assign({}, styles.h1, styles.h1WhenLarge);
      styles.h2 = Object.assign({}, styles.h2, styles.h2WhenLarge);
    }

    return (
      <FullWidthSection style={styles.root}>
        <div style={styles.tagline}>
          <h1 style={styles.h1}>Swagger Sleek</h1>
          <h2 style={styles.h2}>
            A new way to experience API's
          </h2>
          <RaisedButton
            className="demo-button"
            label="Demo"
            onTouchTap={this.handleTouchTapDemo}
            style={styles.demoStyle}
            labelStyle={styles.label}
          />
        </div>
      </FullWidthSection>
    );
  }

  homeContribute() {
    const styles = {
      root: {
        backgroundColor: grey200,
        textAlign: 'center'
      },
      h3: {
        margin: 0,
        padding: 0,
        fontWeight: typography.fontWeightLight,
        fontSize: 22,
      },
      button: {
        marginTop: 32,
        backgroundColor:indigo500,
        primaryColor:indigo500
      }
    };

    return (
      <FullWidthSection useContent={true} style={styles.root}>
        <h3 style={styles.h3}>
          Want to help make this <span style={styles.nowrap}>project awesome? </span>
          <span style={styles.nowrap}>Check out our repo.</span>
        </h3>
        <div style={styles.div}>
          <RaisedButton
              label="GitHub"
              primary={true}
              href="https://github.com/santthosh/swagger-sleek"
              style={styles.button}
          />
        </div>

      </FullWidthSection>
    );
  }

  handleTouchTapDemo = () => {
    this.context.router.push('/configuration');
  };

  render() {
    const style = {
      paddingTop: 0,
    };

    return (
      <div style={style}>
        {this.homePageHero()}
        {this.homeContribute()}
      </div>
    );
  }
}

export default withWidth()(HomePage);
