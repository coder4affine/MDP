import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { View, Text, ScrollView } from 'react-native';

import DatePicker from '../../inputControls/datePicker';
import Button from '../../inputControls/Button';

const normalizeDate = (value, previousValue) => {
  if (!value) {
    return value;
  }
  const onlyNums = value.replace(/[^\d]/g, '');
  if (!previousValue || value.length > previousValue.length) {
    // typing forward
    if (onlyNums.length === 2) {
      return `${onlyNums}/`;
    }
    if (onlyNums.length === 4) {
      return `${onlyNums.slice(0, 2)}/${onlyNums.slice(2)}/`;
    }
  }
  if (onlyNums.length <= 2) {
    return onlyNums;
  }
  if (onlyNums.length <= 4) {
    return `${onlyNums.slice(0, 2)}/${onlyNums.slice(2)}`;
  }
  return `${onlyNums.slice(0, 2)}/${onlyNums.slice(2, 4)}/${onlyNums.slice(4, 8)}`;
};

const DateSelect = ({
  pristine, handleSubmit, submitting, error,
}) => (
  <ScrollView keyboardShouldPersistTaps="handled">
    <View style={{ margin: 10 }}>{!!error && <Text>{error}</Text>}</View>
    <View style={{ margin: 10 }}>
      <Field
        name="BirthDate"
        component={DatePicker}
        label="Birth Date"
        placeholder="MM/DD/YYYY"
        normalize={normalizeDate}
        returnKeyType="next"
        keyboardType="numeric"
        inputRef={(el) => {
          this.birthDate = el;
        }}
        onSubmitEditing={() => !(pristine || submitting) && handleSubmit()}
      />
    </View>
    <View style={{ margin: 10 }}>
      <Button
        text="Generate Card"
        onPress={() => !(pristine || submitting) && handleSubmit()}
        disabled={pristine || submitting}
        submitting={submitting}
      />
    </View>
  </ScrollView>
);

DateSelect.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

DateSelect.defaultProps = {
  error: '',
};

export default reduxForm({
  form: 'dateSelect',
})(DateSelect);
