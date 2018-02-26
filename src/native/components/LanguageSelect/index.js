import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableHighlight, Image, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import * as config from '../../../config.json';
import commonStyle from '../../commonStyle';
import Button from '../../inputControls/Button';
import styles from './styles';
import actions from '../../../actions';
import I18n from '../../i18n';

class LanguageSelect extends Component {
  static propTypes = {
    locale: PropTypes.string.isRequired,
    changeLocale: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      locale: props.locale,
    };

    this.selectLanguage = this.selectLanguage.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect = () => {
    Navigation.dismissLightBox();
    this.props.changeLocale(this.state.locale);
    I18n.locale = this.state.locale;
  };

  selectLanguage = (locale) => {
    this.setState({ locale });
  };

  render() {
    const { locale } = this.state;
    const { OS } = Platform;
    const iconType = OS === 'ios' ? 'ios' : 'md';
    return (
      <View style={styles.container}>
        <View style={commonStyle.flex}>
          {config.locale.map(item => (
            <TouchableHighlight
              style={commonStyle.flex}
              key={item.key}
              onPress={() => this.selectLanguage(item.key)}
              underlayColor="#D3D3D3"
            >
              <View style={[commonStyle.vCenter, styles.hPadding]}>
                <View style={commonStyle.vCenter}>
                  <Image source={item.img} />
                  <Text style={[commonStyle.text, styles.hPadding]}>{item.value}</Text>
                </View>
                <View>
                  <Icon
                    name={
                      locale === item.key
                        ? `${iconType}-radio-button-on`
                        : `${iconType}-radio-button-off`
                    }
                    size={24}
                    color={config.primaryColor}
                  />
                </View>
              </View>
            </TouchableHighlight>
          ))}
        </View>
        <View style={styles.buttonView}>
          <Button text="Select Language" onPress={this.onSelect} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { locale } = state.locale;
  return {
    locale,
  };
};

const mapDispatchToProps = dispatch => ({
  changeLocale: (locale) => {
    dispatch(actions.changeLocale(locale));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSelect);
