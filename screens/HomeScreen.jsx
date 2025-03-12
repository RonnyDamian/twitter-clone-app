import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import AntDesign from "@expo/vector-icons/AntDesign";
import axiosConfig from "../helpers/axiosConfig";
import RenderItem from "../Components/RenderItem";

export default function HomeScreen({ navigation, route }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [isAtEndOfScrolling, setIsAtEndOfScrolling] = useState(false);
  

  useEffect(() => {
    getAllTweets();
  }, [page]);

  useEffect(() => {
    if (route.params?.newTweetAdded) {
      getAllTweetsRefresh();
      //flatListRef.current.scrollToOffset({ offset: 0 });
    }
  }, [route.params?.newTweetAdded]);

  function getAllTweets() {
    axiosConfig
      .get(`/tweets?page=${page}`)
      .then((response) => {
        if (page === 1) {
          setData(response.data.data);
        } else {
          setData([...data, ...response.data.data]);
        }

        if (!response.data.next_page_url) {
          setIsAtEndOfScrolling(true);
        } else {
          setIsAtEndOfScrolling(false);
        }

        setIsLoading(false);
        setIsRefreshing(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsRefreshing(false);
        console.log(error);
      });
  }

  function getAllTweetsRefresh() {
    setPage(1);
    setIsAtEndOfScrolling(false);
    setIsRefreshing(false);

    axiosConfig
      .get(`/tweet`)
      .then((response) => {
        setData(response.data.data);
        setIsLoading(false);
        setIsRefreshing(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsRefreshing(false);
        console.log(error);
      });
  }

  function handleRefresh() {
    setPage(1);
    setIsAtEndOfScrolling(false);
    setIsRefreshing(true);
    getAllTweets();
  }

  function handleEnd() {
    setPage(page + 1);
  }

 

  function goToNewTweet() {
    navigation.navigate("New Tweet");
  }

  

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator style={styles.preloader} size="large" color="gray" />
      ) : (
        <FlatList
          //ref={flatListRef}
          data={data}
          renderItem={props => <RenderItem {...props} />}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => (
            <View style={styles.tweetSeparator}></View>
          )}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          onEndReached={handleEnd}
          onEndReachedThreshold={""}
          ListFooterComponent={() =>
            !isAtEndOfScrolling && (
              <ActivityIndicator
                style={styles.preloader}
                size="large"
                color="gray"
              />
            )
          }
        />
      )}

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => goToNewTweet()}
      >
        <AntDesign name="plus" size={22} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  
  tweetSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  floatingButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1d9bf1",
    position: "absolute",
    bottom: 20,
    right: 12,
  },
 
});
