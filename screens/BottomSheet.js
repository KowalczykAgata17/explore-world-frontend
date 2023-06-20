import React from 'react';
import {SafeAreaView, StyleSheet, Text, useWindowDimensions, View,} from 'react-native';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {Image} from "expo-image";
import {WEATHER_ICONS_ENPOINT, WEATHER_ICON_FILE_POSTFIX} from '@env'
import Button_main from "../components/Button_main";
import { useNavigation } from '@react-navigation/native'

export default function BottomSheet({panY, panCaption, coordinate, temperature, iconCode}) {
    const {height} = useWindowDimensions();
    const weatherIconURL = WEATHER_ICONS_ENPOINT + iconCode + WEATHER_ICON_FILE_POSTFIX;
    const navigation = useNavigation()

    const gestureHandler = useAnimatedGestureHandler(
        {
            onStart(_, context) {
                context.startY = panY.value;
            },
            onActive(event, context) {
                panY.value = context.startY + event.translationY;
            },
            onEnd() {
                if (panY.value < -height * 0.3) {
                    panY.value = withTiming(-(height * 0.7));
                } else {
                    panY.value = withTiming(0);
                }
            },
        },
        [height]
    );

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(panY.value, [-1, 0], [-1, 0], {
                        extrapolateLeft: Extrapolate.EXTEND,
                        extrapolateRight: Extrapolate.CLAMP,
                    }),
                },
            ],
        };
    });


    return (
        <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View
                style={[
                    styles.container,
                    {top: height * 0.82},
                    animatedStyle,
                ]}
            >
                <SafeAreaView style={styles.wrapper}>
                    <View style={styles.lineContainer}/>

                    <View style={styles.content}>
                        <View style={styles.locationContainer}>
                            <View style={styles.locationCoordinateContainer}>
                                <Text style={styles.locationNameText}>{panCaption}</Text>
                                <Text
                                    style={styles.locationCoordinateText}>{
                                    coordinate ? (
                                        "(" + coordinate.latitude.toFixed(7) + ", " + coordinate.longitude.toFixed(7) + ")"
                                    ) : ("")
                                }
                                </Text>
                            </View>
                            {coordinate ? (
                                <View style={styles.locationWeatherContainer}>
                                    <Image
                                        style={styles.weatherIcon}
                                        source={weatherIconURL}
                                        contentFit="cover"
                                        transition={1000}
                                    />
                                    <Text style={styles.locationWeatherText}>{temperature}℃</Text>
                                </View>
                            ) : ""}
                        </View>
                        {coordinate ? (
                            <View style={styles.addContainer}>
                                <Button_main
                                    title="Add"
                                    onPress={() => {
                                        navigation.navigate('Add', {coordinate: coordinate, locationName: panCaption})
                                    }}
                                />
                            </View>
                        ) : ""}
                        <View style={styles.fakeContent}></View>
                    </View>
                </SafeAreaView>
            </Animated.View>
        </PanGestureHandler>
    )
        ;
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        shadowOpacity: 0.5,
        shadowColor: 'black',
        shadowRadius: 5,
        borderRadius: 10,
    },
    wrapper: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
    },
    lineContainer: {
        borderBottomColor: '#c2c0bc',
        borderBottomWidth: 3,
        borderRadius: 2,
        width: 60,
        height: 13,
        alignSelf: "center",
    },
    locationContainer: {
        flexDirection: "row",
    },
    locationCoordinateContainer: {
        flex: 1,
        width: "80%",
        justifyContent: "center",
    },
    locationNameText: {
        fontWeight: '400',
        fontSize: 22,
    },
    locationCoordinateText: {
        fontWeight: '200',
        fontSize: 10
    },
    locationWeatherContainer: {
        alignContent: "center",
        justifyContent: "center",
        width: 50,
        height: 70,
    },
    locationWeatherText: {
        fontWeight: '400',
        fontSize: 15,
        alignSelf: 'center'
    },
    weatherIcon: {
        width: 40,
        height: 40,
        alignSelf: 'center'
    },
    addContainer: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    fakeContent: {
        flex: 1,
        height: 1000,
    },
});
