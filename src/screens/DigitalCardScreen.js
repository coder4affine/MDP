import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, Alert } from 'react-native';

import LocaleWrapper from '../HOC/LocaleWrapper';
import I18n from '../i18n';
import * as digitalCardAction from '../actions/digitalCardAction';

import RegisterSecondForm from '../components/RegisterSecondForm';

export class DigitalCard extends Component {
  static propTypes = {
    digitalCard: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {};
    this.getCard = this.getCard.bind(this);
  }

  componentWillMount() {
    this.getCard();
  }

  getCard() {
    const { user } = this.props.auth;
    this.props.actions.loadDigitalCard(user);
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
});

export default connect(mapStateToProps, mapDispatchToProps)(LocaleWrapper(DigitalCard));
