import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as color from "../colors";
import Spacer from "../components/Spacer";
import { SearchBar, Button } from "react-native-elements";
import theMovieDb from "../api/theMovieDb";
import MovieBox from "../components/MovieBox";
import mainStyles from "../styles/mainStyles";
import { Feather } from "@expo/vector-icons";
import NetInfo from "@react-native-community/netinfo";
import ModalMessage from "../components/ModalMessage";

const SearchScreen = () => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [pressedSearch, setPressedSearch] = useState(false);
  const [changed, setChanged] = useState(false);
  // for message
  const [hasMessage, setHasMessage] = useState(false);
  const [messageTitle, setMessageTitle] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(0);

  // to show result on text change
  const multiSearch = (value) => {
    Keyboard.dismiss();
    NetInfo.fetch().then((state) => {
      if (changed === false) {
        if (totalResults === 0) {
          setMessageTitle("Nothing Found");
          setMessage(
            "No Movie, TV show or Anime found. Try changing your search term."
          );
          setMessageType(1);
          setHasMessage(true);
        }
        return null;
      }
      if (state.isConnected) {
        setResults([]);
        if (value.length > 0) {
          setPressedSearch(true);
          theMovieDb
            .get("search/multi", {
              params: { query: value.toString(), include_adult: true },
            })
            .then((response) => {
              setResults(response.data.results);
              setCurrentPage(response.data.page);
              setTotalResults(response.data.total_results);
              setTotalPages(response.data.total_pages);
              setPressedSearch(false);
              if (response.data.total_results === 0) {
                setMessageTitle("Nothing Found");
                setMessage(
                  "No Movie, TV show or Anime found. Try changing your search term."
                );
                setMessageType(1);
                setHasMessage(true);
              }
              setChanged(false);
            })
            .catch((err) => {
              setPressedSearch(false);
              setMessageTitle("Error Occured");
              setMessage("An error occured try again later.");
              setMessageType(0);
              setHasMessage(true);
              setChanged(true);
              console.log(err.message.toString());
            });
        }
      } else {
        setMessageTitle("No Internet Connection");
        setMessage(
          "There is no internet connection. Check your connection and try again in a moment."
        );
        setMessageType(0);
        setHasMessage(true);
      }
    });
  };

  //to load more
  const loadMore = () => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        setLoadMoreLoading(true);
        if (currentPage < totalPages) {
          theMovieDb
            .get("search/multi", {
              params: {
                query: query.toString(),
                include_adult: true,
                page: `${currentPage + 1}`,
              },
            })
            .then((response) => {
              setResults([...results, ...response.data.results]);
              setCurrentPage(response.data.page);
              setLoadMoreLoading(false);
            })
            .catch((err) => {
              setMessageTitle("Error Occured");
              setMessage("An error occured try again later.");
              setMessageType(0);
              setHasMessage(true);
              console.log(err.message.toString());
              setLoadMoreLoading(false);
            });
        }
      } else {
        setMessageTitle("No Internet Connection");
        setMessage(
          "There is no internet connection. Check your connection and try again in a moment."
        );
        setHasMessage(true);
      }
    });
  };
  return (
    <SafeAreaView style={mainStyles.container}>
      <StatusBar style='light' />
      <ModalMessage
        title={messageTitle}
        message={message}
        type={messageType}
        modalActive={hasMessage}
        onDone={(value) => setHasMessage(value)}
      />
      <View>
        <FlatList
          keyboardShouldPersistTaps='handled'
          ListHeaderComponent={
            <>
              <Text style={mainStyles.headerText}>Search</Text>
              <Spacer>
                <Text style={mainStyles.text}>
                  Search your favourite Movies, TV Shows and Animes here.
                </Text>
              </Spacer>
              <SearchBar
                placeholder='Search Movies, TV Shows and Animes'
                autoCapitalize='none'
                autoCorrect={false}
                inputContainerStyle={{
                  backgroundColor: "white",
                  borderRadius: 0,
                }}
                containerStyle={{
                  backgroundColor: color.grey,
                  borderTopWidth: 0,
                  borderBottomWidth: 0,
                  padding: 15,
                }}
                inputStyle={{
                  color: color.black,
                  fontSize: 14,
                }}
                showLoading={false}
                value={query}
                onSubmitEditing={(value) => {
                  multiSearch(value.nativeEvent.text);
                }}
                onChangeText={(value) => {
                  setChanged(true);
                  setQuery(value);
                  setResults([]);
                  setCurrentPage(0);
                  setTotalPages(0);
                  if (pressedSearch) setPressedSearch(false);
                }}
              />
              {results.length <= 0 && !pressedSearch ? (
                <Spacer>
                  <Button
                    title='Search'
                    buttonStyle={mainStyles.button}
                    titleStyle={mainStyles.buttonTitle}
                    icon={
                      <Feather
                        name='search'
                        size={14}
                        color='white'
                        style={{ marginHorizontal: 5 }}
                      />
                    }
                    onPress={() => multiSearch(query)}
                  />
                </Spacer>
              ) : null}
              {results.length > 0 ? (
                <View>
                  <View style={styles.searchHeader}>
                    <Text style={[mainStyles.text, { fontWeight: "bold" }]}>
                      Search Result for{" "}
                    </Text>
                    <Text
                      style={[
                        mainStyles.text,
                        { fontWeight: "bold", color: color.green },
                      ]}>
                      {query}:
                    </Text>
                  </View>
                  <Text style={[mainStyles.text, styles.totalResults]}>
                    ({totalResults} results)
                  </Text>
                </View>
              ) : pressedSearch ? (
                <ActivityIndicator color={color.green} size='large' />
              ) : null}
            </>
          }
          data={results}
          keyExtractor={(item, index) => {
            return index.toString() + item.toString();
          }}
          renderItem={({ item }) =>
            results.length > 0 ? <MovieBox item={item} /> : null
          }
          ListFooterComponent={
            <>
              {query.length > 0 ? (
                currentPage < totalPages ? (
                  results.length > 0 ? (
                    <Spacer>
                      <Button
                        title='Load More'
                        buttonStyle={mainStyles.button}
                        titleStyle={mainStyles.buttonTitle}
                        onPress={() => loadMore()}
                        loading={loadMoreLoading}
                        loadingStyle={{ height: 12 }}
                      />
                    </Spacer>
                  ) : (
                    <ActivityIndicator
                      style={{ marginVertical: 20 }}
                      size='large'
                      color={color.green}
                    />
                  )
                ) : null
              ) : null}
            </>
          }
        />
      </View>
    </SafeAreaView>
  );
};

SearchScreen.navigationOptions = {
  headerShown: false,
};

export default SearchScreen;

const styles = StyleSheet.create({
  searchHeader: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  totalResults: {
    textAlign: "center",
    fontStyle: "italic",
  },
});
