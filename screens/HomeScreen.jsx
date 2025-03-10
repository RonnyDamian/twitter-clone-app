import React, { useEffect, useState } from "react";
import {
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
import axios from "axios";
import { formatDistanceToNowStrict } from "date-fns";
import locale from "date-fns/locale/en-US";
import formatDistance from "../helpers/formatDistanceCustom";

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllTweets();
  }, []);

  function getAllTweets() {
    axios
      .get("http://172.16.3.215:8000/api/tweets")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function goToProfile() {
    navigation.navigate("Profile Screen");
  }

  function goToSigleScreen() {
    navigation.navigate("Tweet Screen");
  }

  function goToNewTweet() {
    navigation.navigate("New Tweet");
  }

  const renderItem = ({ item: tweet }) => {
    return (
      <View style={styles.tweetContainer}>
        <TouchableOpacity onPress={() => goToProfile()}>
          <Image style={styles.avatar} source={{ uri: tweet.user.avatar }} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={styles.flexRow}
            onPress={() => goToSigleScreen()}
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
            onPress={() => goToSigleScreen()}
          >
            <Text style={styles.tweetContent}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Cupiditate corporis magnam corrupti nam accusamus pariatur magni,
              nesciunt ex quam possimus, blanditiis quidem sint repellat
              excepturi! Voluptas perferendis similique laborum libero?
            </Text>
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
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => (
          <View style={styles.tweetSeparator}></View>
        )}
      />

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
});
