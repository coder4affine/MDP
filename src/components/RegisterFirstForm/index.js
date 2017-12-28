import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { View, Text, StyleSheet } from 'react-native';
import commonStyle from '../../commonStyle';

import TextInput from '../../inputControls/textInput';
import DatePicker from '../../inputControls/datePicker';
import Button from '../../inputControls/button';

const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
  } else if (values.firstName.length > 15) {
    errors.firstName = 'Must be 15 characters or less';
  }
  if (!values.lastName) {
    errors.lastName = 'Required';
  } else if (values.lastName.length > 15) {
    errors.lastName = 'Must be 15 characters or less';
  }

  return errors;
};

const dateFormatter = (number) => {
  if (!number) return '';
  const splitter = /.{1,2}/g;
  number = number.substring(0, 8);
  return (
    number
      .substring(0, 6)
      .match(splitter)
      .join('/') + number.substring(6)
  );
};

const dateParser = number => (number ? number.replace(/\//g, '') : '');

function RegisterFirst({
  pristine, handleSubmit, submitting, error,
}) {
  return [
    <View key={0} style={{ margin: 10 }}>
      {error && <Text>{error}</Text>}
    </View>,
    <View key={1} style={{ margin: 10 }}>
      <Text style={commonStyle.text}>First Name</Text>
      <Field
        name="FirstName"
        component={TextInput}
        placeholder="First Name"
        returnKeyType="next"
        onSubmitEditing={() => {
          this.lastName.focus();
        }}
      />
    </View>,
    <View key={2} style={{ margin: 10 }}>
      <Text style={commonStyle.text}>Last Name</Text>
      <Field
        name="LastName"
        component={TextInput}
        placeholder="Last Name"
        inputRef={(el) => {
          this.lastName = el;
        }}
        returnKeyType="next"
        onSubmitEditing={() => {
          this.birthDate.focus();
        }}
      />
    </View>,
    <View key={3} style={{ margin: 10 }}>
      <Text style={commonStyle.text}>Birth Date</Text>
      <Field
        name="BirthDate"
        component={DatePicker}
        placeholder="MM/DD/YYYY"
        format={dateFormatter}
        parse={dateParser}
        returnKeyType="next"
        keyboardType="numeric"
        inputRef={(el) => {
          this.birthDate = el;
        }}
        onSubmitEditing={() => {
          this.ssn.focus();
        }}
      />
    </View>,
    <View key={4} style={{ borderWidth: StyleSheet.hairlineWidth, margin: 5, borderRadius: 4 }}>
      <View style={{ margin: 10 }}>
        <Text style={commonStyle.text}>Social Security Number</Text>
        <Field
          name="SSN"
          component={TextInput}
          placeholder="Social Security Number"
          inputRef={(el) => {
            this.ssn = el;
          }}
          returnKeyType="next"
          onSubmitEditing={() => {
            this.medicaidId.focus();
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 10,
        }}
      >
        <View style={{ flex: 1, borderTopWidth: StyleSheet.hairlineWidth }} />
        <Text style={[commonStyle.text, { paddingHorizontal: 10 }]}>OR</Text>
        <View style={{ flex: 1, borderTopWidth: StyleSheet.hairlineWidth }} />
      </View>
      <View style={{ margin: 10 }}>
        <Text style={commonStyle.text}>Medicaid ID</Text>
        <Field
          name="MemberId"
          component={TextInput}
          placeholder="Medicaid ID"
          inputRef={(el) => {
            this.medicaidId = el;
          }}
          returnKeyType="next"
          onSubmitEditing={() => !(pristine || submitting) && handleSubmit()}
        />
      </View>
    </View>,
    <View key={5} style={{ margin: 10 }}>
      <Button
        text="Next"
        onPress={() => !(pristine || submitting) && handleSubmit()}
        disabled={pristine || submitting}
        submitting={submitting}
      />
    </View>,
  ];
}

RegisterFirst.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'registerFirst',
  validate,
})(RegisterFirst);
