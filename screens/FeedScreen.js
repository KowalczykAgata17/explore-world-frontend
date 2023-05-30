import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import AppTitle from '../components/Title';
import DrawerHeader from '../components/Drawer_header';

const FeedScreen = props => {

    const array = [1,2,3,4,5,6]
    const renderItem = ({item, index}) => {
        return(
            <View>
                <Text>{item}</Text>
            </View>
            )
    }
    return (
        <View style={styles.main}>
            <FlatList
            data={array}
            renderItem={renderItem}/>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 10,
        textAlign: 'center',
        margin: 5,
    },
});

export default FeedScreen;