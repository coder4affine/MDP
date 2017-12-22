/* eslint-disable import/prefer-default-export */
import { Navigation } from 'react-native-navigation';

import PinScreen from './PinScreen';
import LanguageSelect from '../components/LanguageSelect';

// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
  Navigation.registerComponent('mdp.PinScreen', () => PinScreen, store, Provider);
  Navigation.registerComponent('mdp.LanguageSelect', () => LanguageSelect, store, Provider);
}
