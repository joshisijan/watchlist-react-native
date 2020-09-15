import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import Spacer from "../components/Spacer";
import { AntDesign } from "@expo/vector-icons";
import * as color from "../colors";
import mainStyles from "../styles/mainStyles";

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar style='light' />
      <Spacer>
        <Text style={styles.title}>Watchlist</Text>
        <Text style={styles.text}>
          Save your favourite Movies and TV Shows to Watchlist and never forget
          them.
        </Text>
        <Spacer />
        <Button
          icon={
            <AntDesign
              name='google'
              size={24}
              color='white'
              style={styles.buttonIcon}
            />
          }
          title='Continue with Google Account'
          raised
        />
        <Spacer />
      <Button title='Continue without signing in' type="clear" titleStyle={{color: color.sand}} />
      </Spacer>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
  text: {
    color: "white",
  },
  container: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: color.black,
  },
  buttonIcon: {
    marginHorizontal: 15,
  },
  button: {
    backgroundColor: color.green,
    color: 'red'
  }
});
