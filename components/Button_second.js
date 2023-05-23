import {LinearGradient} from "expo-linear-gradient";

TouchableOpacity.defaultProps = {activeOpacity: 0.8};

import React from 'react';
import {View, Button, StyleSheet, TouchableOpacity, Text} from 'react-native';

const SecondButton = ({onPress, title}) => (
    <TouchableOpacity onPress={onPress}>
        <LinearGradient start={[0, 0.5]}
                        end={[1, 0.5]}
                        colors={['#4682B4', '#679267']}
                        style={{borderRadius: 22, width: 272, height: 51}}>
            <View style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>{title}</Text>
            </View>
        </LinearGradient>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    appButtonContainer: {
        elevation: 8,
        backgroundColor: '#fff',
        borderRadius: 22,
        paddingVertical: 10,
        paddingHorizontal: 12,
        margin: 2,
    },
    appButtonText: {
        fontSize: 18,
        color: 'black',
        fontWeight: '500',
        alignSelf: 'center',
        textTransform: 'uppercase',
        margin: 0,
        paddingsHorizontal: 6,
        textAlign: "center",
        backgroundColor: "white",
    },
});

export default SecondButton;