import {LinearGradient} from "expo-linear-gradient";

TouchableOpacity.defaultProps = {activeOpacity: 0.8};

import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const AppButton = ({onPress, title}) => (
    <TouchableOpacity onPress={onPress}>

        <View style={styles.appButtonContainer}>
            <LinearGradient start={[0, 0.5]}
                            end={[1, 0.5]}
                            colors={['#4682B4', '#679267']}
                            style={{borderRadius: 22, width: 272, height: 45,}}>
                <Text style={styles.appButtonText}>{title}</Text>
            </LinearGradient>

        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    appButtonContainer: {
        elevation: 8,
        borderRadius: 22,
        paddingVertical: 10,
        paddingHorizontal: 12,
        width: 272,
        height: 45,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',

    },
    appButtonText: {
        fontSize: 18,
        color: 'black',
        fontWeight: '500',
        alignSelf: 'center',
        textTransform: 'uppercase',
        // margin: 3,
        // paddingsHorizontal: 6,
        textAlign: "center",
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default AppButton;