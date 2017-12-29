import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, FlatList } from 'react-native';
import moment from 'moment';

import LocaleWrapper from '../HOC/LocaleWrapper';
import I18n from '../i18n';
import * as memberResourceAction from '../actions/memberResourceAction';
import * as authAction from '../actions/authAction';

import MemberResource from '../components/MemberResource';

export class MemberResourceScreen extends Component {
  static propTypes = {
    memberResource: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    authAction: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
    this.getMemberResource = this.getMemberResource.bind(this);
  }

  componentWillMount() {
    this.getMemberResource();
  }

  getMemberResource() {
    this.setState({ loading: true });
    const { user } = this.props.auth;
    if (user) {
      if (moment().isBefore(user.expires)) {
        this.props.actions.getMemberResource(`${user.token_type} ${user.access_token}`).then(() => {
          this.setState({ loading: false });
        });
      } else {
        this.props.authAction
          .refreshToken({ refresh_token: user.refresh_token, grant_type: 'refresh_token' })
          .then(() =>
            this.props.actions.getMemberResource(`${this.props.auth.user.token_type} ${this.props.auth.user.access_token}`))
          .then(() => {
            this.setState({ loading: false });
          });
      }
    } else {
      this.setState({ loading: false });
    }
  }

  render() {
    const { data } = this.props.memberResource;
    const { loading } = this.state;
    return (
      <View style={{ flex: 1 }}>
        {data && (
          <FlatList
            data={data}
            renderItem={({ item }) => <MemberResource item={item} />}
            keyExtractor={item => item.SectionID}
            refreshing={loading}
            onRefresh={this.getMemberResource}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  memberResource: state.memberResource,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(memberResourceAction, dispatch),
  authAction: bindActionCreators(authAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LocaleWrapper(MemberResourceScreen));
