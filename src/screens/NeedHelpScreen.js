import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import LocaleWrapper from '../HOC/LocaleWrapper';

export default LocaleWrapper(class NeedHelpScreen extends Component {
    static propTypes = {};

    constructor(props) {
      super(props);

      this.state = {};
    }

    render() {
      return (
        <View>
          <Text>Need Help</Text>
        </View>
      );
    }
});
