import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ScrollView, RefreshControl, View, Text } from 'react-native';
import moment from 'moment';
import Card from '../components/DigitalCard';
import ElevatedView from '../components/ElevatedView';
import Button from '../inputControls/button';
import HelpButton from '../components/HelpButton';

import LocaleWrapper from '../HOC/LocaleWrapper';
import * as digitalCardAction from '../actions/digitalCardAction';
import * as authAction from '../actions/authAction';
import { CARD_CHANGED } from '../constants/actionTypes';

function cardChange(card) {
  return { type: CARD_CHANGED, payload: card };
}

export class DigitalCard extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    authAction: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
    navigator: PropTypes.object.isRequired,
    cardChange: PropTypes.func.isRequired,
    card: PropTypes.object,
    user: PropTypes.object,
  };

  static defaultProps = {
    card: null,
    user: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
    this.getCard = this.getCard.bind(this);
    this.selectCard = this.selectCard.bind(this);
    this.showMyCard = this.showMyCard.bind(this);
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

  selectCard() {
    this.props.navigator.push({
      screen: 'mdp.SelectCardScreen',
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
    const { loading } = this.state;
    const { locale, card, user } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={this.getCard} />}
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
                  <View>
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
  locale: state.locale.locale,
  card: state.card.card,
  user: state.user.user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(digitalCardAction, dispatch),
  authAction: bindActionCreators(authAction, dispatch),
  cardChange: (card) => {
    dispatch(cardChange(card));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LocaleWrapper(DigitalCard, 'digitalCard'));
