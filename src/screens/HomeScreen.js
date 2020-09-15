import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import * as color from "../colors";
import mainStyle from '../styles/mainStyles';

const HomeScreen = () => {
  return (
    <SafeAreaView style={mainStyle.container}>
      <StatusBar style='light' />
      <View>
        <Text style={mainStyle.headerText}>Good Night</Text>
      </View>
    </SafeAreaView>
  );
};

HomeScreen.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => {
    return (
      <Feather name='home' size={24} color={focused ? "white" : color.sand} />
    );
  },
};

export default HomeScreen;

const styles = StyleSheet.create({
 
});
