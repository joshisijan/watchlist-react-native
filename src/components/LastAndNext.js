import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import mainStyles from "../styles/mainStyles";
import * as color from "../colors";

const LastAndNext = ({ last, next }) => {
  return (
    <View style={styles.container}>
      {last ? (
        <TouchableOpacity style={styles.containerLeft}>
          <View>
            <Text style={[mainStyles.text, styles.header]}>Last Episode</Text>
            {last.name ? (
              <Text style={[mainStyles.text, styles.rowTitle]}>
                {last.name}
              </Text>
            ) : null}
            {last.overview ? (
              <Text style={[mainStyles.text, styles.rowValue, {textAlign: 'justify', fontSize: 10,}]}>
                {last.overview.toString().slice(0, 200) + item.overview.toString().length > 200 ? '...' : ''}
              </Text>
            ) : null}
            {last.season_number ? (
              <View style={styles.row}>
                <Text style={[mainStyles.text, styles.rowTitle]}>Season</Text>
                <View style={{ width: 5 }}></View>
                <Text style={[mainStyles.text, styles.rowValue]}>
                  {last.season_number}
                </Text>
              </View>
            ) : null}
            {last.episode_number ? (
              <View style={styles.row}>
                <Text style={[mainStyles.text, styles.rowTitle]}>Episode</Text>
                <View style={{ width: 5 }}></View>
                <Text style={[mainStyles.text, styles.rowValue]}>
                  {last.episode_number}
                </Text>
              </View>
            ) : null}
            {last.air_date ? (
              <View style={styles.row}>
                <Text style={[mainStyles.text, styles.rowTitle]}>Date</Text>
                <View style={{ width: 5 }}></View>
                <Text style={[mainStyles.text, styles.rowValue]}>
                  {last.air_date}
                </Text>
              </View>
            ) : null}
          </View>
        </TouchableOpacity>
      ) : null}
      {next ? <View style={{ width: 20 }}></View> : null}
      {next ? (
        <TouchableOpacity style={styles.containerRight}>
          <View>
            <Text style={[mainStyles.text, styles.header]}>Next Episode</Text>
            {next.name ? (
              <Text style={[mainStyles.text, styles.rowTitle]}>
                {next.name}
              </Text>
            ) : null}
            {next.overview ? (
              <Text style={[mainStyles.text, styles.rowValue, {textAlign: 'justify', fontSize: 10,}]}>
                {next.overview.toString().slice(0, 200) + item.overview.toString().length > 200 ? '...' : ''}
              </Text>
            ) : null}
            {next.season_number ? (
              <View style={styles.row}>
                <Text style={[mainStyles.text, styles.rowTitle]}>Season</Text>
                <View style={{ width: 5 }}></View>
                <Text style={[mainStyles.text, styles.rowValue]}>
                  {next.season_number}
                </Text>
              </View>
            ) : null}
            {next.episode_number ? (
              <View style={styles.row}>
                <Text style={[mainStyles.text, styles.rowTitle]}>Episode</Text>
                <View style={{ width: 5 }}></View>
                <Text style={[mainStyles.text, styles.rowValue]}>
                  {next.episode_number}
                </Text>
              </View>
            ) : null}
            {next.air_date ? (
              <View style={styles.row}>
                <Text style={[mainStyles.text, styles.rowTitle]}>Date</Text>
                <View style={{ width: 5 }}></View>
                <Text style={[mainStyles.text, styles.rowValue]}>
                  {next.air_date}
                </Text>
              </View>
            ) : null}
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default LastAndNext;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "stretch",
  },
  containerLeft: {
    flex: 1,
    backgroundColor: color.black,
    padding: 10,
  },
  containerRight: {
    flex: 1,
    backgroundColor: color.black,
    padding: 10, 
  },
  header: {
    fontSize: 11,
    color: color.sand,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  rowTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
  },
  rowValue: {
    fontSize: 12,
    fontWeight: "bold",
    color: color.sand,
  },
});
