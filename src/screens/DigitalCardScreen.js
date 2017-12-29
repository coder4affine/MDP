import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, Alert } from 'react-native';
import moment from 'moment';

import LocaleWrapper from '../HOC/LocaleWrapper';
import I18n from '../i18n';
import * as digitalCardAction from '../actions/digitalCardAction';
import * as authAction from '../actions/authAction';

import RegisterSecondForm from '../components/RegisterSecondForm';

export class DigitalCard extends Component {
  static propTypes = {
    digitalCard: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    authAction: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
    this.getCard = this.getCard.bind(this);
  }

  componentWillMount() {
    this.getCard();
  }

  getCard() {
    this.setState({ loading: true });
    const { user } = this.props.auth;
    if (user) {
      if (moment().isBefore(user.expires)) {
        this.props.actions.getGroupMember(`${user.token_type} ${user.access_token}`).then(() => {
          this.setState({ loading: false });
        });
      } else {
        this.props.authAction
          .refreshToken({ refresh_token: user.refresh_token, grant_type: 'refresh_token' })
          .then(() =>
            this.props.actions.getGroupMember(`${this.props.auth.user.token_type} ${this.props.auth.user.access_token}`))
          .then(() => {
            this.setState({ loading: false });
          });
      }
    } else {
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <View>
        <RegisterSecondForm
          onSubmit={values => Alert.alert('Submitted!', JSON.stringify(values))}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  digitalCard: state.digitalCard,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(digitalCardAction, dispatch),
  authAction: bindActionCreators(authAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LocaleWrapper(DigitalCard));
