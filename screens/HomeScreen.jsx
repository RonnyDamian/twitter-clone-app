import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { formatDistanceToNowStrict } from "date-fns";
import locale from "date-fns/locale/en-US";
import formatDistance from "../helpers/formatDistanceCustom";
import axiosConfig from "../helpers/axiosConfig";

export default function HomeScreen({ navigation, route }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [isAtEndOfScrolling, setIsAtEndOfScrolling] = useState(false);
  const flatListRef = useRef();

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

  function goToProfile(userId) {
    navigation.navigate("Profile Screen", {
      userId: userId,
    });
  }

  function goToSigleScreen(tweetId) {
    navigation.navigate("Tweet Screen", { tweetId: tweetId });
  }

  function goToNewTweet() {
    navigation.navigate("New Tweet");
  }

  const renderItem = ({ item: tweet }) => {
    return (
      <View style={styles.tweetContainer}>
        <TouchableOpacity onPress={() => goToProfile(tweet.user.id)}>
          <Image style={styles.avatar} source={{ uri: tweet.user.avatar }} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={styles.flexRow}
            onPress={() => goToSigleScreen(tweet.id)}
          >
            <Text style={styles.tweetName} numberOfLines={1}>
              {tweet.user.name}
            </Text>
            <Text style={styles.tweetHandle} numberOfLines={1}>
              @{tweet.user.username}
            </Text>
            <Text>&middot;</Text>
            <Text style={styles.tweetHandle} numberOfLines={1}>
              {formatDistanceToNowStrict(new Date(tweet.created_at), {
                locale: {
                  ...locale,
                  formatDistance,
                },
              })}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tweetContentContainer}
            onPress={() => goToSigleScreen(tweet.id)}
          >
            <Text style={styles.tweetContent}>{tweet.body}</Text>
          </TouchableOpacity>
          <View style={styles.tweetEngagement}>
            <TouchableOpacity style={styles.flexRow}>
              <EvilIcons
                name="comment"
                size={24}
                color="gray"
                style={{ marginRight: 2 }}
              />
              <Text style={styles.textGray}>456</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.flexRow, styles.ml4]}>
              <EvilIcons
                name="retweet"
                size={24}
                color="gray"
                style={{ marginRight: 2 }}
              />
              <Text style={styles.textGray}>456</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.flexRow, styles.ml4]}>
              <EvilIcons
                name="heart"
                size={24}
                color="gray"
                style={{ marginRight: 2 }}
              />
              <Text style={styles.textGray}>4,456</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.flexRow, styles.ml4]}>
              <EvilIcons
                name={Platform.OS === "ios" ? "share-apple" : "share-google"}
                size={24}
                color="gray"
                style={{ marginRight: 2 }}
              />
              <Text style={styles.textGray}>456</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator style={styles.preloader} size="large" color="gray" />
      ) : (
        <FlatList
          //ref={flatListRef}
          data={data}
          renderItem={renderItem}
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
  tweetContainer: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 8,
    borderRadius: 21,
  },
  flexRow: {
    flexDirection: "row",
  },
  tweetName: {
    fontWeight: "bold",
    color: "#222",
  },
  tweetHandle: {
    marginHorizontal: 8,
    color: "gray",
  },
  tweetContentContainer: {
    margin: 8,
  },
  tweetContent: {
    lineHeight: 22,
  },
  textGray: {
    color: "gray",
  },
  tweetEngagement: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  ml4: {
    marginLeft: 16,
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
  preloader: {
    marginVertical: 10,
  },
});
