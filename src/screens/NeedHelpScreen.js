import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import LocaleWrapper from '../HOC/LocaleWrapper';
import styles from '../commonStyle';

export default LocaleWrapper(class NeedHelpScreen extends Component {
    static propTypes = {};

    constructor(props) {
      super(props);

      this.state = {
        height: 40,
        value: '',
      };
    }

    render() {
      const { value } = this.state;
      const { OS } = Platform;
      return (
        <View style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }}>
            <View>
              <Text>Content</Text>
            </View>
          </ScrollView>
          <KeyboardAvoidingView
            style={{
              flexDirection: 'row',
              borderTopWidth: StyleSheet.hairlineWidth,
              alignItems: 'flex-end',
            }}
            behavior={OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={OS === 'ios' ? 64 : 0}
          >
            <View style={{ flex: 1, padding: 10 }}>
              <TextInput
                placeholder="Your Placeholder"
                onChangeText={txt => this.setState({ value: txt })}
                style={[styles.input]}
                editable
                multiline
                autoGrow
                value={value}
                maxHeight={200}
                returnKeyType="send"
              />
            </View>
            <View style={{ paddingVertical: OS === 'ios' ? 10 : 22, paddingHorizontal: 10 }}>
              <Icons name="md-send" size={26} />
            </View>
          </KeyboardAvoidingView>
        </View>
      );
    }
});
