import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Linking, Alert, TouchableHighlight, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
  },
  headerTxt: {
    fontWeight: 'bold',
    fontSize: 16,
    padding: 8,
  },
});

const iconName = (url) => {
  const arr = url.split(':');
  let icon = '';
  switch (arr[0]) {
    case 'tel':
      icon = Platform.OS === 'ios' ? 'ios-call' : 'md-call';
      break;
    case 'sms':
      icon = Platform.OS === 'ios' ? 'ios-chatboxes' : 'md-chatboxes';
      break;
    case 'mailto':
      icon = Platform.OS === 'ios' ? 'ios-mail' : 'md-mail';
      break;

    default:
      icon = Platform.OS === 'ios' ? 'ios-open' : 'md-open';
      break;
  }
  return icon;
};

const openURL = (url) => {
  Linking.openURL(url).catch(() => Alert.alert('Provided URL is not supported'));
};

class MemberResource extends Component {
  static propTypes = {
    locale: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { locale, item } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <View>
          {item.ResourceSectionTranslations.map(data =>
              (data.LanguageCode.toLowerCase() === locale ? (
                <View style={styles.header} key={data.LanguageCode}>
                  <TouchableHighlight underlayColor="#D3D3D3" onPress={() => openURL(data.URI)}>
                    <Text style={styles.headerTxt}>{data.Label}</Text>
                  </TouchableHighlight>
                </View>
              ) : null))}
        </View>
        <View>
          {item.ResourceDetails.map(rd => (
            <View key={rd.ResourceID}>
              {rd.ResourceDetailTranslations.map(rdt =>
                  (rdt.LanguageCode.toLowerCase() === locale ? (
                    <View key={rdt.LanguageCode} style={{}}>
                      <TouchableHighlight underlayColor="#D3D3D3" onPress={() => openURL(rdt.URI)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 8 }}>
                          <Ionicons name={iconName(rdt.URI)} size={24} />
                          <Text style={{ paddingHorizontal: 10 }}>{rdt.Label}</Text>
                        </View>
                      </TouchableHighlight>
                    </View>
                  ) : null))}
            </View>
          ))}
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

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MemberResource);
