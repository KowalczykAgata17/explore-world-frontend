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

export default function BottomSheet({panY, panCaption}) {
    const {height} = useWindowDimensions();

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
                    <View
                        style={{
                            borderBottomColor: '#c2c0bc',
                            borderBottomWidth: 3,
                            borderRadius: 2,
                            width: 60,
                            height: 13,
                            alignSelf: "center"

                        }}
                    />
                    <View style={styles.content}>

                        <Text style={styles.title}>{panCaption}</Text>
                        <View style={styles.fakeContent}/>
                    </View>
                </SafeAreaView>
            </Animated.View>
        </PanGestureHandler>
    );
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
        borderRadius: 10
    },
    wrapper: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontWeight: '400',
        fontSize: 22,
    },
    fakeContent: {
        flex: 1,
        height: 1000,
    },
});
