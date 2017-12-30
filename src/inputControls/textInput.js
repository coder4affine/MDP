import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput, View, Text, StyleSheet, Platform, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

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
  textIcon: {
    position: 'absolute',
    ...Platform.select({
      ios: {
        right: 10,
        bottom: 2,
      },
      android: {
        right: 14,
        bottom: 14,
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
});

/**
 * to be wrapped with redux-form Field component
 */
class InputText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordToggle: props.password,
    };
  }

  render() {
    const {
      input, meta, inputRef, password, ...inputProps
    } = this.props;

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
          secureTextEntry={password && this.state.passwordToggle}
        />
        {password && (
          <TouchableHighlight
            style={styles.textIcon}
            underlayColor="white"
            onPress={() => this.setState({ passwordToggle: !this.state.passwordToggle })}
          >
            <Icon name={this.state.passwordToggle ? 'ios-eye' : 'ios-eye-off'} size={22} />
          </TouchableHighlight>
        )}
        {meta.error && !valid && <Text style={styles.error}>{meta.error}</Text>}
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
  password: PropTypes.bool,
  date: PropTypes.bool,
};

InputText.defaultProps = {
  password: false,
  date: false,
};

export default InputText;
