import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Dimensions,
  TouchableHighlight,
  Platform,
} from 'react-native';
import TouchID from 'react-native-touch-id';

import { MAIN, LOGIN } from '../constants/actionTypes';
import { changeAppRoot } from '../actions/app';
import setPin from '../actions/pinActions';
import PinText from '../components/PinText';
import LocaleWrapper from '../HOC/LocaleWrapper';
import styles from '../commonStyle';

import I18n from '../i18n';

import logo from '../images/logo.png';

const window = Dimensions.get('window');
export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width / 7;

const optionalConfigObject = {
  title: 'Authentication Required',
  color: '#e00606',
};

export class PinScreen extends Component<{}> {
  static propTypes = {
    pin: PropTypes.string.isRequired,
    setPin: PropTypes.func.isRequired,
    changeAppRoot: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      pin: props.pin,
      pinFocus1: true,
      pinFocus2: false,
      touchID: false,
      error: '',
    };

    this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
    this.touchAuth = this.touchAuth.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    if (Platform.OS === 'ios') {
      this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
      this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    } else {
      this.keyboardDidShow = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow);
      this.keyboardDidHide = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide);
    }
    if (Platform.OS === 'ios') {
      TouchID.isSupported()
        .then(() => {
          this.setState({ touchID: true });
          this.touchAuth();
        })
        .catch(() => {
          console.log('Touch ID not supported');
        });
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'ios') {
      this.keyboardWillShowSub.remove();
      this.keyboardWillHideSub.remove();
    } else {
      this.keyboardDidShow.remove();
      this.keyboardDidHide.remove();
    }
  }

  onSubmit(isMatching, code) {
    this.setState({ pinFocus1: false, pinFocus2: false });
    if (isMatching) {
      this.props.setPin(code);
      if (this.props.auth.user) {
        this.props.changeAppRoot(MAIN);
      } else {
        this.props.changeAppRoot(LOGIN);
      }
    } else {
      this.setState({ error: 'Authantication Fail' });
    }
  }

  keyboardWillShow = (event) => {
    Animated.timing(this.imageHeight, {
      duration: event ? event.duration : 250,
      toValue: IMAGE_HEIGHT_SMALL,
    }).start();
  };

  keyboardWillHide = (event) => {
    Animated.timing(this.imageHeight, {
      duration: event ? event.duration : 250,
      toValue: IMAGE_HEIGHT,
    }).start();
  };

  touchAuth() {
    TouchID.authenticate('to demo this react-native component', optionalConfigObject)
      .then(() => {
        this.props.changeAppRoot('after-pin');
      })
      .catch(() => {
        this.setState({ error: 'Authentication Failed' });
      });
  }

  render() {
    const {
      pin, pinFocus1, pinFocus2, touchID, error,
    } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Animated.Image source={logo} style={[styles.logo, { height: this.imageHeight }]} />
        <Text>{I18n.t('selectPin')}</Text>
        {!!error && <Text>{error}</Text>}
        <View style={{ justifyContent: 'space-around', height: 200 }}>
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
            onFulfill={this.onSubmit}
            onFistBack={() => this.setState({ pinFocus1: true, pinFocus2: false })}
          />

          {touchID && (
            <TouchableHighlight onPress={this.touchAuth} underlayColor="#D3D3D3">
              <View
                style={{
                  backgroundColor: 'green',
                  borderRadius: 4,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 40,
                }}
              >
                <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
                  Unlock with Touch ID
                </Text>
              </View>
            </TouchableHighlight>
          )}
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state) => {
  const { pin } = state.pin;
  return {
    pin,
    auth: state.auth,
  };
};

const mapDispatchToProps = dispatch => ({
  changeAppRoot: (root) => {
    dispatch(changeAppRoot(root));
  },
  setPin: (pin) => {
    dispatch(setPin(pin));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LocaleWrapper(PinScreen));
