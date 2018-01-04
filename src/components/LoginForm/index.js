import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { View, Text } from 'react-native';
import commonStyle from '../../commonStyle';

import fieldValidation from '../../utils/fieldValidation';
import TextInput from '../../inputControls/textInput';
import Button from '../../inputControls/button';

function LoginForm({
  pristine, handleSubmit, submitting, error,
}) {
  const {
    required, password, maxLength20, maxLength12, minLength8,
  } = fieldValidation;
  return [
    <View key={0} style={{ margin: 10 }}>
      {!!error && <Text>{error}</Text>}
    </View>,
    <View key={1} style={{ margin: 10 }}>
      <Text style={commonStyle.text}>User Name</Text>
      <Field
        name="username"
        component={TextInput}
        validate={[required, maxLength20, minLength8]}
        placeholder="User Name"
        returnKeyType="next"
        onSubmitEditing={() => {
          this.password.focus();
        }}
      />
    </View>,
    <View key={2} style={{ margin: 10 }}>
      <Text style={commonStyle.text}>Password</Text>
      <Field
        name="password"
        component={TextInput}
        validate={[required, maxLength12, minLength8, password]}
        placeholder="Password"
        inputRef={(el) => {
          this.password = el;
        }}
        returnKeyType="go"
        onSubmitEditing={() => !(pristine || submitting) && handleSubmit()}
        password
      />
    </View>,
    <View key={3} style={{ margin: 10 }}>
      <Button
        text="Login"
        onPress={() => !(pristine || submitting) && handleSubmit()}
        disabled={pristine || submitting}
        submitting={submitting}
      />
    </View>,
  ];
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'signIn',
})(LoginForm);
