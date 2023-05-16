import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {useTheme} from '@react-navigation/native';
import React from 'react';
// import {Category, Home, Notification} from 'react-native-iconly';
// import Icon from 'react-native-vector-icons/Entypo';
import MapScreen from '../screens/MapScreen';
import ReelsScreen from '../screens/ReelsScreen';

const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => {
    const paperTheme = useTheme();
    const {colors} = useTheme();

    return (
        <Tab.Navigator
            initialRouteName="Map"
            activeColor="#FFC163"
            independent={true}
            // style={{position: 'absolute',
            //     justifyContent: "center",
            //     alignItems: "center"}}
            barStyle={{
                backgroundColor: paperTheme.dark ? '#202020' : 'white',
                height: 75,
                shadowOpacity: 0.6,
                shadowColor: 'black',
                shadowRadius: 5
            }}>
            <Tab.Screen
                name="Map"
                component={MapScreen}
                options={{
                    tabBarLabel: 'Map',
                    //   tabBarIcon: ({color}) => (
                    //     <Home
                    //       set="light"
                    //       primaryColor={colors.text}
                    //       stroke="bold"
                    //       size="large"
                    //     />
                    //   ),
                }}
            />
            <Tab.Screen
                name="Reels"
                component={ReelsScreen}
                options={{
                    tabBarLabel: 'Reels',
                    //   tabBarIcon: ({color, size}) => (
                    //     <Icon name="rss" size={25} color={colors.text} />
                    //   ),
                }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigator;