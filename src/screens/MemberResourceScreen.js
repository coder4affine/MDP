import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, FlatList } from 'react-native';
import moment from 'moment';

import HelpButton from '../components/HelpButton';
import LocaleWrapper from '../HOC/LocaleWrapper';
import I18n from '../i18n';
import actions from '../actions';

import MemberResource from '../components/MemberResource';

export class MemberResources extends Component {
  static propTypes = {
    memberResource: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    isConnected: PropTypes.bool.isRequired,
    navigator: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.getMemberResource = this.getMemberResource.bind(this);
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
      label: I18n.t('hdrMemberResource'),
    });
  }

  setTitle() {
    this.props.navigator.setTitle({
      title: I18n.t('hdrMemberResource'),
    });
  }

  getMemberResource() {
    if (this.props.isConnected) {
      this.getToken().then(token => this.props.actions.getMemberResource(token));
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

  render() {
    const { memberResource, auth } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {memberResource.data && (
          <FlatList
            data={memberResource.data}
            renderItem={({ item }) => <MemberResource item={item} />}
            keyExtractor={item => item.SectionID}
            refreshing={memberResource.loading || auth.loading}
            onRefresh={this.getMemberResource}
          />
        )}
        <HelpButton />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  memberResource: state.memberResource,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LocaleWrapper(MemberResources));
