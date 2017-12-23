// @flow
import { Provider } from 'react-redux';
import { Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { PIN, MAIN } from './constants/actionTypes';
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

  onStoreUpdate() {
    const { root } = store.getState().app;
    if (this.currentRoot !== root) {
      this.currentRoot = root;
      iconsLoaded.then(() => {
        this.startApp(root);
      });
    }
  }

  startApp = (root) => {
    const { OS } = Platform;
    if (root === PIN) {
      Navigation.startSingleScreenApp({
        screen: {
          screen: 'mdp.PinScreen',
          title: 'Pin',
          navigatorStyle: {},
        },
      });
    } else {
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
        passProps: {},
        animationType: 'slide-down',
        title: 'Redux Example',
        drawer: {
          // optional, add this if you want a side menu drawer in your app
          left: {
            // optional, define if you want a drawer from the left
            screen: 'mdp.SideMenu', // unique ID registered with Navigation.registerScreen
          },
          disableOpenGesture: false, // optional, can the drawer be opened with a swipe instead of button
          passProps: {
            title: 'Hello from SideMenu',
          },
        },
        appStyle: {
          bottomTabBadgeTextColor: '#ffffff',
          bottomTabBadgeBackgroundColor: '#ff0000',
        },
      });
    }
  };
}
