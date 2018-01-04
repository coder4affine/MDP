import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RefreshControl, WebView, ScrollView, Dimensions, View } from 'react-native';
import { bindActionCreators } from 'redux';
import actions from '../actions';
import LocaleWrapper from '../HOC/LocaleWrapper';
import HelpButton from '../components/HelpButton';

const { height, width } = Dimensions.get('window');

export class Home extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    home: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.loadHome = this.loadHome.bind(this);
  }

  loadHome() {
    this.props.actions.loadHome();
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
  locale: state.locale,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LocaleWrapper(Home));
