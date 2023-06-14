import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";


export default function PostSingleOverlay({ user, post }) {

  useEffect(() => {
    console.log('in Post Single Overlav useEffect')
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.displayName}>{"User name"}</Text>
        <Text style={styles.description}>{post.content}</Text>
      </View>

      <View style={styles.leftContainer}>
        <TouchableOpacity
          onPress={() => {}}>
          {/*<Image style={styles.avatar} source={{ uri: user?.photoURL }} />*/}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => {}}
        >
          <Ionicons
            color="white"
            size={40}
            name={"heart-outline"}
          />
          <Text style={styles.actionButtonText}>
            {0}
          </Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={styles.actionButton}
          onPress={() =>{}}
        >
          <Ionicons
            color="white"
            size={40}
            name={"chatbubble"}
          />
          <Text style={styles.actionButtonText}>
            {0}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
