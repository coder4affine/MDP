import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { Navigation } from 'react-native-navigation';

const Loader = () => (
  <View
    style={{
      width: 100,
      height: 100,
      backgroundColor: '#ffffff',
      borderRadius: 5,
      padding: 16,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <ActivityIndicator size="large" color="black" />
    <Text>Loading...</Text>
  </View>
);

Navigation.registerComponent('mdp.Loader', () => Loader);

export default (Comp: any) => ({ spinner, children, ...props }: Object) => {
  if (spinner) {
    Navigation.showLightBox({
      screen: 'mdp.Loader',
      style: {
        backgroundBlur: 'none',
      },
    });
  } else {
    Navigation.dismissLightBox();
  }

  return <Comp {...props}>{children}</Comp>;
};
