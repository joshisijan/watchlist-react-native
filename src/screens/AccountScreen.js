import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from 'expo-status-bar';
import * as color from '../colors';
import mainStyle from '../styles/mainStyles';

const AccountScreen = () => {
  return (
    <SafeAreaView style={mainStyle.container}>
      <StatusBar style="light" />
      <View>
      <Text style={mainStyle.headerText}>My Account</Text>
      </View>
    </SafeAreaView>
  );
};

AccountScreen.navigationOptions = {
  tabBarLabel: "My Account",
  tabBarIcon: ({focused}) => {
    return <Ionicons name='ios-person' size={24} color={focused ? 'white' : color.sand} />
  },
};

export default AccountScreen;

const styles = StyleSheet.create({
});
