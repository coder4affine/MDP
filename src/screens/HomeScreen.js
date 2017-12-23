import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export class Home extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    this.props.navigator.setTabBadge({
      tabIndex: 3,
      badge: 17,
    });
  };

  render() {
    return (
      <View>
        <Text>Home</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
