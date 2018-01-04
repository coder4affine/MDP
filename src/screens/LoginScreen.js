import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  KeyboardAvoidingView,
  Animated,
  Keyboard,
  Dimensions,
  TouchableHighlight,
  Text,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SubmissionError, reset } from 'redux-form';
import { MAIN } from '../constants/actionTypes';
import LoginForm from '../components/LoginForm';
import LocaleWrapper from '../HOC/LocaleWrapper';

import actions from '../actions';

import logo from '../images/logo.png';
import styles from '../commonStyle';

const window = Dimensions.get('window');
export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width / 7;

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
    this.redirectPush = this.redirectPush.bind(this);
    this.login = this.login.bind(this);
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

  redirectPush() {
    this.props.resetForm();
    const navigatorButtons =
      Platform.OS === 'ios'
        ? {
          leftButtons: [{ title: 'Cancel', id: 'closeModal' }],
        }
        : {};
    this.props.navigator.showModal({
      screen: 'mdp.RegisterFirstScreen',
      title: 'Register',
      navigatorStyle: {
        screenBackgroundColor: 'white',
      },
      navigatorButtons,
    });
  }

  login(data) {
    return this.props.actions
      .login(data)
      .then(() => {
        const { user, error } = this.props.auth;
        if (user) {
          this.props.changeAppRoot(MAIN);
        }
        if (error) {
          this.props.resetForm();
          throw new SubmissionError({
            _error: 'Login failed!',
          });
        }
      })
      .catch(() => {
        const { error } = this.props.auth;
        this.props.resetForm();
        if (error) {
          throw new SubmissionError({
            _error: 'Login failed!',
          });
        }
      });
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Animated.Image source={logo} style={[styles.logo, { height: this.imageHeight }]} />
        <LoginForm onSubmit={this.login} />
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 16 }}
        >
          <TouchableHighlight underlayColor="#D3D3D3" onPress={this.redirectPush}>
            <Text style={styles.headerTxt}>Forgot Password</Text>
          </TouchableHighlight>
          <TouchableHighlight underlayColor="#D3D3D3" onPress={this.redirectPush}>
            <Text style={styles.headerTxt}>Register</Text>
          </TouchableHighlight>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

Login.propTypes = {
  actions: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  changeAppRoot: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  navigator: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
  changeAppRoot: (root) => {
    dispatch(actions.changeAppRoot(root));
  },
  resetForm: () => {
    dispatch(reset('signIn'));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LocaleWrapper(Login));
