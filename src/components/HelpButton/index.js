import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from 'react-native';
import { Navigation } from 'react-native-navigation';

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

export default class HelpButton extends Component {
  constructor(props) {
    super(props);

    this.openHelp = this.openHelp.bind(this);
  }

  openHelp() {
    Navigation.showModal({
      screen: 'mdp.NeedHelpScreen',
      title: 'Need Help',
      navigatorStyle: {
        screenBackgroundColor: 'white',
      },
      navigatorButtons: {
        leftButtons: [{ title: 'Cancel', id: 'closeModal' }],
      },
    });
  }

  render() {
    return (
      <ActionButton
        buttonColor="rgba(231,76,60,1)"
        icon={<Icon name="md-chatboxes" style={styles.actionButtonIcon} />}
        onPress={this.openHelp}
      />
    );
  }
}
