import { StyleSheet } from "react-native";
import * as color from '../colors';

export default mainStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.grey,
  },
  text: {
    color: "white",
  },
  headerText: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 40,
    marginHorizontal: 15,
  },
  button: {
    backgroundColor: color.green,
    borderRadius: 0,
  },
  buttonTitle: {
    fontSize: 12,
  }
});