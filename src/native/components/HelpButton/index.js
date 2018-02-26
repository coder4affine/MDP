import React from 'react';
// import PropTypes from 'prop-types';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet, Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

const openHelp = () => {
  const navigatorButtons =
    Platform.OS === 'ios'
      ? {
        leftButtons: [{ title: 'Cancel', id: 'closeModal' }],
      }
      : {};
  Navigation.showModal({
    screen: 'mdp.NeedHelpScreen',
    title: 'Need Help',
    navigatorStyle: {
      screenBackgroundColor: 'white',
    },
    navigatorButtons,
  });
};

export default () => (
  <ActionButton
    buttonColor="rgba(231,76,60,1)"
    renderIcon={() => <Icon name="md-chatboxes" style={styles.actionButtonIcon} />}
    onPress={() => openHelp()}
  />
);
