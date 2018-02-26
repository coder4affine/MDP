/* eslint-disable new-cap */
// import { PixelRatio } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// const navIconSize =
//   __DEV__ === false && Platform.OS === 'android' ? PixelRatio.getPixelSizeForLayoutSize(40) : 40;
const replaceSuffixPattern = /--(active|big|small|very-big)/g;
const icons = {
  'ios-home-outline': [30],
  'ios-home': [30],
  'ios-menu': [30],
  'md-menu': [30],
  'ios-card-outline': [30],
  'ios-card': [30],
  'ios-notifications-outline': [30],
  'ios-notifications': [30],
  'ios-paper-outline': [30],
  'ios-paper': [30],
  'ios-medkit': [30],
  'ios-medkit-outline': [30],
  'md-medkit': [30],
  'ios-share': [30],
  'md-share': [30],
};

const iconsMap = {};
const iconsLoaded = new Promise((resolve) => {
  Promise.all(Object.keys(icons).map(iconName =>
    // IconName--suffix--other-suffix is just the mapping name in iconsMap
    Ionicons.getImageSource(
      iconName.replace(replaceSuffixPattern, ''),
      icons[iconName][0],
      icons[iconName][1],
    ))).then((sources) => {
    Object.keys(icons).forEach((iconName, idx) => {
      iconsMap[iconName] = sources[idx];
    });

    // Call resolve (and we are done)
    resolve(true);
  });
});

export { iconsMap, iconsLoaded };
