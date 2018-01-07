import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, TouchableHighlight, Linking, Alert } from 'react-native';
import moment from 'moment';
import Icons from 'react-native-vector-icons/Ionicons';
import Swipeable from 'react-native-swipeable';

export class componentName extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);

    this.state = {
      leftActionActivated: false,
      toggle: false,
    };
    this.openFile = this.openFile.bind(this);
    this.openURL = this.openURL.bind(this);
    this.getFile = this.getFile.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
  }

  getFile = (uuid) => {
    alert(uuid);
  };

  openURL = (url) => {
    Linking.openURL(url).catch(() => Alert.alert('Provided URL is not supported'));
  };

  openFile() {
    const { item } = this.props;
    if (item.SecureURI === 'Y') {
      this.getFile(item.UUID);
    }
    if (item.SecureURI === 'N') {
      this.openURL(item.URI);
    }
  }

  changeStatus() {
    alert('change Status');
  }

  render() {
    const { item, locale } = this.props;
    const { leftActionActivated } = this.state;

    return (
      <Swipeable
        leftContent={
          <View
            style={[
              {
                flex: 1,
                alignItems: 'flex-end',
                justifyContent: 'center',
                paddingRight: 20,
              },
              {
                backgroundColor: 'steelblue',
              },
            ]}
          >
            {leftActionActivated ? <Text>release!</Text> : <Text>keep pulling!</Text>}
          </View>
        }
        onLeftActionActivate={() => this.setState({ leftActionActivated: true })}
        onLeftActionDeactivate={() => this.setState({ leftActionActivated: false })}
        onLeftActionComplete={this.changeStatus}
      >
        <View style={{ flex: 1, padding: 16 }}>
          {item.AlertTranslations.map(alert =>
              (alert.LanguageCode.toLowerCase() === locale ? (
                <View key={alert.LanguageCode}>
                  <Text style={{ paddingVertical: 5 }}>{alert.Subject}</Text>
                  <Text style={{ textAlign: 'justify' }}>{alert.Detail}</Text>
                </View>
              ) : null))}
          <TouchableHighlight onPress={this.openFile} underlayColor="#A8A8A8">
            <View style={{ flexDirection: 'row', marginVertical: 5 }}>
              <Text style={{ paddingRight: 10, color: '#3578F6' }}>EOB</Text>
              <Icons name="md-open" size={16} color="#3578F6" />
            </View>
          </TouchableHighlight>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}
          >
            <Text>{`Date: ${moment(item.AlertDate).format('L')}`}</Text>
            <Text>{`Expiry: ${moment(item.ExpiryDate).format('L')}`}</Text>
          </View>
        </View>
      </Swipeable>
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

export default connect(mapStateToProps, mapDispatchToProps)(componentName);
