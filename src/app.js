// @flow
import { Provider } from 'react-redux';
import { Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { PIN, MAIN, LOGIN } from './constants/actionTypes';
import configureStore from './configureStore';
import { appInitialized } from './actions/app';
import { registerScreens } from './screens';
import { iconsMap, iconsLoaded } from './utils/AppIcons';

const store = configureStore();

registerScreens(store, Provider);

export default class App {
  constructor() {
    store.subscribe(this.onStoreUpdate.bind(this));
    store.dispatch(appInitialized());
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
          title: 'Pin',
          navigatorStyle: {},
        },
      });
    } else if (root === LOGIN) {
      Navigation.startSingleScreenApp({
        screen: {
          screen: 'mdp.LoginScreen',
          title: 'Login',
          navigatorStyle: {},
        },
      });
    } else if (root === MAIN) {
      Navigation.startTabBasedApp({
        tabs: [
          {
            label: 'Home',
            screen: 'mdp.HomeScreen',
            title: 'Home',
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
            label: 'My Benefits',
            screen: 'mdp.MyBenefitsScreen',
            title: 'My Benefits',
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
            label: 'Digital Card',
            screen: 'mdp.DigitalCardScreen',
            title: 'Digital Card',
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
            label: 'Member Resource',
            screen: 'mdp.MemberResourceScreen',
            title: 'Member Resource',
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
            label: 'Alerts',
            screen: 'mdp.AlertsScreen',
            title: 'Alerts',
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
          tabBarBackgroundColor: '#003a66',
          tabBarButtonColor: '#ffffff',
          tabBarSelectedButtonColor: '#ff505c',
          tabFontFamily: 'BioRhyme-Bold',
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
          title: 'Error',
          navigatorStyle: {},
        },
      });
    }
  };
}
