import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableHighlight, Text, ActivityIndicator } from 'react-native';
import commonStyle from '../commonStyle';

const Button = ({
  text, disabled, submitting, ...buttonProps
}) => (
  <TouchableHighlight underlayColor="#BABABA" {...buttonProps}>
    <View
      style={{
        backgroundColor: disabled ? '#BABABA' : 'green',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
      }}
    >
      {submitting ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <Text style={[commonStyle.text, { color: 'white' }]}>{text}</Text>
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
