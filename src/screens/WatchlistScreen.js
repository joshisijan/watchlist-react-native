import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import * as color from '../colors';
import mainStyle from '../styles/mainStyles';

const WatchlistScreen = () => {
  return (
    <SafeAreaView style={mainStyle.container}>
      <StatusBar style="light" />
      <View>
      <Text style={mainStyle.headerText}>My Watchlist</Text>
      </View>
    </SafeAreaView>
  );
};

WatchlistScreen.navigationOptions = {
  tabBarLabel: "My Watchlist",
  tabBarIcon: ({focused}) => {
    return <Feather name="film" size={24} color={focused ? 'white' : color.sand} />;
  },
};

export default WatchlistScreen;

const styles = StyleSheet.create({
});
