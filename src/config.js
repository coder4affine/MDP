import ENFlag from './images/countryFlags/en.png';
import ESFlag from './images/countryFlags/es.png';

export default {
  defaultLocale: 'en',
  locale: [
    {
      key: 'en',
      value: 'English',
      img: ENFlag,
    },
    {
      key: 'es',
      value: 'Spanish',
      img: ESFlag,
    },
  ],
  primaryColor: 'green',
  secondaryColor: '#ffffff',
  serviceApi: 'https://dev.mobiledigitalplatform.com:1024/',
  webURI: 'https://dev.mobiledigitalplatform.com/',
};
