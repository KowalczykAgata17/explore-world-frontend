import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {useTheme} from '@react-navigation/native';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import MapScreen from '../screens/MapScreen';
import CameraScreen from "../screens/CameraScreen";
import FeedScreen from "../screens/Feed";
import SavePostScreen from '../screens/savePost';

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
                    tabBarIcon: ({color, size}) => (
                        <Icon name="compass" size={25} color={colors.text}/>
                    ),
                }}
            />
            <Tab.Screen
                name="Add"
                component={CameraScreen}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: () => null,
                }}
            />
            <Tab.Screen
                name="savePost"
                component={SavePostScreen}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: () => null,
                }}
            />
            <Tab.Screen
                name="Feed"
                component={FeedScreen}
                options={{
                    tabBarLabel: 'Feed',
                    tabBarIcon: ({color, size}) => (
                        <Icon name="clapperboard" size={25} color={colors.text}/>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigator;