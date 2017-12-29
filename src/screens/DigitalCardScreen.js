import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, ImageBackground, Share } from 'react-native';
import moment from 'moment';
import Barcode from 'react-native-barcode-builder';

import LocaleWrapper from '../HOC/LocaleWrapper';
import I18n from '../i18n';
import * as digitalCardAction from '../actions/digitalCardAction';
import * as authAction from '../actions/authAction';

import CardFront from '../images/oklahoma/CardFront_en_US.png';
import CardBack from '../images/oklahoma/CardBack_en_US.png';

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
    this.openShare = this.openShare.bind(this);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentWillMount() {
    this.getCard();
  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'share') {
        this.openShare();
      }
    }
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

  openShare() {
    Share.share(
      {
        message: "BAM: we're helping your business with awesome React Native apps",
        url: 'http://bam.tech',
        title: 'Wow, did you see that?',
      },
      {
        dialogTitle: 'Share BAM goodness',
      },
    );
  }

  render() {
    return (
      <View>
        <View style={{ alignItems: 'center' }}>
          <ImageBackground style={{ width: 288, height: 186 }} source={CardFront}>
            <Text
              style={{
                position: 'absolute',
                top: 111,
                left: 50,
                backgroundColor: '#ECF4F9',
              }}
            >
              Vijaya Gaddam
            </Text>
            <Text
              style={{
                position: 'absolute',
                top: 136,
                left: 64,
                backgroundColor: '#ECF4F9',
              }}
            >
              7022962246
            </Text>
            <Text
              style={{
                position: 'absolute',
                top: 163,
                left: 55,
                backgroundColor: '#ECF4F9',
              }}
            >
              11/13/17
            </Text>
          </ImageBackground>
        </View>
        <View style={{ alignItems: 'center' }}>
          <ImageBackground style={{ width: 288, height: 186 }} source={CardBack}>
            <View style={{ position: 'absolute', top: 12, left: 60 }}>
              <Barcode height={30} width={1.5} value="7022962246" format="CODE128" />
            </View>
          </ImageBackground>
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(LocaleWrapper(DigitalCard, 'digitalCard'));
