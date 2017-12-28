import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Linking, Alert, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';

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
      <View>
        <View>
          {item.ResourceSectionTranslations.map(data =>
              (data.LanguageCode.toLowerCase() === locale ? (
                <View key={data.LanguageCode}>
                  <TouchableHighlight underlayColor="#D3D3D3" onPress={() => openURL(data.URI)}>
                    <Text>{data.Label}</Text>
                  </TouchableHighlight>
                </View>
              ) : null))}
        </View>
        <View>
          {item.ResourceDetails.map(rd => (
            <View key={rd.ResourceID}>
              {rd.ResourceDetailTranslations.map(rdt =>
                  (rdt.LanguageCode.toLowerCase() === locale ? (
                    <View key={rdt.LanguageCode}>
                      <TouchableHighlight underlayColor="#D3D3D3" onPress={() => openURL(rdt.URI)}>
                        <Text>{rdt.Label}</Text>
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
