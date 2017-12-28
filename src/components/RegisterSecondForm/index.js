import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { View, Text } from 'react-native';
// import * as PropertiesActions from '../../Actions/PropertiesActions';
import commonStyle from '../../commonStyle';

import TextInput from '../../inputControls/textInput';
import Button from '../../inputControls/button';

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.confirmPassword)) {
    errors.password = 'Invalid email address';
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.confirmPassword)) {
    errors.confirmPassword = 'Invalid email address';
  }

  return errors;
};

function RegisterSecondForm({
  pristine, handleSubmit, submitting, error,
}) {
  return [
    <View key={0} style={{ margin: 10 }}>
      {error && <Text>{error}</Text>}
    </View>,
    <View key={1} style={{ margin: 10 }}>
      <Text style={commonStyle.text}>User Name</Text>
      <Field
        name="UserName"
        component={TextInput}
        placeholder="User Name"
        returnKeyType="next"
        onSubmitEditing={() => {
          this.password.focus();
        }}
      />
    </View>,
    <View key={2} style={{ margin: 10 }}>
      <Text style={commonStyle.text}>User Name</Text>
      <Field
        name="ConfirmUserName"
        component={TextInput}
        placeholder="User Name"
        returnKeyType="next"
        onSubmitEditing={() => {
          this.password.focus();
        }}
      />
    </View>,
    <View key={3} style={{ margin: 10 }}>
      <Text style={commonStyle.text}>Password</Text>
      <Field
        name="Password"
        component={TextInput}
        placeholder="Password"
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
      <Text style={commonStyle.text}>Confirm Password</Text>
      <Field
        name="ConfirmPassword"
        component={TextInput}
        placeholder="Confirm Password"
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
  validate,
})(RegisterSecondForm);
