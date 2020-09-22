import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import mainStyles from "../styles/mainStyles";
import * as color from "../colors";
import { imageUrl } from "../api/theMovieDb";

const SeasonListtile = ({ item }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {}}
      >
        <View style={styles.container}>
          <View style={styles.containerImageWrapper}>
            <Image
              source={{
                uri: `${imageUrl}/${item.poster_path}`,
              }}
              PlaceholderContent={
                item.poster_path ? (
                  <ActivityIndicator size='large' color={color.green} />
                ) : (
                  <Feather name='image' size={24} color={color.sand} />
                )
              }
              style={styles.containerImage}
              placeholderStyle={{
                backgroundColor: color.grey,
              }}
              resizeMode='contain'
            />
          </View>
          <View style={styles.containerDetail}>
          {item.name ? (
              <Text style={[mainStyles.text, styles.rowTitle]}>{item.name}</Text>
            ) : null}
            {item.season_number || item.season_number === 0 ? (
              <View style={styles.row}>
                <Text style={[mainStyles.text, styles.rowTitle]}>Season</Text>
                <Text style={[mainStyles.text, styles.rowValue]}>
                  {item.season_number}
                </Text>
              </View>
            ) : null}
            {item.episode_count ? (
              <View style={styles.row}>
                <Text style={[mainStyles.text, styles.rowTitle]}>Episodes</Text>
                <Text style={[mainStyles.text, styles.rowValue]}>
                  {item.episode_count}
                </Text>
              </View>
            ) : null}
            {item.air_date ? (
              <View style={styles.row}>
                <Text style={[mainStyles.text, styles.rowTitle]}>Air date</Text>
                <Text style={[mainStyles.text, styles.rowValue]}>
                  {item.air_date}
                </Text>
              </View>
            ) : null}
            {item.overview ? (
              <Text style={[mainStyles.text, styles.rowValue, {marginTop: 5, fontSize: 10,}]}>
              {item.overview.toString().slice(0, 150) + item.overview.toString().length > 150 ? '...' : ''}
            </Text>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SeasonListtile;

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginHorizontal: 20,
    backgroundColor: color.black,
    flexDirection: "row",
  },
  containerImageWrapper: {
    width: 72.9,
    height: 129.6,
  },
  containerImage: {
    height: "100%",
    width: "100%",
  },
  containerDetail: {
    flex: 1,
    padding: 15,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  rowTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
    marginRight: 5,
  },
  rowValue: {
    fontSize: 12,
    fontWeight: "bold",
    color: color.sand,
  },
});
