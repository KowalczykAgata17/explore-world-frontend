import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import React from 'react';
import {StyleSheet, Switch, View, Text} from 'react-native';
import {Avatar, Caption, Drawer, Title, TouchableRipple,} from 'react-native-paper';
import {useTheme} from '@react-navigation/native';
import {AuthContext} from '../components/context';
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Feather from "react-native-vector-icons/Feather";

const DrawerNavigator = props => {
    const paperTheme = useTheme();
    const {colors} = useTheme();

    const {signOut, toggleTheme} = React.useContext(AuthContext);

    const [isEnglishVersion, setIsEnglishVersion] = React.useState(false);

    const toggleLanguageVersion = () => {
        setIsEnglishVersion(!isEnglishVersion);
    };

    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View styel={styles.userInfoSection}>
                        <View
                            style={{flexDirection: 'column', marginTop: 15, paddingLeft: 0, alignItems: 'center',}}>
                            <Avatar.Image
                                source={{
                                    uri: 'https://www.clipartmax.com/png/middle/72-722180_these-are-some-cats-avatar-i-drew-during-my-free-time-black.png',
                                }}
                                size={130}
                            />
                            <View style={{marginLeft: 0, flexDirection: 'column', marginTop: 20, alignItems: 'center',}}>
                                <Title style={styles.title}>Agata Kowalczyk</Title>
                                <Caption style={styles.caption}>@kowalczykAgata</Caption>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        {/* <DrawerItemList {...props} /> */}
                        <DrawerItem
                            icon={() => (
                                <EvilIcons name="user" size={30} color={colors.text}/>
                            )}
                            label="My profile"
                            onPress={() => {
                                props.navigation.navigate('Home');
                            }}
                        />
                    </Drawer.Section>

                    {/*<Drawer.Section style={{paddingLeft: 20}}>*/}
                        {/*<TouchableRipple onPress={() => toggleTheme()}>*/}
                        {/*    <View style={styles.preference}>*/}
                        {/*        <Text>Dark Theme</Text>*/}
                        {/*        <View pointerEvents="none">*/}
                        {/*            <Switch*/}
                        {/*                trackColor={{true: '#FFC163', false: 'grey'}}*/}
                        {/*                thumbColor={paperTheme.dark ? '#FFC163' : 'white'}*/}
                        {/*                value={paperTheme.dark}*/}
                        {/*            />*/}
                        {/*        </View>*/}
                        {/*    </View>*/}
                        {/*</TouchableRipple>*/}
                        {/*<TouchableRipple onPress={() => toggleLanguageVersion()}>*/}
                        {/*    <View style={styles.preference}>*/}
                        {/*        <Text>English</Text>*/}
                        {/*        <View pointerEvents="none">*/}
                        {/*            <Switch*/}
                        {/*                trackColor={{true: '#FFC163', false: 'grey'}}*/}
                        {/*                thumbColor={isEnglishVersion ? '#FFC163' : 'white'}*/}
                        {/*                ios_backgroundColor="#3e3e3e"*/}
                        {/*                value={isEnglishVersion}*/}
                        {/*            />*/}
                        {/*        </View>*/}
                        {/*    </View>*/}
                        {/*</TouchableRipple>*/}
                    {/*</Drawer.Section>*/}
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <Drawer.Item
                    icon={() => (
                        <Feather name="log-out" size={25} color={colors.text}/>
                    )}
                    label="Sign out"
                    onPress={() => {
                        signOut();
                    }}
                />
            </Drawer.Section>
        </View>
    );
};

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 18,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 15,
    },
    drawerSection: {
        marginTop: 30,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default DrawerNavigator;