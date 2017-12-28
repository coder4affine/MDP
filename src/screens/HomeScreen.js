import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, WebView } from 'react-native';
import { bindActionCreators } from 'redux';
import * as homeAction from '../actions/homeAction';
import LocaleWrapper from '../HOC/LocaleWrapper';

export class Home extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    home: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }
  componentWillMount() {
    this.props.actions.loadHome();
  }

  render() {
    const { home, locale } = this.props;
    let html = '';
    if (home.data) {
      html = home.data[locale];
    }

    return (
      <View style={{ flex: 1 }}>
        <WebView source={{ html }} style={{ marginTop: 20 }} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  home: state.home,
  locale: state.locale,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(homeAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LocaleWrapper(Home));
