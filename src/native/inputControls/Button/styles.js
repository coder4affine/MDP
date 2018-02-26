import { StyleSheet } from 'react-native';
import * as config from '../../../styleConfig.json';

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#003c8f',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  disabled: {
    backgroundColor: config.disabledColor,
  },
  text: { color: 'white' },
});

export default styles;
