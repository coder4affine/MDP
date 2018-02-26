import { StyleSheet, Dimensions, Platform } from 'react-native';
import * as config from '../styleConfig.json';

const window = Dimensions.get('window');
export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width / 7;

const styles = StyleSheet.create({
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
  header: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    paddingBottom: 15,
    textShadowColor: config.PrimaryDarkest,
    textShadowRadius: 10,
    textShadowOffset: { width: 1, height: 2 },
  },
  pageTitle: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#6a6a6a',
    marginTop: 15,
    marginBottom: 7,
  },
  subTitle: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#6a6a6a',
    marginTop: 15,
    marginBottom: 7,
  },
  errorText: {
    color: config.errorColor,
    fontSize: 12,
    fontWeight: 'normal',
    marginTop: 3,
  },
  errorColor: {
    color: config.errorColor,
  },
  alignTextCenter: {
    textAlign: 'center',
  },
  link: {
    marginTop: 15,
    fontSize: 15,
    fontWeight: '500',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 4,
  },
  headerTxt: {
    fontSize: 18,
    fontWeight: '700',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 4,
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
