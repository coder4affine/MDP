import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Platform } from 'react-native';

import ENIcon from '../images/countryFlags/en.png';
import ESIcon from '../images/countryFlags/es.png';

function LocaleWrapper(WrapperComponent) {
  class LocaleFilter extends Component {
    static propTypes = {
      locale: PropTypes.string.isRequired,
      navigator: PropTypes.object.isRequired,
    };

    constructor(props) {
      super(props);

      this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
      this.openLocaleSelect = this.openLocaleSelect.bind(this);
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
        if (event.id === 'closeModal') {
          this.props.navigator.dismissModal({
            animationType: 'slide-down', // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
          });
        }
        if (event.id === 'closeAllModal') {
          this.props.navigator.dismissAllModals({
            animationType: 'slide-down', // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
          });
        }
        if (event.id === 'menu') {
          this.props.navigator.toggleDrawer({
            side: 'left',
            animated: true,
          });
        }
      }
      if (event.type === 'DeepLink') {
        const parts = event.link.split('/');
        // const payload = event.payload;
        if (parts[0] === 'tab') {
          let tabIndex;
          switch (parts[1]) {
            case 'mdp.HomeScreen':
              tabIndex = 0;
              break;
            case 'mdp.MyBenefitsScreen':
              tabIndex = 1;
              break;
            case 'mdp.DigitalCardScreen':
              tabIndex = 2;
              break;
            case 'mdp.MemberResourceScreen':
              tabIndex = 3;
              break;
            case 'mdp.AlertsScreen':
              tabIndex = 4;
              break;

            default:
              tabIndex = 0;
              break;
          }
          this.props.navigator.switchToTab({
            tabIndex,
          });
          // handle the link somehow, usually run a this.props.navigator command
        }
      }
    }

    setButton = (locale) => {
      const icon = locale.toLowerCase() === 'es' ? ESIcon : ENIcon;
      let button = {};
      if (Platform.OS === 'ios') {
        button = {
          id: 'locale',
          component: 'mdp.FlagIcon',
          passProps: {
            locale,
          },
        };
      } else {
        button = {
          id: 'locale',
          icon,
        };
      }

      this.props.navigator.setButtons({
        rightButtons: [button],
      });
    };

    openLocaleSelect = () => {
      this.props.navigator.showLightBox({
        screen: 'mdp.LanguageSelect',
        style: {
          backgroundBlur: 'dark',
        },
        adjustSoftInput: 'resize',
      });
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

  const mapDispatchToProps = () => ({});

  return connect(mapStateToProps, mapDispatchToProps)(LocaleFilter);
}

export default LocaleWrapper;
