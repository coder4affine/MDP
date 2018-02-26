import React from 'react';
import PropTypes from 'prop-types';
import { Image, TouchableHighlight } from 'react-native';
import { Navigation } from 'react-native-navigation';

import ENIcon from '../../../images/countryFlags/en.png';
import ESIcon from '../../../images/countryFlags/es.png';

const FlagIcon = ({ locale }) => {
  const openLocaleSelect = () => {
    Navigation.showLightBox({
      screen: 'mdp.LanguageSelect',
      style: {
        backgroundBlur: 'dark',
      },
      adjustSoftInput: 'resize',
    });
  };
  return (
    <TouchableHighlight underlayColor="#D3D3D3" onPress={openLocaleSelect}>
      <Image source={locale.toLowerCase() === 'en' ? ENIcon : ESIcon} />
    </TouchableHighlight>
  );
};

FlagIcon.propTypes = {
  locale: PropTypes.string,
};

FlagIcon.defaultProps = {
  locale: 'en',
};

export default FlagIcon;
