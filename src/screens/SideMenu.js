import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import I18n from '../i18n';

const { width } = Dimensions.get('window');

class SideMenu extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
        }}
      >
        <Text>hello</Text>
      </View>
    );
  }
}

export default connect()(SideMenu);
