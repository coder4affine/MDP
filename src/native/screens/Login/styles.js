import { StyleSheet } from 'react-native';
import * as config from '../../../styleConfig.json';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 10,
    backgroundColor: config.PrimaryDark,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  logo: {
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});

export default styles;
