import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import mainStyle from "../styles/mainStyles";
import * as color from "../colors";
import theMovieDb from "../api/theMovieDb";
import mainStyles from "../styles/mainStyles";
import Accordion from "react-native-collapsible/Accordion";
import { Image } from "react-native-elements";
import { imageUrl } from "../api/theMovieDb";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Button } from "react-native-elements";
import { navigate } from "../navigationRef";
import LastAndNext from "../components/LastAndNext";
import SeasonListtile from "../components/SeasonListtile";
import ModalMessage from "../components/ModalMessage";
import NetInfo from "@react-native-community/netinfo";

const SearchDetail = ({ navigation }) => {
  const id = navigation.getParam("id");
  const type = navigation.getParam("type");
  const url = `${type}/${id}`;

  const [data, setData] = useState(null);
  const [activeAccordion, setActiveAccordion] = useState([]);
  const [saved, setSaved] = useState(false);
  const [overviewExpanded, setOverviewExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // for message
  const [hasMessage, setHasMessage] = useState(true);
  const [messageTitle, setMessageTitle] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(0);

  useEffect(() => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        theMovieDb
          .get(url)
          .then((response) => {
            setData(response.data);
            setIsLoading(false);
            setHasMessage(false);
          })
          .catch((err) => {
            setIsLoading(false);
            setMessageTitle("Error Occured");
            setMessage("An error occured try again later.");
            setMessageType(0);
            setHasMessage(true);
            console.log(err.message.toString());
          });
      } else {
        setIsLoading(false);
        setMessageTitle("No Internet Connection");
        setMessage(
          "There is no internet connection. Check your connection and try again in a moment."
        );
        setMessageType(0);
        setHasMessage(true);
      }
    });
  }, []);

  // navigate to respective search detail
  const gotoSearchDetail = (id, type) => {
    navigate("SearchDetail", {
      id,
      type,
    });
  };

  const renderHeader = (section) => {
    return <AccorionTitle title={section.title} />;
  };

  const renderContent = (section) => {
    if (section.title === "Biography")
      return (
        <Text style={[mainStyles.text, styles.accorionParagraph]}>
          {data.biography ? data.biography : "unknown"}
        </Text>
      );
    else
      return (
        <View>
          <PersonalInfoView title='Name' value={data.name ? data.name : null} />
          <PersonalInfoView
            title='Birthday'
            value={data.birthday ? data.birthday : null}
          />
          {data.deathday ? (
            <PersonalInfoView title='Deathday' value={data.deathday} />
          ) : null}
          {data.gender ? (
            <PersonalInfoView
              title='gender'
              value={data.gender == 2 ? "Male" : "Female"}
            />
          ) : null}
          <PersonalInfoView
            title='Place of Birth'
            value={data.place_of_birth ? data.place_of_birth : null}
          />
        </View>
      );
  };

  const PersonSection = [
    {
      title: "Personal Info",
      content: "",
    },
    {
      title: "Biography",
      content: "",
    },
  ];

  if (isLoading) {
    return (
      <SafeAreaView style={mainStyle.container}>
        <StatusBar style='light' />
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator size='large' color={color.green} />
        </View>
      </SafeAreaView>
    );
  } else if (hasMessage) {
    return (
      <SafeAreaView style={mainStyle.container}>
        <StatusBar style='light' />
        <ModalMessage
          title={messageTitle}
          message={message}
          type={messageType}
          modalActive={hasMessage}
          onDone={(value) => setHasMessage(value)}
          goBack={true}
        />
      </SafeAreaView>
    );
  } else if (data !== null) {
    if (type === "person") {
      // for person
      return (
        <SafeAreaView style={mainStyle.container}>
          <StatusBar style='light' />
          <ScrollView>
            <View style={styles.containerImageWrapper}>
              <Image
                source={{
                  uri: `${imageUrl}/${data.profile_path}`,
                }}
                PlaceholderContent={
                  data.profile_path ? (
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
            <Text
              style={[
                mainStyles.text,
                {
                  textAlign: "center",
                  marginVertical: 8,
                  fontSize: 18,
                  fontWeight: "bold",
                },
              ]}>
              {data.name}
            </Text>
            <Accordion
              activeSections={activeAccordion}
              sections={PersonSection}
              renderHeader={renderHeader}
              renderContent={renderContent}
              onChange={setActiveAccordion}
            />
            <View style={{ height: 50 }}></View>
          </ScrollView>
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView style={mainStyle.container}>
          <StatusBar style='light' />
          <ScrollView>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                paddingHorizontal: 20,
                position: "absolute",
                top: 0,
                right: 0,
                zIndex: 100,
              }}>
              <TouchableOpacity onPress={() => setSaved(!saved)}>
                <MaterialIcons
                  name={saved ? "bookmark" : "bookmark-border"}
                  size={30}
                  color={saved ? color.green : color.sand}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.containerImageWrapper}>
              <Image
                source={{
                  uri: `${imageUrl}/${data.poster_path}`,
                }}
                PlaceholderContent={
                  data.poster_path ? (
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
            <View>
              <Text style={[mainStyles.text, styles.movieTitle]}>
                {data.original_title ? data.original_title : data.original_name}
              </Text>
              <View style={styles.movieGenres}>
                {data.genres ? data.genres.map((item, index) => {
                  return (
                    <Text
                      key={index}
                      style={[mainStyles.text, styles.movieGenresText]}>
                      {item.name}
                    </Text>
                  );
                }) : null}
              </View>
              <Text
                style={[
                  mainStyles.text,
                  { paddingHorizontal: 16, textAlign: "justify" },
                ]}>
                {data.overview.toString().length > 200
                  ? overviewExpanded
                    ? data.overview
                    : data.overview.toString().slice(0, 200) + "..."
                  : data.overview}
              </Text>
              {type === "tv" && overviewExpanded ? (
                <PersonalInfoView
                  title='Number of Seasons'
                  value={data.number_of_seasons ? data.number_of_seasons : null}
                />
              ) : null}
              {type === "tv" && overviewExpanded ? (
                <PersonalInfoView
                  title='Number of Episodes'
                  value={
                    data.number_of_episodes ? data.number_of_episodes : null
                  }
                />
              ) : null}
              {type === "tv" && overviewExpanded ? (
                <PersonalInfoView
                  title='First Air Date'
                  value={data.first_air_date ? data.first_air_date : null}
                />
              ) : null}
              {type === "tv" && overviewExpanded ? (
                <PersonalInfoView
                  title='Last Air Date'
                  value={data.last_air_date ? data.last_air_date : null}
                />
              ) : null}
              {type === "tv" && overviewExpanded ? (
                <PersonalInfoView
                  title='In Production'
                  value={
                    data.in_production
                      ? data.in_production == true
                        ? "Yes"
                        : "No"
                      : null
                  }
                />
              ) : null}
              {type === "tv" && overviewExpanded ? (
                data.created_by.length > 0 ? (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{
                        marginLeft: 18,
                        marginTop: 5,
                        fontWeight: "bold",
                        color: "white",
                      }}>
                      Created By
                    </Text>
                    <AntDesign
                      name='caretdown'
                      size={12}
                      color='white'
                      style={{ marginLeft: 5, marginTop: 5 }}
                    />
                  </View>
                ) : null
              ) : null}
              {type === "tv" && overviewExpanded
                ? data.created_by.length > 0
                  ? data.created_by.map((item, index) => {
                      return (
                        <View style={{ paddingHorizontal: 18 }} key={index}>
                          <TouchableOpacity
                            onPress={() => gotoSearchDetail(item.id, "person")}>
                            <Text
                              style={{
                                color: color.green,
                                fontWeight: "bold",
                              }}>
                              {item.name}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      );
                    })
                  : null
                : null}
              <Button
                title={overviewExpanded ? "show less" : "show more"}
                type='clear'
                buttonStyle={{
                  padding: 0,
                  margin: 0,
                  marginBottom: 15,
                }}
                titleStyle={{
                  color: color.green,
                }}
                onPress={() => {
                  setOverviewExpanded(!overviewExpanded);
                }}
              />
              {data.last_episode_to_air || data.next_episode_to_air ? (
                <View style={{ height: 8 }}></View>
              ) : null}
              {type === "tv" ? (
                <LastAndNext
                  last={data.last_episode_to_air}
                  next={data.next_episode_to_air}
                />
              ) : null}
              {type === "tv"
                ? data.seasons
                  ? data.seasons.map((item, index) => {
                      return <SeasonListtile key={index} item={item} />;
                    })
                  : null
                : null}
              <View style={{ height: 8 }}></View>
              {type === "movie" ? (
                <PersonalInfoView
                  title='Release date'
                  value={data.release_date ? data.release_date : null}
                />
              ) : null}
              {type === "movie" ? (
                <PersonalInfoView
                  title='Budget'
                  value={data.budget ? `${moneyConversion(data.budget)}` : null}
                />
              ) : null}
              {type === "movie" ? (
                <PersonalInfoView
                  title='Revenue'
                  value={
                    data.revenue ? `${moneyConversion(data.revenue)}` : null
                  }
                />
              ) : null}
              {type === "movie" ? (
                <PersonalInfoView
                  title='Runtime'
                  value={data.runtime ? timeConvert(data.runtime) : null}
                />
              ) : null}
              {type === "movie" ? (
                <PersonalInfoView
                  title='Status'
                  value={data.status ? data.status : null}
                />
              ) : null}
              <View style={{ height: 50 }}></View>
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    }
  }

  return (
    <SafeAreaView style={mainStyle.container}>
      <StatusBar style='light' />
    </SafeAreaView>
  );
};

const AccorionTitle = ({ title }) => {
  return (
    <View style={styles.accordionTitleContainer}>
      <Text style={[mainStyles.text, styles.accordionTitleText]}>{title}</Text>
      <AntDesign name='caretdown' size={14} color='white' />
    </View>
  );
};

const PersonalInfoView = ({ title, value }) => {
  if (title === null || value === null) return null;
  return (
    <View style={styles.personalInfoContainer}>
      <Text style={[mainStyles.text, styles.personalInfoTitle]}>{title}</Text>
      <Text style={[mainStyles.text, styles.personalInfoValue]}>{value}</Text>
    </View>
  );
};

const moneyConversion = (value) => {
  return value.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

const timeConvert = (time) => {
  var hours = Math.floor(time / 60);
  var minutes = time % 60;
  return hours + "hr " + minutes + "mins";
};

export default SearchDetail;

const styles = StyleSheet.create({
  accordionTitleContainer: {
    paddingHorizontal: 15,
    backgroundColor: color.black,
    marginVertical: 5,
    marginHorizontal: 15,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  accordionTitleText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  accorionParagraph: {
    textAlign: "justify",
    color: color.sand,
    paddingHorizontal: 16,
    fontSize: 12,
  },
  containerImageWrapper: {
    width: "100%",
    height: 240,
  },
  containerImage: {
    height: "100%",
    width: "100%",
  },
  personalInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    flexWrap: "wrap",
  },
  personalInfoTitle: {
    marginRight: 4,
    fontWeight: "bold",
  },
  personalInfoValue: {
    marginLeft: 4,
    color: color.sand,
    fontWeight: "bold",
  },
  movieTitle: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginVertical: 5,
  },
  movieGenres: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  movieGenresText: {
    backgroundColor: color.black,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 12,
    marginHorizontal: 5,
  },
});

// for navigation header
SearchDetail.navigationOptions = {
  headerTitle: "",
  headerTintColor: "white",
  headerStyle: {
    backgroundColor: color.grey,
    elevation: 0, // remove shadow on Android
    shadowOpacity: 0, // remove shadow on iOS
    borderBottomWidth: 0,
    borderBottomColor: color.grey,
    height: 60,
  },
};
