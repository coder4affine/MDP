import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, FlatList, StyleSheet } from 'react-native';
import moment from 'moment';
import MyBenefits from '../components/MyBenefits';
import HelpButton from '../components/HelpButton';

import LocaleWrapper from '../HOC/LocaleWrapper';
import actions from '../actions';

export class MyBenefitScreen extends Component {
  static propTypes = {
    digitalCard: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
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
    const { user, updatedOn } = this.props.auth;
    if (user) {
      if (moment().isBefore(moment(updatedOn).add(user.expires_in, 'seconds'))) {
        this.props.actions.getGroupMember(`${user.token_type} ${user.access_token}`).then(() => {
          this.setState({ loading: false });
        });
      } else {
        this.props.actions
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
    const { data } = this.props.digitalCard;
    const { loading } = this.state;
    // const { locale } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={data}
          renderItem={({ item, index }) => <MyBenefits item={item} expanded={index === 0} />}
          ItemSeparatorComponent={() => (
            <View style={{ borderTopWidth: StyleSheet.hairlineWidth }} />
          )}
          keyExtractor={item => item.MemberID}
          refreshing={loading}
          onRefresh={this.getCard}
        />
        <HelpButton />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  digitalCard: state.digitalCard,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LocaleWrapper(MyBenefitScreen));
