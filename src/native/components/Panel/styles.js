import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  title: {
    color: '#2a2f43',
    fontWeight: 'bold',
  },
  subTitle: {
    color: '#2a2f43',
    fontWeight: 'bold',
  },
  iconStyle: {
    margin: 10,
  },
  buttonImage: {
    width: 30,
    height: 25,
  },
  body: {
    padding: 10,
    paddingTop: 0,
  },
});

export default styles;
