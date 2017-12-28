import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableHighlight,
  DatePickerAndroid,
  Modal,
  DatePickerIOS,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

const styles = StyleSheet.create({
  input: {
    ...Platform.select({
      ios: {
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 4,
        borderColor: 'gray',
        paddingHorizontal: 10,
        paddingVertical: 5,
      },
    }),
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.4)',
    marginTop: 20,
  },
  valid: {
    ...Platform.select({
      ios: {
        borderColor: 'gray',
      },
    }),
  },
  invalid: {
    ...Platform.select({
      ios: {
        borderColor: 'rgb(244, 67, 54)',
      },
    }),
  },
  error: {
    color: 'rgb(244, 67, 54)',
    fontSize: 12,
    lineHeight: 12,
    fontWeight: '600',
    marginTop: 3,
  },
  flexEnd: { flex: 1, justifyContent: 'flex-end' },
  spaceBW: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: { fontSize: 18, padding: 16, color: 'green' },
});

/**
 * to be wrapped with redux-form Field component
 */
class InputText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      pickerDate: moment().toDate(),
    };

    this.openPicker = this.openPicker.bind(this);
    this.selectDate = this.selectDate.bind(this);
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.input.value !== nextProps.input.value) {
      if (moment(nextProps.input.value, 'L').isValid()) {
        this.setState({ pickerDate: moment(nextProps.input.value).toDate() });
      }
    }
  };

  openPicker() {
    const { OS } = Platform;
    if (OS === 'ios') {
      this.setState({ showModal: true });
    } else {
      this.datePickerAndroid();
    }
  }

  async datePickerAndroid() {
    try {
      const {
        action, year, month, day,
      } = await DatePickerAndroid.open({
        date: this.state.pickerDate,
        mode: 'spinner',
      });
      if (action === DatePickerAndroid.dateSetAction) {
        const date = moment()
          .year(year)
          .month(month)
          .date(day)
          .toDate();
        this.selectDate(date);
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  }

  selectDate(date) {
    this.props.input.onChange(moment(date).format('L'));
    this.setState({ showModal: false });
  }

  render() {
    const {
      input, meta, inputRef, ...inputProps
    } = this.props;
    const { OS } = Platform;
    const { showModal, pickerDate } = this.state;
    // do not display warning if the field has not been touched or if it's currently being edited
    const valid = meta.touched && !meta.active ? !!meta.valid : true;
    const errorStyle = !valid && styles.invalid;

    return (
      <View>
        <TextInput
          {...inputProps}
          ref={inputRef}
          onChangeText={input.onChange}
          onBlur={input.onBlur}
          onFocus={input.onFocus}
          value={input.value}
          style={[styles.input, errorStyle]}
          underlineColorAndroid={valid ? 'gray' : 'rgb(244, 67, 54)'}
        />

        <TouchableHighlight
          style={{ position: 'absolute', right: 12, top: 2 }}
          underlayColor="white"
          onPress={this.openPicker}
        >
          <Icon name="md-calendar" size={22} />
        </TouchableHighlight>

        {meta.error && !valid && <Text style={styles.error}>{meta.error}</Text>}
        {OS === 'ios' && (
          <Modal visible={showModal} animationType="slide" transparent onRequestClose={() => null}>
            <View style={styles.flexEnd}>
              <View style={{ backgroundColor: '#FAFAFA' }}>
                <View style={styles.spaceBW}>
                  <TouchableHighlight
                    onPress={() => this.setState({ showModal: !showModal })}
                    underlayColor="#D3D3D3"
                  >
                    <Text style={styles.text}>Cancel</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    onPress={() => this.selectDate(pickerDate)}
                    underlayColor="#D3D3D3"
                  >
                    <Text style={styles.text}>Done</Text>
                  </TouchableHighlight>
                </View>
                <View
                  style={{
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderBottomColor: '#D3D3D3',
                  }}
                />
                <DatePickerIOS
                  mode="date"
                  date={pickerDate}
                  ref={(dateInput) => {
                    this.dateInput = dateInput;
                  }}
                  onDateChange={nd => this.setState({ pickerDate: nd })}
                />
              </View>
            </View>
          </Modal>
        )}
      </View>
    );
  }
}

InputText.propTypes = {
  input: PropTypes.shape({
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    value: PropTypes.any.isRequired,
  }).isRequired,
  meta: PropTypes.shape({
    active: PropTypes.bool.isRequired,
    error: PropTypes.string,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    visited: PropTypes.bool.isRequired,
  }).isRequired,
};

export default InputText;
