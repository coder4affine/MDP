import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Platform, Share, NetInfo, AppState } from 'react-native';

import { iconsMap } from '../../utils/AppIcons';
import ENIcon from '../../images/countryFlags/en.png';
import ESIcon from '../../images/countryFlags/es.png';

function Wrapper(WrapperComponent, name = '') {
  class LocaleFilter extends Component {
    static propTypes = {
      locale: PropTypes.string.isRequired,
      card: PropTypes.object,
      navigator: PropTypes.object.isRequired,
    };

    static defaultProps = {
      card: null,
    };

    constructor(props) {
      super(props);

      this.state = {
        appState: AppState.currentState,
        isConnected: false,
      };

      this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
      this.openLocaleSelect = this.openLocaleSelect.bind(this);
      this.openShare = this.openShare.bind(this);
      this.handleConnectionChange = this.handleConnectionChange.bind(this);
      this.handleAppStateChange = this.handleAppStateChange.bind(this);
    }

    componentDidMount = () => {
      this.setButton(this.props.locale);
      NetInfo.isConnected.fetch().then(this.handleConnectionChange);
      AppState.addEventListener('change', this.handleAppStateChange);
      NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
    };

    componentWillReceiveProps = (nextProps) => {
      if (this.props.locale !== nextProps.locale) {
        this.setButton(nextProps.locale);
      }
    };

    componentWillUnmount = () => {
      AppState.removeEventListener('change', this.handleAppStateChange);
      NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
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
        if (event.id === 'share') {
          this.openShare();
        }
      }
      if (event.type === 'DeepLink') {
        // alert(JSON.stringify(event));
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
      const rightButtons = [];
      if (Platform.OS === 'ios') {
        rightButtons.push({
          id: 'locale',
          component: 'mdp.FlagIcon',
          passProps: {
            locale,
          },
        });
      } else {
        rightButtons.push({
          id: 'locale',
          icon,
        });
      }

      if (name === 'digitalCard') {
        rightButtons.push({
          icon: Platform.OS === 'ios' ? iconsMap['ios-share'] : iconsMap['md-share'],
          id: 'share',
          showAsAction: 'ifRoom',
          buttonFontSize: 14,
          buttonFontWeight: '600',
        });
      }

      this.props.navigator.setButtons({
        rightButtons,
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

    handleAppStateChange = (nextAppState) => {
      this.setState({ appState: nextAppState });
    };

    handleConnectionChange(isConnected) {
      this.setState({ isConnected });
    }

    openShare() {
      const { card } = this.props;
      if (card) {
        Share.share(
          {
            message: `I am sharing digital card of *${card.FirstName} ${card.LastName}*`,
            url: 'http://bam.tech',
            title: 'Share Digital Card',
          },
          {
            subject: '',
            dialogTitle: 'Share Digital Card',
          },
        );
      }
    }

    render() {
      return <WrapperComponent {...this.state} {...this.props} />;
    }
  }

  const mapStateToProps = (state) => {
    const { locale } = state.locale;
    return {
      locale,
      card: state.card.card,
    };
  };

  const mapDispatchToProps = () => ({});

  return connect(mapStateToProps, mapDispatchToProps)(LocaleFilter);
}

export default Wrapper;
