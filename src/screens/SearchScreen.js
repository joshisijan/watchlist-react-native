import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { StatusBar } from 'expo-status-bar';
import * as color from "../colors";
import Spacer from "../components/Spacer";
import { Input } from "react-native-elements";
import mainStyle from '../styles/mainStyles';

const SearchScreen = () => {
  return (
    <SafeAreaView style={mainStyle.container}>
      <StatusBar style="light" />
      <View>
      <Text style={mainStyle.headerText}>Search</Text>
      <Spacer>
      <Text style={mainStyle.text}>
        Search your favourite Movies, TV Shows and Animes here.
      </Text>
      </Spacer>
      <Input
          placeholder="Search Movies, TV Shows and Animes"
          style={styles.searchBox}
          placeholderTextColor={color.black}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
    </SafeAreaView>
  );
};

SearchScreen.navigationOptions = {
  tabBarLabel: "Search",
  tabBarIcon: ({ focused }) => {
    return (
      <Feather name='search' size={24} color={focused ? "white" : color.sand} />
    );
  },
};

export default SearchScreen;

const styles = StyleSheet.create({
  searchBox: {
    backgroundColor: 'white',
    color: color.black,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 14,
  }
});
