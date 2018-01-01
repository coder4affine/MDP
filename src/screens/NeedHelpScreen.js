import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import LocaleWrapper from '../HOC/LocaleWrapper';
// import styles from '../commonStyle';

// import config from '../config';

const window = Dimensions.get('window');
export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width / 7;

const styles = StyleSheet.create({
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 4,
    borderColor: 'gray',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

const { width } = Dimensions.get('window');

const chat = [
  {
    id: 0,
    text: 'hello0',
    date: moment().toDate(),
    user: 'me',
  },
  {
    id: 1,
    text: 'hello1',
    date: moment().toDate(),
    user: 'chat',
  },
  {
    id: 2,
    text: 'hello2',
    date: moment().toDate(),
    user: 'me',
  },
];

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
          <ScrollView style={{ flex: 1, flexDirection: 'column-reverse' }}>
            {chat.map(item => (
              <View
                key={item.id}
                style={{
                  padding: 8,
                  borderRadius: 4,
                  marginBottom: 4,
                  maxWidth: width - 50,
                  marginHorizontal: 16,
                  borderWidth: StyleSheet.hairlineWidth,
                  alignSelf: item.user === 'me' ? 'flex-end' : 'flex-start',
                }}
              >
                <Text>{item.text}</Text>
                <Text style={{ fontSize: 10, color: '#A8A8A8', alignSelf: 'flex-end' }}>
                  {moment(item.date).format('LT')}
                </Text>
              </View>
            ))}
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
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
              <Icons name="md-send" size={26} />
            </View>
          </KeyboardAvoidingView>
        </View>
      );
    }
});
