/* eslint-disable import/prefer-default-export */
import { Navigation } from 'react-native-navigation';

import PinScreen from './PinScreen';
import HomeScreen from './HomeScreen';
import DigitalCardScreen from './DigitalCardScreen';
import MemberResourceScreen from './MemberResourceScreen';
import AlertsScreen from './AlertsScreen';
import SideMenu from './SideMenu';
import LanguageSelect from '../components/LanguageSelect';

// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
  Navigation.registerComponent('mdp.PinScreen', () => PinScreen, store, Provider);
  Navigation.registerComponent('mdp.HomeScreen', () => HomeScreen, store, Provider);
  Navigation.registerComponent('mdp.DigitalCardScreen', () => DigitalCardScreen, store, Provider);
  Navigation.registerComponent(
    'mdp.MemberResourceScreen',
    () => MemberResourceScreen,
    store,
    Provider,
  );
  Navigation.registerComponent('mdp.AlertsScreen', () => AlertsScreen, store, Provider);
  Navigation.registerComponent('mdp.SideMenu', () => SideMenu, store, Provider);
  Navigation.registerComponent('mdp.LanguageSelect', () => LanguageSelect, store, Provider);
}
