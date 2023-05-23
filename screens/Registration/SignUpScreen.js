import React, {useState} from 'react';
import {Platform, StyleSheet, Text, TextInput, TouchableOpacity, View,} from 'react-native';
import * as Animatable from 'react-native-animatable';
import AppButton from '../../components/Button_main';
import SecondButton from '../../components/Button_second';
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

const SignupScreen = props => {
    const [data, setData] = useState({
        email: '',
        password: '',
        confirm_password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });

    const textInputChange = value => {
        if (value.length > 0) {
            setData({
                ...data,
                email: value,
                chceck_textInputChange: true,
            });
        } else {
            setData({
                ...data,
                email: value,
                chceck_textInputChange: false,
            });
        }
    };

    const handlePasswordChange = value => {
        setData({
            ...data,
            password: value,
        });
    };

    const handleConfirmPasswordChange = value => {
        setData({
            ...data,
            confirm_password: value,
        });
    };

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry,
        });
    };

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry,
        });
    };

    return (
        <View style={styles.container}>
            {/* <StatusBar barStyle="dark-content" /> */}
            <View style={styles.header}>
                <Text style={styles.text_header}> Join us! </Text>
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
                    />
                    {data.check_textInputChange ? (
                        <Animatable.View animation="bounceIn">
                            <EvilIcons name="check" size={25} color="#639E6C"/>
                        </Animatable.View>
                    ) : null}
                </View>

                <Text style={[styles.text_footer, {marginTop: 25}]}> Password </Text>
                <View style={styles.action}>
                    <EvilIcons name="lock" size={30} color="#05375a"/>
                    <TextInput
                        placeholder="Your password"
                        secureTextEntry={data.secureTextEntry ? true : false}
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
                <Text style={[styles.text_footer, {marginTop: 25}]}>
                    Confirm password{' '}
                </Text>
                <View style={styles.action}>
                    <EvilIcons name="lock" size={30} color="#05375a"/>
                    <TextInput
                        placeholder="Confirm your password"
                        secureTextEntry={data.confirm_secureTextEntry ? true : false}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={value => handleConfirmPasswordChange(value)}
                    />
                    <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
                        {data.secureTextEntry ? (
                            <Ionicons name="eye-off-outline" size={24} color="#05375a"/>
                        ) : (
                            <Ionicons name="eye-outline" size={24} color="#05375a"/>
                    )}
                </TouchableOpacity>
        </View>
    <View style={styles.button}>
        <AppButton title="Sign up" onPress={() => {
        }}/>
        <SecondButton
            title="Sign in"
            onPress={() => {
                props.navigation.goBack();
            }}
        />
    </View>
</Animatable.View>
</View>
)
    ;
};

export default SignupScreen;

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
        flex: 4,
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
        marginTop: 20,
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