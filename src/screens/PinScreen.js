import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Dimensions,
  AlertIOS,
} from 'react-native';
import changeLocale from '../actions/languageAction';
import PinText from '../components/PinText';
import LocaleWrapper from '../HOC/LocaleWrapper';
import TouchID from 'react-native-touch-id';

import I18n from '../i18n';

import logo from '../images/logo.png';

const window = Dimensions.get('window');
export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width / 7;

const optionalConfigObject = {
  title: 'Authentication Required',
  color: '#e00606',
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4c69a5',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 5,
    // paddingVertical: 5,
    // paddingHorizontal: 15,
    width: window.width - 30,
  },
  logo: {
    height: IMAGE_HEIGHT,
    resizeMode: 'contain',
    marginBottom: 20,
    padding: 10,
    marginTop: 20,
  },
  register: {
    marginBottom: 20,
    width: window.width - 100,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: '#ffae',
  },
});

export class PinScreen extends Component<{}> {
  static propTypes = {
    pin: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      pin: props.pin,
      pinFocus1: true,
      pinFocus2: false,
    };

    this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
  }

  componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    TouchID.isSupported()
      .then((biometryType) => {
        // Success code
        TouchID.authenticate('to demo this react-native component', optionalConfigObject)
          .then((success) => {
            AlertIOS.alert('Authenticated Successfully');
          })
          .catch((error) => {
            AlertIOS.alert('Authentication Failed');
          });

        if (biometryType === 'FaceID') {
          console.log('FaceID is supported.');
        } else {
          console.log('TouchID is supported.');
        }
      })
      .catch((error) => {
        // Failure code
        console.log(`error ${error}`);
      });
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardWillShow = (event) => {
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: IMAGE_HEIGHT_SMALL,
    }).start();
  };

  keyboardWillHide = (event) => {
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: IMAGE_HEIGHT,
    }).start();
  };

  render() {
    const { pin, pinFocus1, pinFocus2 } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Animated.Image source={logo} style={[styles.logo, { height: this.imageHeight }]} />
        <Text>{I18n.t('selectPin')}</Text>
        <View style={{ justifyContent: 'space-around', height: 100 }}>
          {!this.props.pin && (
            <PinText
              codeLength={4}
              autoFocus={pinFocus1}
              onFulfill={data => this.setState({ pin: data, pinFocus1: false, pinFocus2: true })}
            />
          )}

          <PinText
            codeLength={4}
            autoFocus={pinFocus2}
            compareWithCode={pin}
            onFulfill={data => this.setState({ pinFocus1: false, pinFocus2: false })}
            onFistBack={() => this.setState({ pinFocus1: true, pinFocus2: false })}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state) => {
  const { loading, pin, error } = state.pin;
  return {
    pin,
    loading,
    error,
  };
};

const mapDispatchToProps = dispatch => ({
  changeLocale: (locale) => {
    dispatch(changeLocale(locale));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LocaleWrapper(PinScreen));
