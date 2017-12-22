import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    backgroundColor: 'red',
    position: 'absolute',
    right: -99,
    // right: 0,
    top: 60,
  },
  pinBox: {
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'black',
    height: 30,
    width: 30,
    marginRight: 14,
    justifyContent: 'center',
  },
  pinBoxList: {
    flex: -1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  pinView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'rgb(239, 239, 244)',
    paddingTop: 160,
  },
  pinPromptText: {
    marginBottom: 10,
  },
});

export default styles;
