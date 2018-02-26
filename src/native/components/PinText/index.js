/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput } from 'react-native';

export default class PinText extends Component {
  static propTypes = {
    codeLength: PropTypes.number,
    autoFocus: PropTypes.bool,
    onFulfill: PropTypes.func.isRequired,
    onFistBack: PropTypes.func,
    compareWithCode: PropTypes.string,
  };

  static defaultProps = {
    codeLength: 4,
    autoFocus: true,
    compareWithCode: '',
    onFistBack: () => {},
  };

  constructor(props) {
    super(props);

    this.state = {
      codeArr: new Array(props.codeLength).fill(''),
      currentIndex: 0,
    };

    this.codeInputRefs = [];
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.autoFocus !== nextProps.autoFocus && nextProps.autoFocus) {
      const { currentIndex } = this.state;
      const newIndex = currentIndex === 0 ? currentIndex : this.props.codeLength - 1;
      this.setFocus(newIndex);
    }
  };

  onKeyPress(e) {
    if (e.nativeEvent.key === 'Backspace') {
      const { currentIndex } = this.state;
      if (currentIndex > 0) {
        this.setFocus(currentIndex - 1);
      } else {
        this.setFocus(0);
        if (this.props.onFistBack) {
          this.props.onFistBack();
        }
      }
    }
  }

  onFocus(index) {
    this.codeInputRefs[index].setNativeProps({ borderBottomColor: 'green' });
    const newCodeArr = this.state.codeArr.slice(0);
    const currentEmptyIndex = newCodeArr.findIndex(c => !c);
    if (currentEmptyIndex !== -1 && currentEmptyIndex < index) {
      return this.setFocus(currentEmptyIndex);
    }

    newCodeArr.forEach((_, i) => {
      if (i >= index) {
        newCodeArr[i] = '';
      }
    });

    this.setState({
      codeArr: newCodeArr,
      currentIndex: index,
    });
    return true;
  }

  onInputCode(character, index) {
    const { codeLength, onFulfill, compareWithCode } = this.props;
    const newCodeArr = this.state.codeArr.slice(0);
    newCodeArr[index] = character;

    if (index === codeLength - 1) {
      const code = newCodeArr.join('');

      if (compareWithCode) {
        const isMatching = code === compareWithCode;
        onFulfill(isMatching, code);
        if (!isMatching) {
          this.clear();
        }
      } else {
        onFulfill(code);
      }
      this.blur(this.state.currentIndex);
    } else {
      this.setFocus(this.state.currentIndex + 1);
    }

    this.setState(prevState => ({
      codeArr: newCodeArr,
      currentIndex: prevState.currentIndex + 1,
    }));
  }

  setFocus(index) {
    this.codeInputRefs[index].focus();
  }

  blur(index) {
    this.codeInputRefs[index].blur();
  }

  clear() {
    this.setState({
      codeArr: new Array(this.props.codeLength).fill(''),
      currentIndex: 0,
    });
    this.setFocus(0);
  }

  render() {
    const { codeLength, autoFocus } = this.props;

    const { currentIndex } = this.state;

    const dataArray = new Array(codeLength).fill('');

    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: 280,
          }}
        >
          {dataArray.map((item, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                this.codeInputRefs[index] = ref;
              }}
              style={{
                height: 50,
                width: 50,
                borderWidth: 1,
                borderBottomWidth: 3,
                borderColor: '#bababa',
                borderBottomColor: currentIndex === index ? 'green' : '#bababa',
                fontSize: 20,
                paddingHorizontal: 18,
                padding: 5,
                fontWeight: '600',
              }}
              placeholder="*"
              underlineColorAndroid="transparent"
              keyboardType="numeric"
              autoFocus={autoFocus && index === 0}
              maxLength={1}
              onFocus={() => this.onFocus(index)}
              value={this.state.codeArr[index] ? this.state.codeArr[index].toString() : ''}
              onChangeText={text => this.onInputCode(text, index)}
              onKeyPress={e => this.onKeyPress(e)}
            />
          ))}
        </View>
      </View>
    );
  }
}
