import { StyleSheet } from 'react-native';
import config from './config';

const styles = StyleSheet.create({
  headerTxt: {
    fontSize: 18,
    fontWeight: '700',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  flex: {
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  hCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: config.primaryColor,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
  },
});

export default styles;
