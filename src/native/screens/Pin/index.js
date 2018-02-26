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
  Platform,
} from 'react-native';

import { MAIN, LOGIN } from '../../../constants/actionTypes';
import actions from '../../../actions';
import PinText from '../../components/PinText';

import logo from '../../../images/appLogo.png';
import styles from './styles';
import commonStyle from '../../commonStyle';

import wrapper from '../../hoc/wrapper';

const window = Dimensions.get('window');
export const VIEW_HEIGHT = window.width / 2;
export const VIEW_HEIGHT_SMALL = window.width / 4;

export const IMAGE_HEIGHT = 120;
export const IMAGE_HEIGHT_SMALL = 60;

export const TITLE_SIZE = 26;
export const TITLE_SIZE_SMALL = 18;

class Pin extends Component<{}> {
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
      error: '',
    };

    this.viewHeight = new Animated.Value(VIEW_HEIGHT);
    this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
    this.titleHeight = new Animated.Value(TITLE_SIZE);
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
      this.setState({ error: 'Pin is invalid' });
    }
  }

  keyboardWillShow = (event) => {
    Animated.parallel([
      Animated.timing(this.viewHeight, {
        duration: event ? event.duration : 250,
        toValue: VIEW_HEIGHT_SMALL,
      }),

      Animated.timing(this.imageHeight, {
        duration: event ? event.duration : 250,
        toValue: IMAGE_HEIGHT_SMALL,
      }),

      Animated.timing(this.titleHeight, {
        duration: event ? event.duration : 250,
        toValue: TITLE_SIZE_SMALL,
      }),
    ]).start();
  };

  keyboardWillHide = (event) => {
    Animated.parallel([
      Animated.timing(this.viewHeight, {
        duration: event ? event.duration : 250,
        toValue: VIEW_HEIGHT,
      }),
      Animated.timing(this.imageHeight, {
        duration: event ? event.duration : 250,
        toValue: IMAGE_HEIGHT,
      }),
      Animated.timing(this.titleHeight, {
        duration: event ? event.duration : 250,
        toValue: TITLE_SIZE,
      }),
    ]).start();
  };

  render() {
    const {
      pin, pinFocus1, pinFocus2, error,
    } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Animated.View style={[styles.header, { height: this.viewHeight, elevation: 4 }]}>
          <Animated.Image
            source={logo}
            style={(styles.logo, { height: this.imageHeight, width: this.imageHeight })}
          />
          <Animated.Text style={[commonStyle.header, { fontSize: this.titleHeight }]}>
            Mobile Digital Platform
          </Animated.Text>
        </Animated.View>
        <View>
          <Text style={commonStyle.pageTitle}>Select Pin</Text>
          {!!error && <Text style={[commonStyle.subTitle, commonStyle.errorColor]}>{error}</Text>}
        </View>
        <View style={{ justifyContent: 'space-around', height: this.props.pin ? 80 : 165 }}>
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
    dispatch(actions.changeAppRoot(root));
  },
  setPin: (pin) => {
    dispatch(actions.setPin(pin));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(wrapper(Pin));
