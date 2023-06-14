import {Dimensions} from "react-native";

const {StyleSheet} = require('react-native');

const styles = StyleSheet.create({
    container: {flex: 1},

    video_container: {
        width: '100%',
        height: Dimensions.get('window').height - 75
    },
    video:{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
})

export default styles;