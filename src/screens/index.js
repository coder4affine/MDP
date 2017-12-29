/* eslint-disable import/prefer-default-export */
import { Navigation } from 'react-native-navigation';

import PinScreen from './PinScreen';
import HomeScreen from './HomeScreen';
import DigitalCardScreen from './DigitalCardScreen';
import MyBenefitsScreen from './MyBenefitsScreen';
import MemberResourceScreen from './MemberResourceScreen';
import AlertsScreen from './AlertsScreen';
import LoginScreen from './LoginScreen';
import RegisterFirstScreen from './RegisterFirstScreen';
import RegisterSecondScreen from './RegisterSecondScreen';
import SideMenu from './SideMenu';
import ErrorScreen from './ErrorScreen';
import NeedHelpScreen from './NeedHelpScreen';
import LanguageSelect from '../components/LanguageSelect';
import FlagIcon from '../components/FlagIcon';

// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
  Navigation.registerComponent('mdp.PinScreen', () => PinScreen, store, Provider);
  Navigation.registerComponent('mdp.HomeScreen', () => HomeScreen, store, Provider);
  Navigation.registerComponent('mdp.DigitalCardScreen', () => DigitalCardScreen, store, Provider);
  Navigation.registerComponent('mdp.MyBenefitsScreen', () => MyBenefitsScreen, store, Provider);
  Navigation.registerComponent(
    'mdp.MemberResourceScreen',
    () => MemberResourceScreen,
    store,
    Provider,
  );
  Navigation.registerComponent('mdp.AlertsScreen', () => AlertsScreen, store, Provider);
  Navigation.registerComponent('mdp.LoginScreen', () => LoginScreen, store, Provider);
  Navigation.registerComponent(
    'mdp.RegisterFirstScreen',
    () => RegisterFirstScreen,
    store,
    Provider,
  );
  Navigation.registerComponent(
    'mdp.RegisterSecondScreen',
    () => RegisterSecondScreen,
    store,
    Provider,
  );
  Navigation.registerComponent('mdp.SideMenu', () => SideMenu, store, Provider);
  Navigation.registerComponent('mdp.NeedHelpScreen', () => NeedHelpScreen, store, Provider);
  Navigation.registerComponent('mdp.ErrorScreen', () => ErrorScreen, store, Provider);
  Navigation.registerComponent('mdp.LanguageSelect', () => LanguageSelect, store, Provider);
  Navigation.registerComponent('mdp.FlagIcon', () => FlagIcon);
}
