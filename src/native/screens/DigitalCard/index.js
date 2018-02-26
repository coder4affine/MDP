import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ScrollView, RefreshControl, View, Text } from 'react-native';
import moment from 'moment';
import Card from '../../components/DigitalCard';
import ElevatedView from '../../components/ElevatedView';
import Button from '../../inputControls/Button';
import HelpButton from '../../components/HelpButton';

import I18n from '../../i18n';

import LocaleWrapper from '../../hoc/wrapper';
import actions from '../../../actions';
import { CARD_CHANGED } from '../../../constants/actionTypes';

function cardChange(card) {
  return { type: CARD_CHANGED, payload: card };
}

export class DigitalCard extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
    navigator: PropTypes.object.isRequired,
    cardChange: PropTypes.func.isRequired,
    digitalCard: PropTypes.object.isRequired,
    isConnected: PropTypes.bool.isRequired,
    card: PropTypes.object,
    user: PropTypes.object,
  };

  static defaultProps = {
    card: null,
    user: null,
  };

  constructor(props) {
    super(props);

    this.getCard = this.getCard.bind(this);
    this.selectCard = this.selectCard.bind(this);
    this.showMyCard = this.showMyCard.bind(this);
    this.setTabButton = this.setTabButton.bind(this);
    this.setTitle = this.setTitle.bind(this);
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.locale !== nextProps.locale) {
      this.setTabButton();
      this.setTitle();
    }
  };

  setTabButton() {
    this.props.navigator.setTabButton({
      label: I18n.t('hdrDigitalCard'),
    });
  }

  setTitle() {
    this.props.navigator.setTitle({
      title: I18n.t('hdrDigitalCard'),
    });
  }

  getCard() {
    if (this.props.isConnected) {
      this.getToken().then(token => this.props.actions.getGroupMember(token));
    } else {
      this.props.navigator.showInAppNotification({
        screen: 'mdp.Notification',
      });
    }
  }

  getToken() {
    return new Promise((resolve, reject) => {
      const { user, updatedOn } = this.props.auth;
      if (moment().isBefore(moment(updatedOn).add(user.expires_in - 10, 'seconds'))) {
        resolve(`${user.token_type} ${user.access_token}`);
      } else {
        this.props.actions
          .refreshToken({ refresh_token: user.refresh_token, grant_type: 'refresh_token' })
          .then(() => {
            resolve(`${this.props.auth.user.token_type} ${this.props.auth.user.access_token}`);
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  }

  selectCard() {
    this.props.navigator.push({
      screen: 'mdp.DigitalCardScreen.SelectCardScreen',
      title: 'Select Card',
      navigatorStyle: {
        screenBackgroundColor: 'white',
        tabBarHidden: true,
      },
    });
  }

  showMyCard() {
    this.props.cardChange(this.props.user);
  }

  render() {
    const {
      locale, card, user, digitalCard, auth,
    } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={digitalCard.loading || auth.loading}
              onRefresh={this.getCard}
            />
          }
        >
          {card &&
            locale && (
              <View style={{ alignItems: 'center', margin: 10 }}>
                <Text>{`${card.FirstName} ${card.LastName}'s Card`}</Text>
                <Card locale={locale} groupMember={card} />
                <View style={{ marginVertical: 10 }}>
                  <ElevatedView elevation={2} style={{ width: 288, borderRadius: 4 }}>
                    <Button text="Family Member Card" onPress={this.selectCard} />
                  </ElevatedView>
                </View>
                {user &&
                  card.MemberID !== user.MemberID && (
                    <View>
                      <ElevatedView elevation={2} style={{ width: 288, borderRadius: 4 }}>
                        <Button text="My Card" onPress={this.showMyCard} />
                      </ElevatedView>
                    </View>
                  )}
                {user && (
                  <View style={{ alignItems: 'center' }}>
                    <Text>Card last downloaded on</Text>
                    <Text>{moment(user.cardDownLoadDate).format('LLLL')}</Text>
                  </View>
                )}
              </View>
            )}
        </ScrollView>
        <HelpButton />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user.user,
  digitalCard: state.digitalCard,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
  cardChange: (card) => {
    dispatch(cardChange(card));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LocaleWrapper(DigitalCard, 'digitalCard'));
