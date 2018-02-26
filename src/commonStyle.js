import { StyleSheet, Dimensions, Platform } from 'react-native';
import * as config from './config.json';

const window = Dimensions.get('window');
export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width / 7;

const styles = StyleSheet.create({
  headerTxt: {
    fontSize: 18,
    fontWeight: '700',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 4,
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
  container: {
    backgroundColor: '#4c69a5',
    flex: 1,
  },
  logo: {
    height: IMAGE_HEIGHT,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: 20,
  },
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
});

export default styles;
