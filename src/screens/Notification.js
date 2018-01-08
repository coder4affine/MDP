import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: '#ff505c',
    padding: 16,
    margin: 10,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
  },
  content: {
    textAlign: 'center',
    marginTop: 10,
  },
});

const Notification = () => (
  <View style={styles.container}>
    <Text style={styles.title}>In-App Notification</Text>
    <Text style={styles.content}>You have 10 unread notifications!</Text>
  </View>
);

export default Notification;
