import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableHighlight, Text, ActivityIndicator } from 'react-native';
import commonStyle from '../../commonStyle';
import styles from './styles';

const Button = ({
  text, disabled, submitting, ...buttonProps
}) => (
  <TouchableHighlight underlayColor="#BABABA" {...buttonProps}>
    <View style={[styles.button, disabled ? styles.disabled : {}]}>
      {submitting ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <Text style={[commonStyle.label, styles.text]}>{text}</Text>
      )}
    </View>
  </TouchableHighlight>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  submitting: PropTypes.bool,
};

Button.defaultProps = {
  disabled: false,
  submitting: false,
};

export default Button;
