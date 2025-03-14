import React, {useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import axiosConfig from "../helpers/axiosConfig";
import { format } from "date-fns";
import { useFocusEffect } from "@react-navigation/native";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28b12",
    title: "Four Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f13",
    title: "Five Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d14",
    title: "Six Item",
  },
];

const renderItem = ({ item }) => {
  return (
    <View style={styles.item}>
      <Text>item.title</Text>
    </View>
  );
};

export default function ProfileScreen({ navigation, route }) {
  const [user, setUser] = useState(null);
  

  useEffect(() => {
    getUserProfile();
  }, []);


  
  function getUserProfile() {
     
    axiosConfig
      .get(`users/${route.params.userId}`)
      .then((response) => {
        console.log("Respuesta de la API:", response.data.name); // Verifica qué devuelve la API
        if (!response.data || Object.keys(response.data).length === 0) {
          console.error("Error: La API devolvió un objeto vacío o incorrecto.");
          return;
        }
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
        
      });
  }

  const profileHeader = () => (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={{
          uri: "https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80",
        }}
      />
      <View style={styles.avatarContainer}>
        <Text>{user.name}</Text>
        {/* <Image style={styles.avatar} source={{ uri: user.avatar }} /> */}
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>Follow</Text>
        </TouchableOpacity>
      </View>
      
    {/*   <Image
        style={styles.backgroundImage}
        source={{
          uri: "https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80",
        }}
      />
      <View style={styles.avatarContainer}>
        <Image style={styles.avatar} source={{ uri: user.avatar }} />
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>Follow</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.profileName}>{user.name}</Text>
        <Text style={styles.profileHandle}>@{user.username}</Text>
      </View>
      <View style={styles.profileContainer}>
        <Text style={styles.profileContainerText}>{user.profile}</Text>
      </View>
      <View style={styles.locationContainer}>
        <EvilIcons name="location" size={24} color="gray" />
        <Text style={[styles.textColor, styles.textGray]}>{user.location}</Text>
      </View>
      <View style={styles.linkContainer}>
        <TouchableOpacity
          style={styles.linkItem}
          onPress={() => Linking.openURL(user.link)}
        >
          <EvilIcons name="link" size={24} color="gray" />
          <Text style={styles.linkColor}>{user.linkText}</Text>
        </TouchableOpacity>
        <View style={[styles.linkItem, styles.ml4]}>
          <EvilIcons name="calendar" size={24} color="gray" />
          <Text style={styles.textGray}>
            Se unio en {format(new Date(user.created_at), "MMM yyyy")}
          </Text>
        </View>
      </View>
      <View
        style={{ flexDirection: "row", paddingHorizontal: 10, marginTop: 4 }}
      >
        <Text style={{ fontWeight: "bold", marginRight: 6 }}>509</Text>
        <Text style={{ marginRight: 17 }}>Following</Text>
        <Text Text style={{ fontWeight: "bold", marginRight: 6 }}>
          2,354
        </Text>
        <Text>Followers</Text>
      </View>
      <View style={styles.separator}></View> */}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator}></View>}
        ListHeaderComponent={profileHeader}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textGray: {
    color: "gray",
  },
  ml4: {
    marginLeft: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backgroundImage: {
    width: 800,
    height: 150,
  },
  avatarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 10,
    marginTop: -34,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "white",
  },
  followButton: {
    backgroundColor: "#0f1418",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
  },
  followButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  nameContainer: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginBottom: 8,
  },
  profileName: {
    fontWeight: "bold",
    fontSize: 22,
  },
  profileHandle: {
    color: "gray",
    marginTop: 1,
  },
  profileContainer: {
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  profileContainerText: {
    lineHeight: 22,
  },
  locationContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    marginBottom: 4,
  },
  linkContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  linkColor: {
    color: "#1d9bf1",
  },
  linkItem: {
    flexDirection: "row",
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingBottom: 8,
  },
  item: {
    marginVertical: 30,
    paddingHorizontal: 10,
  },
});
