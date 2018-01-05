// @flow
import { Provider } from 'react-redux';
import { Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import moment from 'moment';
import { PIN, MAIN, LOGIN } from './constants/actionTypes';
import configureStore from './configureStore';
import actions from './actions';
import { registerScreens } from './screens';
import { iconsMap, iconsLoaded } from './utils/AppIcons';
import I18n from './i18n';

const store = configureStore();

registerScreens(store, Provider);

export default class App {
  constructor() {
    store.subscribe(this.onStoreUpdate.bind(this));
    store.dispatch(actions.appInitialized());
  }

  currentRoot: '';

  onStoreUpdate() {
    const { root } = store.getState().app;
    if (this.currentRoot !== root) {
      this.currentRoot = root;
      iconsLoaded.then(() => {
        this.startApp(root);
      });
    }
  }

  startApp = (root: string) => {
    const { OS } = Platform;
    if (root === PIN) {
      Navigation.startSingleScreenApp({
        screen: {
          screen: 'mdp.PinScreen',
          title: I18n.t('hdrPin'),
          navigatorStyle: {},
        },
      });
    } else if (root === LOGIN) {
      Navigation.startSingleScreenApp({
        screen: {
          screen: 'mdp.LoginScreen',
          title: I18n.t('hdrLogin'),
          navigatorStyle: {},
        },
      });
    } else if (root === MAIN) {
      const { user, updatedOn } = store.getState().auth;
      if (user) {
        if (moment().isBefore(moment(updatedOn).add(user.expires_in, 'seconds'))) {
          const token = `${user.token_type} ${user.access_token}`;
          store.dispatch(actions.loadHome(token));
          store.dispatch(actions.getGroupMember(token));
          store.dispatch(actions.getMemberResource(token));
          store.dispatch(actions.getAlerts(token));
        } else {
          const refreshToken = { refresh_token: user.refresh_token, grant_type: 'refresh_token' };
          store.dispatch(actions.refreshToken(refreshToken)).then(() => {
            const updatedUser = store.getState().auth;
            const token = `${updatedUser.user.token_type} ${updatedUser.user.access_token}`;
            store.dispatch(actions.loadHome(token));
            store.dispatch(actions.getGroupMember(token));
            store.dispatch(actions.getMemberResource(token));
            store.dispatch(actions.getAlerts(token));
          });
        }
      }
      Navigation.startTabBasedApp({
        tabs: [
          {
            label: I18n.t('hdrHome'),
            screen: 'mdp.HomeScreen',
            title: I18n.t('hdrHome'),
            icon: iconsMap['ios-home-outline'],
            selectedIcon: iconsMap['ios-home'],
            navigatorButtons: {
              leftButtons: [
                {
                  icon: OS === 'ios' ? iconsMap['ios-menu'] : iconsMap['md-menu'],
                  id: 'menu',
                  showAsAction: 'ifRoom',
                  buttonFontSize: 14,
                  buttonFontWeight: '600',
                },
              ],
            },
            navigatorStyle: {},
          },
          {
            label: I18n.t('hdrMyBenefits'),
            screen: 'mdp.MyBenefitsScreen',
            title: I18n.t('hdrMyBenefits'),
            icon: iconsMap['ios-medkit-outline'],
            selectedIcon: iconsMap['ios-medkit'],
            navigatorButtons: {
              leftButtons: [
                {
                  icon: OS === 'ios' ? iconsMap['ios-menu'] : iconsMap['md-menu'],
                  id: 'menu',
                  showAsAction: 'ifRoom',
                  buttonFontSize: 14,
                  buttonFontWeight: '600',
                },
              ],
            },
            navigatorStyle: {},
          },
          {
            label: I18n.t('hdrDigitalCard'),
            screen: 'mdp.DigitalCardScreen',
            title: I18n.t('hdrDigitalCard'),
            icon: iconsMap['ios-card-outline'],
            selectedIcon: iconsMap['ios-card'],
            navigatorButtons: {
              leftButtons: [
                {
                  icon: OS === 'ios' ? iconsMap['ios-menu'] : iconsMap['md-menu'],
                  id: 'menu',
                  showAsAction: 'ifRoom',
                  buttonFontSize: 14,
                  buttonFontWeight: '600',
                },
              ],
            },
            navigatorStyle: {},
          },
          {
            label: I18n.t('hdrMemberResource'),
            screen: 'mdp.MemberResourceScreen',
            title: I18n.t('hdrMemberResource'),
            icon: iconsMap['ios-paper-outline'],
            selectedIcon: iconsMap['ios-paper'],
            navigatorButtons: {
              leftButtons: [
                {
                  icon: OS === 'ios' ? iconsMap['ios-menu'] : iconsMap['md-menu'],
                  id: 'menu',
                  showAsAction: 'ifRoom',
                  buttonFontSize: 14,
                  buttonFontWeight: '600',
                },
              ],
            },
            navigatorStyle: {},
          },
          {
            label: I18n.t('hdrAlerts'),
            screen: 'mdp.AlertsScreen',
            title: I18n.t('hdrAlerts'),
            icon: iconsMap['ios-notifications-outline'],
            selectedIcon: iconsMap['ios-notifications'],
            navigatorButtons: {
              leftButtons: [
                {
                  icon: OS === 'ios' ? iconsMap['ios-menu'] : iconsMap['md-menu'],
                  id: 'menu',
                  showAsAction: 'ifRoom',
                  buttonFontSize: 14,
                  buttonFontWeight: '600',
                },
              ],
            },
            navigatorStyle: {},
          },
        ],
        drawer: {
          left: {
            screen: 'mdp.SideMenu',
            passProps: {},
            disableOpenGesture: false,
            fixedWidth: 700,
          },
          style: {
            contentOverlayColor: 'rgba(0,0,0,0.25)',
          },
          disableOpenGesture: false,
        },
        animationType: 'slide-down',
        title: 'MDP',
        tabsStyle: {
          initialTabIndex: 2,
        },
        appStyle: {
          bottomTabBadgeTextColor: '#ffffff',
          bottomTabBadgeBackgroundColor: '#ff0000',
          forceTitlesDisplay: true,
        },
      });
    } else {
      Navigation.startSingleScreenApp({
        screen: {
          screen: 'mdp.ErrorScreen',
          title: I18n.t('hdrError'),
          navigatorStyle: {},
        },
      });
    }
  };
}
