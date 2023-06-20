import {StackActions, useNavigation} from '@react-navigation/native'
import React, {useState} from 'react'
import {ActivityIndicator, Image, Platform, Text, TextInput, TouchableOpacity, View} from 'react-native'
import styles from './styles'
import {Feather} from '@expo/vector-icons'
import {waitFor} from "@babel/core/lib/gensync-utils/async";
// import { useDispatch } from 'react-redux'
// import { createPost } from '../../redux/actions'

export default function SavePostScreen(props) {
    const [description, setDescription] = useState('')
    const [requestRunning, setRequestRunning] = useState(false)
    const navigation = useNavigation()
    const realPath =
        Platform.OS === "ios"
            ? decodeURIComponent(props.route.params.source.replace("file://", ""))
            : props.route.params.source;

    // const dispatch = useDispatch();
    const handleSavePost = () => {
        // savePost()
        navigation.goBack()
        // setRequestRunning(true)
        // console.log(description)
        // console.log(props.route.params.source)
        // savePost()
        //
        // setRequestRunning(false)
        // dispatch(createPost(description, props.route.params.source, props.route.params.sourceThumb))
        //     .then(() => navigation.dispatch(StackActions.popToTop()))
        //     .catch(() => setRequestRunning(false))
    }
    const savePost = () => {
        fetch('http://10.183.1.156:3005/files',)
            .then(res => res.json())
            .then(obj => {
                    let url = obj.url
                    let key = obj.key

                    let mediaUrl = "https://is-test-study.s3.eu-central-1.amazonaws.com/" + key

                    const form = new FormData();
                    form.append("File", {
                        name: "SampleVideo.mov",
                        uri: props.route.params.source,
                        type: "video/mov",
                    });

                    fetch(url, {
                        method: 'PUT',
                        body: form,
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'multipart/form-data'
                        },
                    })
                        .then(res => console.log(res))
                        .catch(error => {
                            console.error("Error: " + error);
                        });


                    fetch('http://10.183.1.156:3004/posts', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            userId: 1,
                            mediaUrl: mediaUrl,
                            mediaType: "video",
                            content: description,
                            location: {
                                "name": props.route.params.locationName,
                                "latitude": props.route.params.coordinate.latitude,
                                "longitiune": props.route.params.coordinate.longitude
                            }
                        })
                    })
                        .then(res => res.json())
                        .then(obj => {
                            console.log(obj)
                        })
                        .catch(error => {
                            console.error("Error: " + error);
                        });

                }
            )
            .catch(error => {
                console.error("Error: " + error);
            });


    };

    if (requestRunning) {
        return (
            <View style={styles.uploadingContainer}>
                <ActivityIndicator color='red' size='large'/>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.cancelButton}>
                    <Feather name="x" size={24} color="black"/>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => handleSavePost()}
                    style={styles.postButton}>
                    <Feather name="corner-left-up" size={24} color="white"/>
                    <Text style={styles.postButtonText}>Post</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <View style={styles.locationContainer}>
                    <View style={styles.locationCoordinateContainer}>
                        <Text style={styles.locationNameText}>{props.route.params.locationName}</Text>
                        <Text
                            style={styles.locationCoordinateText}>{
                            "(" + props.route.params.coordinate.latitude.toFixed(7) + ", " + props.route.params.coordinate.longitude.toFixed(7) + ")"
                        }
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.formContainer}>
                <TextInput
                    style={styles.inputText}
                    maxLength={150}
                    multiline
                    onChangeText={(text) => setDescription(text)}
                    placeholder="Describe your video"
                />
                <Image
                    style={styles.mediaPreview}
                    source={{uri: realPath}}
                />
            </View>
            <View style={styles.spacer}/>

        </View>
    )
}
