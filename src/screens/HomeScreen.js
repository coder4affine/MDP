import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RefreshControl, WebView, ScrollView, Dimensions, View } from 'react-native';
import { bindActionCreators } from 'redux';
import actions from '../actions';
import LocaleWrapper from '../HOC/LocaleWrapper';
import HelpButton from '../components/HelpButton';

const { height } = Dimensions.get('window');

export class Home extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    home: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
    this.loadHome = this.loadHome.bind(this);
  }
  componentWillMount() {
    this.props.actions.loadHome();
  }

  loadHome() {
    this.setState({ loading: true });
    this.props.actions.loadHome().then(() => {
      this.setState({ loading: false });
    });
  }

  render() {
    const { home, locale } = this.props;
    let html = '';
    if (home.data) {
      html = home.data[locale];
    }
    const { loading } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={this.getCard} />}
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
