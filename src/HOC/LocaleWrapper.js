import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import changeLocale from '../actions/languageAction';
import config from '../config';
import I18n from '../i18n';

function LocaleWrapper(WrapperComponent) {
  class LocaleFilter extends Component {
    static propTypes = {
      locale: PropTypes.string.isRequired,
      changeLocale: PropTypes.func.isRequired,
    };

    constructor(props) {
      super(props);

      this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
      this.openLocaleSelect = this.openLocaleSelect.bind(this);
      this.selectLanguage = this.selectLanguage.bind(this);
    }

    componentWillMount = () => {
      this.setButton(this.props.locale);
    };

    componentWillReceiveProps = (nextProps) => {
      if (this.props.locale !== nextProps.locale) {
        this.setButton(nextProps.locale);
      }
    };

    onNavigatorEvent(event) {
      if (event.type === 'NavBarButtonPress') {
        if (event.id === 'locale') {
          this.openLocaleSelect();
        }
      }
    }

    setButton = (title) => {
      this.props.navigator.setButtons({
        rightButtons: [
          {
            id: 'locale',
            title: title.toUpperCase(),
            buttonColor: 'green',
            buttonFontSize: 14,
            buttonFontWeight: '600',
          },
        ],
      });
    };

    openLocaleSelect = () => {
      this.props.navigator.showLightBox({
        screen: 'mdp.LanguageSelect',
        passProps: {
          currentLocale: this.props.locale,
          languages: config.locale,
          onSelect: this.selectLanguage,
        },
        style: {
          backgroundBlur: 'dark',
        },
        adjustSoftInput: 'resize',
      });
    };

    selectLanguage = (locale) => {
      this.props.navigator.dismissLightBox();
      this.props.changeLocale(locale);
      I18n.locale = locale;
    };

    render() {
      return <WrapperComponent {...this.state} {...this.props} />;
    }
  }

  const mapStateToProps = (state) => {
    const { locale } = state.locale;
    return {
      locale,
    };
  };

  const mapDispatchToProps = dispatch => ({
    changeLocale: (locale) => {
      dispatch(changeLocale(locale));
    },
  });

  return connect(mapStateToProps, mapDispatchToProps)(LocaleFilter);
}

export default LocaleWrapper;
