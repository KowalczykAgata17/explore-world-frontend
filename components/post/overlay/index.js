import React, {useEffect, useState} from "react";
import {View, Text, TouchableOpacity} from "react-native";
import styles from "./styles";
import {Ionicons} from "@expo/vector-icons";


export default function PostSingleOverlay({user, post}) {
    const [currentLikeState, setCurrentLikeState] = useState(false)

    useEffect(() => {
        // getLikeById(post.id, currentUser.uid).then((res) => {
        //   setCurrentLikeState({
        //     ...currentLikeState,
        //     state: res,
        //   });
        // });
    }, []);
    //
    // const handleUpdateLike = useMemo(
    //     () =>
    //         throttle(500, true, (currentLikeStateInst) => {
    //           setCurrentLikeState({
    //             state: !currentLikeStateInst.state
    //           });
    //           updateLike(post.id, currentUser.uid, currentLikeStateInst.state);
    //         }),
    //     []
    // );


    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.displayName}>{"Kamil Kowal"}</Text>
                <Text style={styles.description}>{post.content}</Text>
            </View>

            <View style={styles.leftContainer}>
                <TouchableOpacity
                    onPress={() => {
                    }}>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => {
                    }}
                >
                    <Ionicons
                        color="white"
                        size={40}
                        name={currentLikeState.state ? "heart" : "heart-outline"}/>
                    <Text style={styles.actionButtonText}>
                        {post.likes}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
