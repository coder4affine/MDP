import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableHighlight, Image, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import config from '../../config';
import commonStyle from '../../commonStyle';
import styles from './styles';

export default class componentName extends Component {
  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    languages: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      currentLocale: props.currentLocale,
    };

    this.selectLanguage = this.selectLanguage.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect = () => {
    this.props.onSelect(this.state.currentLocale);
  };

  selectLanguage = (currentLocale) => {
    this.setState({ currentLocale });
  };

  render() {
    const { languages } = this.props;
    const { currentLocale } = this.state;
    const { OS } = Platform;
    const iconType = OS === 'ios' ? 'ios' : 'md';
    return (
      <View style={styles.container}>
        <View style={commonStyle.flex}>
          {languages.map(item => (
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
                      currentLocale === item.key
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
          <TouchableHighlight
            style={[commonStyle.center, commonStyle.button]}
            onPress={this.onSelect}
            underlayColor="#D3D3D3"
          >
            <Text style={[commonStyle.text, commonStyle.buttonText]}>Select Language</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
