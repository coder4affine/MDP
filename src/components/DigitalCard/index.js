import React from 'react';
import PropTypes from 'prop-types';
import { View, ImageBackground, Text } from 'react-native';
import Barcode from 'react-native-barcode-builder';
import moment from 'moment';

import ElevatedView from '../ElevatedView';
import CardFrontEN from '../../images/oklahoma/CardFront_en_US.png';
import CardBackEN from '../../images/oklahoma/CardBack_en_US.png';

import CardFrontES from '../../images/oklahoma/CardFront_es_US.png';
import CardBackES from '../../images/oklahoma/CardBack_es_US.png';

const DigitalCard = ({ locale, groupMember }) => {
  const CardFront = locale.toLowerCase() === 'en' ? CardFrontEN : CardFrontES;
  const CardBack = locale.toLowerCase() === 'en' ? CardBackEN : CardBackES;
  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: 'center', margin: 16 }}>
        <ElevatedView elevation={3} style={{ borderRadius: 5 }}>
          <ImageBackground borderRadius={5} style={{ width: 288, height: 186 }} source={CardFront}>
            <Text
              style={{
                position: 'absolute',
                top: 111,
                left: 50,
                backgroundColor: '#ECF4F9',
              }}
            >
              {`${groupMember.FirstName} ${groupMember.LastName}`}
            </Text>
            <Text
              style={{
                position: 'absolute',
                top: 136,
                left: 64,
                backgroundColor: '#ECF4F9',
              }}
            >
              {groupMember.MemberID}
            </Text>
            <Text
              style={{
                position: 'absolute',
                top: 163,
                left: 55,
                backgroundColor: '#ECF4F9',
              }}
            >
              {moment(groupMember.BirthDate).format('L')}
            </Text>
          </ImageBackground>
        </ElevatedView>
      </View>
      <View style={{ alignItems: 'center', margin: 16 }}>
        <ElevatedView elevation={3} style={{ borderRadius: 5 }}>
          <ImageBackground borderRadius={5} style={{ width: 288, height: 186 }} source={CardBack}>
            <View style={{ position: 'absolute', top: 12, left: 60 }}>
              <Barcode height={30} width={1.5} value={groupMember.MemberID} format="CODE128" />
            </View>
          </ImageBackground>
        </ElevatedView>
      </View>
    </View>
  );
};

DigitalCard.propTypes = {
  locale: PropTypes.string.isRequired,
  groupMember: PropTypes.object.isRequired,
};

export default DigitalCard;
