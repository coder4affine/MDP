import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, TouchableHighlight } from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import { SubmissionError, reset } from 'redux-form';
import moment from 'moment';
import LocaleWrapper from '../HOC/LocaleWrapper';
import DateForm from '../components/DateForm';
import Button from '../inputControls/button';
import { CARD_CHANGED } from '../constants/actionTypes';

function cardChange(card) {
  return { type: CARD_CHANGED, payload: card };
}

export class SelectCardScreen extends Component {
  static propTypes = {
    digitalCard: PropTypes.object.isRequired,
    savedCard: PropTypes.array.isRequired,
    cardChange: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      selectedCard: null,
      showDatePicker: false,
    };

    this.generateCard = this.generateCard.bind(this);
    this.selectCard = this.selectCard.bind(this);
    this.dateFormSubmit = this.dateFormSubmit.bind(this);
  }

  selectCard(selectedCard) {
    const showDatePicker = !this.props.savedCard.includes(selectedCard.MemberID);
    this.setState({ selectedCard, showDatePicker });
  }

  dateFormSubmit(value) {
    return new Promise((resolve) => {
      const { selectedCard } = this.state;
      if (moment(selectedCard.BirthDate).isSame(moment(value.BirthDate, 'L'), 'day')) {
        this.generateCard();
        resolve();
      } else {
        this.props.resetForm();
        throw new SubmissionError({
          _error: 'BirthDate not valid',
        });
      }
    });
  }

  generateCard() {
    const { selectedCard } = this.state;
    this.props.cardChange(selectedCard);
    this.props.navigator.pop({
      animated: true,
      animationType: 'slide-horizontal',
    });
  }

  render() {
    const { data } = this.props.digitalCard;
    const { selectedCard, showDatePicker } = this.state;
    return (
      <View style={{ flex: 1 }}>
        {data.map(item => (
          <TouchableHighlight
            key={item.MemberID}
            underlayColor="#D3D3D3"
            onPress={() => this.selectCard(item)}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
              <Icons
                name={
                  selectedCard && selectedCard.MemberID === item.MemberID
                    ? 'md-radio-button-on'
                    : 'md-radio-button-off'
                }
                size={24}
              />
              <Text style={{ paddingHorizontal: 10 }}>
                {`${item.FirstName} ${item.LastName} ${item.BirthDate}`}
              </Text>
            </View>
          </TouchableHighlight>
        ))}
        {showDatePicker && <DateForm onSubmit={this.dateFormSubmit} />}
        {!showDatePicker &&
          selectedCard && (
            <View style={{ margin: 10 }}>
              <Button text="Generate Card" onPress={this.generateCard} />
            </View>
          )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  digitalCard: state.digitalCard,
  savedCard: state.card.savedCard,
});

const mapDispatchToProps = dispatch => ({
  cardChange: (card) => {
    dispatch(cardChange(card));
  },
  resetForm: () => {
    dispatch(reset('dateSelect'));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LocaleWrapper(SelectCardScreen));
