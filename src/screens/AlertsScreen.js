import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, StyleSheet, FlatList, TouchableHighlight } from 'react-native';

import moment from 'moment';
import HelpButton from '../components/HelpButton';
import LocaleWrapper from '../HOC/LocaleWrapper';
import actions from '../actions';

import I18n from '../i18n';

import Alert from '../components/Alerts';

export class Alerts extends Component {
  static propTypes = {
    alerts: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    isConnected: PropTypes.bool.isRequired,
    navigator: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {};

    this.getAlerts = this.getAlerts.bind(this);
    this.setTabButton = this.setTabButton.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.openAlert = this.openAlert.bind(this);
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.alerts.data) {
      const badgeCount = nextProps.alerts.data.filter(item => item.Status !== 'R');
      this.props.navigator.setTabBadge({
        tabIndex: 4,
        badge: badgeCount.length,
      });
    }
    if (this.props.locale !== nextProps.locale) {
      this.setTabButton();
      this.setTitle();
    }
  };

  setTabButton() {
    this.props.navigator.setTabButton({
      label: I18n.t('hdrAlerts'),
    });
  }

  setTitle() {
    this.props.navigator.setTitle({
      title: I18n.t('hdrAlerts'),
    });
  }

  getAlerts() {
    if (!this.props.isConnected) {
      const { user, updatedOn } = this.props.auth;
      if (user) {
        if (moment().isBefore(moment(updatedOn).add(user.expires_in, 'seconds'))) {
          this.props.actions.getAlerts(`${user.token_type} ${user.access_token}`);
        } else {
          this.props.actions
            .refreshToken({ refresh_token: user.refresh_token, grant_type: 'refresh_token' })
            .then(() => {
              this.props.actions.getAlerts(`${this.props.auth.user.token_type} ${this.props.auth.user.access_token}`);
            });
        }
      }
    } else {
      this.props.navigator.showInAppNotification({
        screen: 'mdp.Notification',
      });
    }
  }

  openAlert(item) {
    this.props.navigator.push({
      screen: 'mdp.AlertsScreen.Alert',
      title: 'Alert',
      passProps: {
        item,
      },
      navigatorStyle: {
        screenBackgroundColor: 'white',
        tabBarHidden: true,
      },
    });
  }

  render() {
    const { alerts, auth } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {alerts.data && (
          <FlatList
            data={alerts.data}
            renderItem={({ item }) => (
              <TouchableHighlight underlayColor="#D3D3D3" onPress={() => this.openAlert(item)}>
                <View>
                  <Alert item={item} />
                </View>
              </TouchableHighlight>
            )}
            keyExtractor={item => item.MemberAlertKey}
            ItemSeparatorComponent={() => (
              <View style={{ borderTopWidth: StyleSheet.hairlineWidth }} />
            )}
            refreshing={alerts.loading || auth.loading}
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
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LocaleWrapper(Alerts));
