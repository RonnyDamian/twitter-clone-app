import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";

import Entypo from "@expo/vector-icons/Entypo";
import EvilIcons from "@expo/vector-icons/EvilIcons";

export default function TweetScreen({ navigation }) {
  function goToProfile() {
    navigation.navigate("Profile Screen");
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <TouchableOpacity style={styles.flexRow} onPress={() => goToProfile()}>
          <Image
            style={styles.avatar}
            source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
          />
          <View>
            <Text style={styles.tweetName}>Ronny Rodriguez</Text>
            <Text style={styles.tweetHandle}>@rrodriguez</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Entypo name="dots-three-vertical" size={24} color="gray" />
        </TouchableOpacity>
      </View>

      <View style={styles.tweetContentContainer}>
        <Text style={styles.tweetContent}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          eum dignissimos, rerum adipisci natus laudantium aut, ullam totam
          exercitationem ut, earum accusantium in pariatur dolor molestias neque
          sint culpa nihil!
        </Text>
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
});
