import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, FlatList } from 'react-native';

import LocaleWrapper from '../HOC/LocaleWrapper';
import I18n from '../i18n';
import * as alertsAction from '../actions/alertsAction';

import Alerts from '../components/Alerts';

export class AlertsScreen extends Component {
  static propTypes = {
    alerts: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {};
    this.getAlerts = this.getAlerts.bind(this);
  }

  componentWillMount() {
    this.getAlerts();
  }

  componentWillReceiveProps = (nextProps) => {
    if (JSON.stringify(this.props.alerts.data) !== JSON.stringify(nextProps.alerts.data)) {
      const badgeCount = nextProps.alerts.data.filter(item => item.Status !== 'R');
      this.props.navigator.setTabBadge({
        tabIndex: 3,
        badge: badgeCount.length,
      });
    }
  };

  getAlerts() {
    const { user } = this.props.auth;
    this.props.actions.loadAlerts(user);
  }

  render() {
    const { data, loading } = this.props.alerts;
    const { locale } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {data && (
          <FlatList
            data={data}
            renderItem={({ item }) => <Alerts item={item} />}
            keyExtractor={item => item.MemberAlertKey}
            refreshing={loading}
            onRefresh={this.getAlerts}
          />
        )}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(LocaleWrapper(AlertsScreen));
