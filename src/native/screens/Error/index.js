import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

export default class ErrorScreen extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View>
        <Text>Error Screen</Text>
      </View>
    );
  }
}
