import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import moment from 'moment';
import Icons from 'react-native-vector-icons/Ionicons';
import Swipeout from 'react-native-swipeout';

export class componentName extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { item, locale } = this.props;
    const swipeoutBtns = [
      {
        text: 'Button',
      },
    ];
    return (
      <Swipeout right={swipeoutBtns} buttonWidth={50}>
        <View style={{ flex: 1, padding: 16 }}>
          {item.AlertTranslations.map(alert =>
              (alert.LanguageCode.toLowerCase() === locale ? (
                <View key={alert.LanguageCode}>
                  <Text style={{ paddingVertical: 5 }}>{alert.Subject}</Text>
                  <Text style={{ textAlign: 'justify' }}>{alert.Detail}</Text>
                </View>
              ) : null))}
          <View style={{ flexDirection: 'row', marginVertical: 5 }}>
            <Text style={{ paddingRight: 10, color: '#3578F6' }}>EOB</Text>
            <Icons name="md-open" size={16} color="#3578F6" />
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}
          >
            <Text>{`Date: ${moment(item.AlertDate).format('L')}`}</Text>
            <Text>{`Expiry: ${moment(item.ExpiryDate).format('L')}`}</Text>
          </View>
        </View>
      </Swipeout>
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
