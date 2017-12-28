import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import moment from 'moment';

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
    return (
      <View>
        {item.AlertTranslations.map(alert =>
            (alert.LanguageCode.toLowerCase() === locale ? (
              <View key={alert.LanguageCode}>
                <Text>{alert.Subject}</Text>
                <Text>{alert.Detail}</Text>
              </View>
            ) : null))}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>{moment(item.AlertDate).format('L')}</Text>
          <Text>{moment(item.ExpiryDate).format('L')}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(componentName);
