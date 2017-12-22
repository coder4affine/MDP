// @flow
// import { I18nManager } from 'react-native';
import I18n from 'react-native-i18n';
import en from './locales/en';
import es from './locales/es';

/*
    We are very likely not to have all the languages translated,
    so fallback to default locale in case we don't
 */
I18n.fallbacks = true;

I18n.translations = {
  en,
  es,
};

I18n.defaultLocale = 'en';

export default I18n;
