import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import commonStyle from '../../commonStyle';
import fieldValidation from '../../../utils/fieldValidation';
import TextInput from '../../inputControls/textInput';
import DatePicker from '../../inputControls/datePicker';
import Button from '../../inputControls/Button';

const RegisterFirst = ({
  pristine, handleSubmit, submitting, error,
}) => {
  const {
    required,
    alphabets,
    maxLength40,
    date,
    maxLength20,
    normalizeDate,
    requiredIfNoSSN,
    requiredIfNoMemberId,
  } = fieldValidation;
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View style={{ margin: 10 }}>{!!error && <Text>{error}</Text>}</View>
      <View style={{ margin: 10 }}>
        <Field
          name="FirstName"
          component={TextInput}
          validate={[required, alphabets, maxLength40]}
          placeholder="First Name"
          label="First Name"
          returnKeyType="next"
          onSubmitEditing={() => {
            this.lastName.focus();
          }}
        />
      </View>
      <View style={{ margin: 10 }}>
        <Field
          name="LastName"
          component={TextInput}
          validate={[required, alphabets, maxLength40]}
          placeholder="Last Name"
          label="Last Name"
          inputRef={(el) => {
            this.lastName = el;
          }}
          returnKeyType="next"
          onSubmitEditing={() => {
            this.birthDate.focus();
          }}
        />
      </View>
      <View style={{ margin: 10 }}>
        <Field
          name="BirthDate"
          component={DatePicker}
          validate={[required, date]}
          placeholder="MM/DD/YYYY"
          label="Birth Date"
          normalize={normalizeDate}
          returnKeyType="next"
          keyboardType="numeric"
          inputRef={(el) => {
            this.birthDate = el;
          }}
          onSubmitEditing={() => {
            this.ssn.focus();
          }}
        />
      </View>
      <View style={{ borderWidth: StyleSheet.hairlineWidth, margin: 5, borderRadius: 4 }}>
        <View style={{ margin: 10 }}>
          <Field
            name="SSN"
            component={TextInput}
            validate={[requiredIfNoMemberId, maxLength20]}
            placeholder="Social Security Number"
            label="Social Security Number"
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
          <Field
            name="MemberId"
            component={TextInput}
            validate={[requiredIfNoSSN, maxLength20]}
            placeholder="Medicaid ID"
            label="Medicaid ID"
            inputRef={(el) => {
              this.medicaidId = el;
            }}
            returnKeyType="next"
            onSubmitEditing={() => !(pristine || submitting) && handleSubmit()}
          />
        </View>
      </View>
      <View style={{ margin: 10 }}>
        <Button
          text="Next"
          onPress={() => !(pristine || submitting) && handleSubmit()}
          disabled={pristine || submitting}
          submitting={submitting}
        />
      </View>
    </ScrollView>
  );
};

RegisterFirst.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

RegisterFirst.defaultProps = {
  error: '',
};

export default reduxForm({
  form: 'registerFirst',
})(RegisterFirst);
