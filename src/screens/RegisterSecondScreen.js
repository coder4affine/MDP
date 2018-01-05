import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SubmissionError } from 'redux-form';

import { MAIN } from '../constants/actionTypes';

import RegisterSecondForm from '../components/RegisterSecondForm';
import LocaleWrapper from '../HOC/LocaleWrapper';
import actions from '../actions';

class RegisterSecond extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.register = this.register.bind(this);
  }

  register(formData) {
    if (this.props.isConnected) {
      return this.props.actions
        .register(formData)
        .then(() => {
          const { user, error } = this.props.auth;
          if (user) {
            this.props.changeAppRoot(MAIN);
          }
          if (error) {
            throw new SubmissionError({
              _error: 'Login failed!',
            });
          }
          if (this.props.register.error) {
            throw new SubmissionError({
              _error: 'Login failed!',
            });
          }
        })
        .catch(() => {
          const { error } = this.props.register;
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
    const { registerData } = this.props;
    return (
      <ScrollView
        style={{
          flex: 1,
        }}
      >
        {registerData && (
          <RegisterSecondForm initialValues={registerData} onSubmit={this.register} />
        )}
      </ScrollView>
    );
  }
}

RegisterSecond.propTypes = {
  actions: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  registerData: PropTypes.object.isRequired,
  changeAppRoot: PropTypes.func.isRequired,
  register: PropTypes.object.isRequired,
  isConnected: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  register: state.register,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
  changeAppRoot: (root) => {
    dispatch(actions.changeAppRoot(root));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LocaleWrapper(RegisterSecond));
