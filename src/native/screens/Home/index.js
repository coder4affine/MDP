import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RefreshControl, WebView, ScrollView, Dimensions, View } from 'react-native';
import { bindActionCreators } from 'redux';
import actions from '../../../actions';
import LocaleWrapper from '../../hoc/wrapper';
import HelpButton from '../../components/HelpButton';

import I18n from '../../i18n';

const { height } = Dimensions.get('window');

export class Home extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    home: PropTypes.object.isRequired,
    isConnected: PropTypes.bool.isRequired,
    navigator: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.loadHome = this.loadHome.bind(this);
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.locale !== nextProps.locale) {
      this.setTabButton();
      this.setTitle();
    }
  };

  setTabButton() {
    this.props.navigator.setTabButton({
      label: I18n.t('hdrHome'),
    });
  }

  setTitle() {
    this.props.navigator.setTitle({
      title: I18n.t('hdrHome'),
    });
  }

  loadHome() {
    if (this.props.isConnected) {
      this.props.actions.loadHome();
    } else {
      this.props.navigator.showInAppNotification({
        screen: 'mdp.Notification',
      });
    }
  }

  render() {
    const { home, locale } = this.props;
    const { loading, data } = home;
    let html = '';
    if (data) {
      html = data[locale];
    }
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          refreshControl={<RefreshControl refreshing={loading} onRefresh={this.loadHome} />}
        >
          <WebView source={{ html }} style={{ height: height - 120 }} />
        </ScrollView>
        <HelpButton />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  home: state.home,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LocaleWrapper(Home));
