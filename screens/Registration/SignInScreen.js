import React, {useState} from 'react';
import {Alert, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View,} from 'react-native';
import * as Animatable from 'react-native-animatable';
import AppButton from '../../components/Button_main';
import SecondButton from '../../components/Button_second';
import {AuthContext} from '../../components/context';
import Users from '../../model/users';
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

const SigninScreen = props => {
    const [data, setData] = useState({
        username: '',
        password: '',
        chceck_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    const {signIn} = React.useContext(AuthContext);

    const textInputChange = value => {
        if (value.trim().length >= 4) {
            setData({
                ...data,
                username: value,
                check_textInputChange: true,
                isValidUser: true,
            });
        } else {
            setData({
                ...data,
                username: value,
                check_textInputChange: false,
                isValidUser: false,
            });
        }
    };

    const handlePasswordChange = value => {
        if (value.trim().length >= 8) {
            setData({
                ...data,
                password: value,
                isValidPassword: true,
            });
        } else {
            setData({
                ...data,
                password: value,
                isValidPassword: false,
            });
        }
    };

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry,
        });
    };

    const handleValidUser = val => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                isValidUser: true,
            });
        } else {
            setData({
                ...data,
                isValidUser: false,
            });
        }
    };

    const loginHandle = (userName, password) => {
        const foundUser = Users.filter(item => {
            return userName === item.username && password === item.password;
        });

        if (data.username.length === 0 || data.password.length === 0) {
            Alert.alert(
                'Wrong input!',
                'Username or password field cannot be empty.',
                [{text: 'Okay'}],
            );
            return;
        }

        if (foundUser.length === 0) {
            Alert.alert('Invalid user', 'Username or password is incorrect', [
                {text: 'Okay'},
            ]);
            return;
        }
        signIn(foundUser);
    };

    return (
        <View style={styles.container}>
            {/* <StatusBar barStyle="dark-content" /> */}
            <View style={styles.header}>
                <Text style={styles.text_header}> Hello! </Text>
            </View>
            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                <Text style={styles.text_footer}> Username </Text>
                <View style={styles.action}>
                    <EvilIcons name="user" size={30} color="#05375a"/>
                    <TextInput
                        placeholder="Your username"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={value => textInputChange(value)}
                        onEndEditing={e => handleValidUser(e.nativeEvent.text)}
                    />
                    {data.chceck_textInputChange ? (
                        <Animatable.View animation="bounceIn">
                            <EvilIcons name="check" size={25} color="#639E6C"/>
                        </Animatable.View>
                    ) : null}
                </View>
                {data.isValidUser ? null : (
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>
                            Username must be 4 chcaracters long
                        </Text>
                    </Animatable.View>
                )}

                <Text style={[styles.text_footer, {marginTop: 35}]}> Password </Text>
                <View style={styles.action}>
                    <EvilIcons name="lock" size={30} color="#05375a"/>
                    <TextInput
                        placeholder="Your password"
                        secureTextEntry={data.secureTextEntry}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={value => handlePasswordChange(value)}
                    />
                    <TouchableOpacity onPress={updateSecureTextEntry}>
                        {data.secureTextEntry ? (
                            <Ionicons name="eye-off-outline" size={24} color="#05375a"/>
                        ) : (
                            <Ionicons name="eye-outline" size={24} color="#05375a"/>
                        )}
                    </TouchableOpacity>
                </View>
                {
                    data.isValidPassword ? null : (
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>
                                Password must be 8 chcaracters long
                            </Text>
                        </Animatable.View>
                    )
                }

                <TouchableOpacity>
                    <Text style={{color: 'black', marginTop: 15}}>Forgot password?</Text>
                </TouchableOpacity>
                <View style={styles.button}>
                    <AppButton
                        title="Sign in"
                        onPress={() => {
                            console.log('clicked');
                            loginHandle(data.username, data.password);
                        }}
                    />
                    <SecondButton
                        title="Sign up"
                        onPress={() => {
                            props.navigation.navigate('SignUp');
                        }}
                    />
                </View>
            </Animatable.View>
        </View>
    )
        ;
};

export default SigninScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6F8FAF',
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50,
        color: 'black',
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    text_header: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 30,
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50,
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});