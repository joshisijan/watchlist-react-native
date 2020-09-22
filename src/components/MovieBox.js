import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Image } from "react-native-elements";
import * as color from "../colors";
import mainStyles from "../styles/mainStyles";
import { imageUrl } from "../api/theMovieDb";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
import { navigate } from "../navigationRef";

const HorizontalSpacer = () => {
  return <View style={styles.horizontalSpacer}></View>;
};

// navigate to respective search detail
const gotoSearchDetail = (id, type) => {
  navigate("SearchDetail", {
    id,
    type,
  });
};

const MovieBox = ({ item }) => {
  const [saved, setSaved] = useState(false);

  if (item.media_type === "person") {
    // for person
    return (
      <TouchableOpacity
        onPress={() => gotoSearchDetail(item.id, item.media_type)}>
        <View style={styles.container}>
          <View style={styles.containerImageWrapper}>
            <Image
              source={{
                uri: `${imageUrl}${item.profile_path}`,
              }}
              PlaceholderContent={
                item.profile_path !== null ? (
                  <ActivityIndicator />
                ) : (
                  <Ionicons name='ios-person' size={24} color={color.grey} />
                )
              }
              style={styles.containerImage}
              resizeMode='contain'
            />
          </View>
          <HorizontalSpacer />
          <View>
            <Text style={[mainStyles.text, styles.title]}>{item.name}</Text>
            <View style={styles.topBar}>
              <Text style={[mainStyles.text, styles.topBarText]}>
                {item.media_type}
              </Text>
            </View>
            {item.known_for ? (
              <Text
                style={[mainStyles.text, { fontWeight: "bold", fontSize: 12 }]}>
                Known For:
              </Text>
            ) : null}
            <FlatList
              data={item.known_for}
              keyExtractor={(listItem, index) => {
                return index.toString() + listItem.id.toString();
              }}
              renderItem={(listItem) => (
                <TouchableOpacity
                  onPress={() =>
                    gotoSearchDetail(listItem.item.id, listItem.item.media_type)
                  }>
                  <Text
                    style={[
                      mainStyles.text,
                      {
                        fontWeight: "bold",
                        fontSize: 12,
                        color: color.sand,
                        marginVertical: 2,
                        padding: 5,
                      },
                    ]}>
                    {listItem.item.original_title
                      ? listItem.item.original_title
                      : listItem.item.original_name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  } else if (item.media_type == "tv") {
    //  form tv
    return (
      <TouchableOpacity
        onPress={() => gotoSearchDetail(item.id, item.media_type)}>
        <View style={styles.container}>
          <View style={styles.containerImageWrapper}>
            <Image
              source={{
                uri: `${imageUrl}${item.poster_path}`,
              }}
              PlaceholderContent={
                item.poster_path !== null ? (
                  <ActivityIndicator />
                ) : (
                  <Feather name='image' size={24} color={color.grey} />
                )
              }
              style={styles.containerImage}
              resizeMode='contain'
            />
          </View>
          <HorizontalSpacer />
          <View style={styles.containerContent}>
            <Text style={[mainStyles.text, styles.title]}>
              {item.original_name}
            </Text>
            <View style={styles.topBar}>
              <Text style={[mainStyles.text, styles.topBarText]}>
                {item.media_type}
              </Text>
            </View>
            <Text style={[mainStyles.text, styles.description]}>
              {sliceOverview(item.overview)}
            </Text>
            <TouchableOpacity
              onPress={() => setSaved(!saved)}
              style={{ alignSelf: "flex-end" }}>
              <MaterialIcons
                name={saved ? "bookmark" : "bookmark-border"}
                size={30}
                color={saved ? color.green : color.sand}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  //  for movie
  return (
    <TouchableOpacity
      onPress={() => gotoSearchDetail(item.id, item.media_type)}>
      <View style={styles.container}>
        <View style={styles.containerImageWrapper}>
          <Image
            source={{
              uri: `${imageUrl}${item.poster_path}`,
            }}
            PlaceholderContent={
              item.poster_path !== null ? (
                <ActivityIndicator
                  size='large'
                  style={{ color: color.green }}
                />
              ) : (
                <Feather name='image' size={24} color={color.grey} />
              )
            }
            style={styles.containerImage}
            resizeMode='contain'
          />
        </View>
        <HorizontalSpacer />
        <View style={styles.containerContent}>
          <Text style={[mainStyles.text, styles.title]}>
            {item.original_title}
          </Text>
          <View style={styles.topBar}>
            <Text style={[mainStyles.text, styles.topBarText]}>
              {item.media_type}
            </Text>
          </View>
          <Text style={[mainStyles.text, styles.description]}>
            {sliceOverview(item.overview)}
          </Text>
          <TouchableOpacity
            onPress={() => setSaved(!saved)}
            style={{ alignSelf: "flex-end" }}>
            <MaterialIcons
              name={saved ? "bookmark" : "bookmark-border"}
              size={30}
              color={saved ? color.green : color.sand}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const sliceOverview = (text) => {
  if (text.length <= 200) {
    return text.slice(0, 200);
  }
  return text.slice(0, 200) + "...";
};

export default MovieBox;

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.black,
    margin: 5,
    padding: 15,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  containerImageWrapper: {
    width: 90,
    height: 160,
  },
  containerImage: {
    height: "100%",
    width: "100%",
  },
  containerContent: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    margin: 5,
  },
  description: {
    fontSize: 12,
    textAlign: "justify",
    color: color.sand,
  },
  topBar: {
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  topBarText: {
    fontSize: 12,
    fontWeight: "bold",
    color: color.sand,
    backgroundColor: color.grey,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  horizontalSpacer: {
    width: 10,
  },
});
