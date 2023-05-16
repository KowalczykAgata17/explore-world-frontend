// import React from 'react';
// import {StyleSheet, View} from 'react-native';
// import AppTitle from '../components/Title';
//
// const ReelsScreen = props => {
//     return (
//         <View style={styles.main}>
//             <View>
//                 <AppTitle title="POST"/>
//             </View>
//             <View style={styles.textContainer}>
//                 {/* <Text style={styles.text}>
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//           eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
//           minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//           aliquip ex ea commodo consequat. Duis aute irure dolor in
//           reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
//           pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
//           culpa qui officia deserunt mollit anim id est laborum.
//         </Text> */}
//             </View>
//         </View>
//     );
// };
//
// const styles = StyleSheet.create({
//     main: {
//         flex: 1,
//         width: '100%',
//         height: '100%',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     textContainer: {
//         width: '80%',
//         justifyContent: 'center',
//         alignContent: 'center',
//     },
//     text: {
//         fontSize: 13,
//         textAlign: 'center',
//     },
// });
//
// export default ReelsScreen;


import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import {View, Text, Button, Image, StyleSheet, Dimensions, TouchableWithoutFeedback} from "react-native";
import { Video, ResizeMode } from 'expo-av';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';


const Post = (props) => {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback>
                <Video
                    ref={video}
                    style={styles.video}
                    source={{uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"}}
                    useNativeControls
                    resizeMode="cover"
                    isLooping
                    onPlaybackStatusUpdate={setStatus}
                />
            </TouchableWithoutFeedback>

        </View>
    )
}

export default Post;

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'black',
        width: '100%',
        height: Dimensions.get('window').height - 48
    },
    video:{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    videPlayButton: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 100,
    },
    uiContainer: {
        height: '100%',
        justifyContent: 'flex-end'
    },
    bottomContainer: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    handle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 10,
    },
    description: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '300',
        marginBottom: 10,
    },
    songRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    songName: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 5,
    },

    songImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 5,
        borderColor: '#4c4c4c',
    },

    //  right container
    rightContainer: {
        alignSelf: 'flex-end',
        height: 300,
        justifyContent: 'space-between',
        marginRight: 5,
    },
    profilePicture: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#fff',
    },
    iconContainer: {
        alignItems: 'center',
    },
    statsLabel: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginTop: 5,
    }
});