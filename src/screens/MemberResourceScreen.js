import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, FlatList } from 'react-native';

import LocaleWrapper from '../HOC/LocaleWrapper';
import I18n from '../i18n';
import * as memberResourceAction from '../actions/memberResourceAction';

import MemberResource from '../components/MemberResource';

export class MemberResourceScreen extends Component {
  static propTypes = {
    memberResource: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {};
    this.getMemberResource = this.getMemberResource.bind(this);
  }

  componentWillMount() {
    this.getMemberResource();
  }

  getMemberResource() {
    const { user } = this.props.auth;
    this.props.actions.loadMemberResource(user);
  }

  render() {
    const { data, loading } = this.props.memberResource;
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
});

export default connect(mapStateToProps, mapDispatchToProps)(LocaleWrapper(MemberResourceScreen));
