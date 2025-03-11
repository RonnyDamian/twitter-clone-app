import React, { Component, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  ActivityIndicator,
} from "react-native";

import Entypo from "@expo/vector-icons/Entypo";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import axios from "../helpers/axiosConfig";
import { format } from "date-fns";

export default function TweetScreen({ navigation, route }) {
  const [tweet, setTweet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTweet();
  }, []);

  function getTweet() {
    axios
      .get(`/tweets/${route.params.tweetId}`)
      .then((response) => {
        setTweet(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  }

  function goToProfile() {
    navigation.navigate("Profile Screen");
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator style={styles.preloader} size="large" color="gray" />
      ) : (
        <>
          <View style={styles.profileContainer}>
            <TouchableOpacity
              style={styles.flexRow}
              onPress={() => goToProfile()}
            >
              <Image
                style={styles.avatar}
                source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
              />
              <View>
                <Text style={styles.tweetName}>{tweet.user.name}</Text>
                <Text style={styles.tweetHandle}>@{tweet.user.username}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <Entypo name="dots-three-vertical" size={24} color="gray" />
            </TouchableOpacity>
          </View>

          <View style={styles.tweetContentContainer}>
            <Text style={styles.tweetContent}>{tweet.body}</Text>
            <View style={styles.tweetTimestampContainer}>
              <Text style={styles.tweetTimestampText}>
                {format(new Date(tweet.created_at), "h:mm a")}
              </Text>
              <Text style={styles.tweetTimestampText}>&middot;</Text>
              <Text style={styles.tweetTimestampText}>
                {format(new Date(tweet.created_at), "d MMM.yy")}
              </Text>
              <Text style={styles.tweetTimestampText}>&middot;</Text>
              <Text style={[styles.tweetTimestampText, styles.linkColor]}>
                X for Iphone
              </Text>
            </View>
          </View>

          <View style={styles.tweetEngagement}>
            <View style={styles.flexRow}>
              <Text style={styles.tweetEngagementNumber}>624</Text>
              <Text style={styles.tweetEngagementLabel}>Retweets</Text>
            </View>
            <View style={styles.flexRow}>
              <Text style={styles.tweetEngagementNumber}>624</Text>
              <Text style={styles.tweetEngagementLabel}>Retweets</Text>
            </View>
            <View style={styles.flexRow}>
              <Text style={styles.tweetEngagementNumber}>624</Text>
              <Text style={styles.tweetEngagementLabel}>Retweets</Text>
            </View>
          </View>
          <View style={styles.tweetEngagementIcon}>
            <TouchableOpacity style={styles.flexRow}>
              <EvilIcons name="comment" size={28} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.flexRow}>
              <EvilIcons name="retweet" size={28} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.flexRow}>
              <EvilIcons name="heart" size={28} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.flexRow}>
              <EvilIcons
                name={Platform.OS === "ios" ? "share-apple" : "share-google"}
                size={28}
                color="gray"
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  profileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  flexRow: {
    flexDirection: "row",
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 8,
    borderRadius: 21,
  },
  tweetName: {
    fontWeight: "bold",
    color: "#222",
  },
  tweetHandle: {
    marginTop: 2,
    color: "gray",
  },
  tweetContentContainer: {
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  tweetContent: {
    fontSize: 20,
    lineHeight: 30,
  },
  tweetEngagement: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  tweetEngagementNumber: {
    fontWeight: "bold",
  },
  tweetEngagementLabel: {
    color: "gray",
    marginLeft: 6,
  },
  tweetEngagementIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  tweetTimestampContainer: {
    flexDirection: "row",
    marginTop: 12,
  },
  tweetTimestampText: {
    color: "gray",
    marginRight: 8,
  },
  linkColor: {
    color: "#1d9bf1",
  },
});
