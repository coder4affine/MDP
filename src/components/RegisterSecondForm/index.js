import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { View, Text } from 'react-native';
import fieldValidation from '../../utils/fieldValidation';
import TextInput from '../../inputControls/textInput';
import Button from '../../inputControls/button';

function RegisterSecondForm({
  pristine, handleSubmit, submitting, error,
}) {
  const {
    required,
    password,
    maxLength20,
    maxLength12,
    minLength8,
    comparePassword,
    compareUsername,
  } = fieldValidation;
  return [
    <View key={0} style={{ margin: 10 }}>
      {!!error && <Text>{error}</Text>}
    </View>,
    <View key={1} style={{ margin: 10 }}>
      <Field
        name="UserName"
        component={TextInput}
        validate={[required, maxLength20, minLength8]}
        placeholder="User Name"
        label="User Name"
        returnKeyType="next"
        onSubmitEditing={() => {
          this.password.focus();
        }}
      />
    </View>,
    <View key={2} style={{ margin: 10 }}>
      <Field
        name="ConfirmUserName"
        component={TextInput}
        validate={[required, maxLength20, minLength8, compareUsername]}
        placeholder="Confirm User Name"
        label="Confirm User Name"
        returnKeyType="next"
        onSubmitEditing={() => {
          this.password.focus();
        }}
      />
    </View>,
    <View key={3} style={{ margin: 10 }}>
      <Field
        name="Password"
        component={TextInput}
        validate={[required, maxLength12, minLength8, password]}
        placeholder="Password"
        label="Password"
        inputRef={(el) => {
          this.password = el;
        }}
        returnKeyType="next"
        onSubmitEditing={() => {
          this.confirmPassword.focus();
        }}
        password
      />
    </View>,
    <View key={4} style={{ margin: 10 }}>
      <Field
        name="ConfirmPassword"
        component={TextInput}
        validate={[required, maxLength12, minLength8, password, comparePassword]}
        placeholder="Confirm Password"
        label="Confirm Password"
        inputRef={(el) => {
          this.confirmPassword = el;
        }}
        returnKeyType="go"
        onSubmitEditing={() => !(pristine || submitting) && handleSubmit()}
        password
      />
    </View>,
    <View key={5} style={{ margin: 10 }}>
      <Button
        text="Register"
        onPress={() => !(pristine || submitting) && handleSubmit()}
        disabled={pristine || submitting}
        submitting={submitting}
      />
    </View>,
  ];
}

RegisterSecondForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'registerSecond',
})(RegisterSecondForm);
