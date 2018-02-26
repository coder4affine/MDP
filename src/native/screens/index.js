/* eslint-disable import/prefer-default-export */
import { Navigation } from 'react-native-navigation';

import PinScreen from './Pin';
import HomeScreen from './Home';
import DigitalCardScreen from './DigitalCard';
import MyBenefitsScreen from './MyBenefits';
import MemberResourceScreen from './MemberResource';
import AlertsScreen from './Alerts';
import LoginScreen from './Login';
import RegisterFirstScreen from './RegisterFirst';
import RegisterSecondScreen from './RegisterSecond';
import SideMenu from './SideMenu';
import ErrorScreen from './Error';
import NeedHelpScreen from './NeedHelp';
import SelectCardScreen from './SelectCard';
import Notification from './Notification';

import LanguageSelect from '../components/LanguageSelect';
import FlagIcon from '../components/FlagIcon';
import Alerts from '../components/Alerts';

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
  Navigation.registerComponent(
    'mdp.DigitalCardScreen.SelectCardScreen',
    () => SelectCardScreen,
    store,
    Provider,
  );
  Navigation.registerComponent('mdp.AlertsScreen.Alert', () => Alerts, store, Provider);
  Navigation.registerComponent('mdp.ErrorScreen', () => ErrorScreen, store, Provider);
  Navigation.registerComponent('mdp.LanguageSelect', () => LanguageSelect, store, Provider);
  Navigation.registerComponent('mdp.FlagIcon', () => FlagIcon);
  Navigation.registerComponent('mdp.Notification', () => Notification);
}
