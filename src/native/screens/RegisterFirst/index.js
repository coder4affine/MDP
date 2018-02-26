import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Platform, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SubmissionError, reset } from 'redux-form';
import moment from 'moment';

import RegisterFirstForm from '../../components/RegisterFirstForm';
import LocaleWrapper from '../../hoc/wrapper';
import actions from '../../../actions';

class RegisterFirst extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.checkUserExist = this.checkUserExist.bind(this);
    this.redirectPush = this.redirectPush.bind(this);
  }

  redirectPush(registerData) {
    this.props.resetForm();
    const navigatorButtons =
      Platform.OS === 'ios'
        ? {
          leftButtons: [{ title: 'Cancel', id: 'closeModal' }],
        }
        : {};
    this.props.navigator.showModal({
      screen: 'mdp.RegisterSecondScreen',
      title: 'Register',
      passProps: {
        registerData,
      },
      navigatorStyle: {
        screenBackgroundColor: 'white',
      },
      navigatorButtons,
    });
  }

  checkUserExist(formData) {
    if (this.props.isConnected) {
      const newData = {
        ...formData,
        BirthDate: moment(formData.BirthDate, 'L').format('L'),
        SSN: formData.SSN || '',
      };
      return this.props.actions
        .checkUserExist(newData)
        .then(() => {
          const { data, error } = this.props.checkUser;
          if (data) {
            const userName = data || '';
            this.redirectPush({ ...newData, UserName: userName, ConfirmUserName: userName });
          }
          if (error) {
            this.props.resetForm();
            throw new SubmissionError({
              _error: 'User Not Exist!',
            });
          }
        })
        .catch(() => {
          const { error } = this.props.checkUser;
          this.props.resetForm();
          if (error) {
            throw new SubmissionError({
              _error: 'Login failed!',
            });
          }
        });
    }
    throw new SubmissionError({
      _error: 'No Internet Connection',
    });
  }

  render() {
    const { isConnected } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {!isConnected && (
          <View
            style={{
              backgroundColor: 'rgba(231,76,60,1)',
              padding: 4,
            }}
          >
            <Text style={{ textAlign: 'center' }}>No Internet Connection</Text>
          </View>
        )}
        <ScrollView
          style={{
            flex: 1,
          }}
        >
          <RegisterFirstForm onSubmit={this.checkUserExist} />
        </ScrollView>
      </View>
    );
  }
}

RegisterFirst.propTypes = {
  actions: PropTypes.object.isRequired,
  checkUser: PropTypes.object.isRequired,
  resetForm: PropTypes.func.isRequired,
  navigator: PropTypes.object.isRequired,
  isConnected: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  checkUser: state.checkUser,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
  resetForm: () => {
    dispatch(reset('signIn'));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LocaleWrapper(RegisterFirst));
