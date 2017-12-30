import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import moment from 'moment';
import Panel from '../Panel';

const status = (status) => {
  let statusText = '';
  switch (status) {
    case 'A':
      statusText = 'Active';
      break;
    case 'D':
      statusText = 'DeActive';
      break;
    default:
      statusText = 'None';
      break;
  }
  return statusText;
};

export default class MyBenefits extends PureComponent {
  static propTypes = {
    item: PropTypes.object.isRequired,
    expanded: PropTypes.bool.isRequired,
  };

  render() {
    const { item, expanded } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Panel
          title={`${item.FirstName} ${item.LastName}`}
          subTitle={`ID: ${item.MemberID}`}
          expanded={expanded}
        >
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 4 }}>
              <Text>
                <Text>Program: </Text>
                <Text>{item.Group.GroupName}</Text>
              </Text>
              <Text>
                <Text>Birth Date: </Text>
                <Text>{moment(item.BirthDate).format('L')}</Text>
              </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 4 }}>
              <Text>
                <Text>Start Date: </Text>
                <Text>{moment(item.EffectiveStartDate).format('L')}</Text>
              </Text>
              <Text>
                <Text>End Date: </Text>
                <Text>{moment(item.EffectiveEndDate).format('L')}</Text>
              </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 4 }}>
              <Text>
                <Text>Status: </Text>
                <Text>{status(item.Status)}</Text>
              </Text>
            </View>
          </View>
        </Panel>
      </View>
    );
  }
}
