import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, StyleSheet, FlatList } from 'react-native';
import moment from 'moment';
import HelpButton from '../components/HelpButton';
import LocaleWrapper from '../HOC/LocaleWrapper';
// import I18n from '../i18n';
import * as alertsAction from '../actions/alertsAction';
import * as authAction from '../actions/authAction';

import Alert from '../components/Alerts';

export class Alerts extends Component {
  static propTypes = {
    alerts: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    authAction: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
    this.getAlerts = this.getAlerts.bind(this);
  }

  componentWillMount() {
    this.getAlerts();
  }

  componentWillReceiveProps = (nextProps) => {
    if (
      nextProps.alerts.data &&
      JSON.stringify(this.props.alerts.data) !== JSON.stringify(nextProps.alerts.data)
    ) {
      const badgeCount = nextProps.alerts.data.filter(item => item.Status !== 'R');
      this.props.navigator.setTabBadge({
        tabIndex: 4,
        badge: badgeCount.length,
      });
    }
  };

  getAlerts() {
    this.setState({ loading: true });
    const { user } = this.props.auth;
    if (user) {
      if (moment().isBefore(user.expires)) {
        this.props.actions.getAlerts(`${user.token_type} ${user.access_token}`).then(() => {
          this.setState({ loading: false });
        });
      } else {
        this.props.authAction
          .refreshToken({ refresh_token: user.refresh_token, grant_type: 'refresh_token' })
          .then(() =>
            this.props.actions.getAlerts(`${this.props.auth.user.token_type} ${this.props.auth.user.access_token}`))
          .then(() => {
            this.setState({ loading: false });
          });
      }
    } else {
      this.setState({ loading: false });
    }
  }

  render() {
    const { data } = this.props.alerts;
    const { loading } = this.state;
    return (
      <View style={{ flex: 1 }}>
        {data && (
          <FlatList
            data={data}
            renderItem={({ item }) => <Alert item={item} />}
            keyExtractor={item => item.MemberAlertKey}
            ItemSeparatorComponent={() => (
              <View style={{ borderTopWidth: StyleSheet.hairlineWidth }} />
            )}
            refreshing={loading}
            onRefresh={this.getAlerts}
          />
        )}
        <HelpButton />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  alerts: state.alerts,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(alertsAction, dispatch),
  authAction: bindActionCreators(authAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LocaleWrapper(Alerts));
